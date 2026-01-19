const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expense.controller');
const { protect } = require('../middleware/auth.middleware');


const  router  = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpenses);
router.put("/update/:id", protect, updateExpense);
router.delete("/delete/:id", protect, deleteExpense);