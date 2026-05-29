const express = require("express");

const {
    getSales,
    createSale,
    deleteSale
} = require("../controllers/saleController");

const router = express.Router();


// GET SALES
router.get("/", getSales);


// CREATE SALE
router.post("/", createSale);


// DELETE SALE
router.delete("/:id", deleteSale);

module.exports = router;
