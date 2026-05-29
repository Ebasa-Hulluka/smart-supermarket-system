const express = require("express");

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();


// GET ALL PRODUCTS
router.get("/", getProducts);


// CREATE PRODUCT
router.post("/", createProduct);


// UPDATE PRODUCT
router.put("/:id", updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);

module.exports = router;