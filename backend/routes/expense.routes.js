const express = require("express");
const {
  addExpense,
  getAllExpenses,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controller/expense.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpenses);
router.get("/download-excel", protect, downloadExpenseExcel);
router.delete("/delete/:id", protect, deleteExpense);


module.exports = router;