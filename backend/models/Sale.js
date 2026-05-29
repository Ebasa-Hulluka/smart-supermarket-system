const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            quantity: Number,
            price: Number
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema);
