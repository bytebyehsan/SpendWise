const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// Add transaction
router.post("/", async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    if (!title || amount === undefined || !type || !category || !date) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const transaction = await Transaction.create({
      title,
      amount: Number(amount),
      type,
      category,
      date,
      note
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
});

// Delete transaction
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});

module.exports = router;