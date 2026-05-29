const Sale = require("../models/Sale");
const Product = require("../models/Product");


// GET SALES
const getSales = async (req, res) => {

    try {

        const sales = await Sale.find().sort({ createdAt: -1 });

        res.json(sales);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// CREATE SALE AND REDUCE STOCK
const createSale = async (req, res) => {

    try {
        const items = Array.isArray(req.body.items) ? req.body.items : [];

        if (items.length === 0) {
            return res.status(400).json({ message: "Add at least one item to the sale" });
        }

        const quantitiesByProduct = items.reduce((totals, item) => {
            const productId = String(item.productId || "");
            const quantity = Number(item.quantity || 0);

            if (!productId || quantity < 1) {
                totals.invalid = true;
                return totals;
            }

            totals[productId] = (totals[productId] || 0) + quantity;
            return totals;
        }, {});

        if (quantitiesByProduct.invalid) {
            return res.status(400).json({ message: "Each sale item needs a product and quantity" });
        }

        const saleItems = [];

        for (const [productId, quantity] of Object.entries(quantitiesByProduct)) {
            if (productId === "invalid") {
                continue;
            }

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.quantity < quantity) {
                return res.status(400).json({
                    message: `${product.name} has only ${product.quantity} unit(s) in stock`
                });
            }

            saleItems.push({
                productId: product._id,
                name: product.name,
                quantity,
                price: product.price
            });
        }

        for (const item of saleItems) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { quantity: -item.quantity }
            });
        }

        const totalPrice = saleItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const sale = await Sale.create({ items: saleItems, totalPrice });

        res.status(201).json(sale);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// DELETE SALE AND RESTORE STOCK
const deleteSale = async (req, res) => {

    try {

        const sale = await Sale.findById(req.params.id);

        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }

        for (const item of sale.items) {
            if (item.productId) {
                await Product.findByIdAndUpdate(item.productId, {
                    $inc: { quantity: Number(item.quantity || 0) }
                });
            }
        }

        await Sale.findByIdAndDelete(req.params.id);

        res.json({
            message: "Sale deleted and stock restored"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getSales,
    createSale,
    deleteSale
};
