const express = require("express")
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } = require("../controller/income.controller")

const {protect } = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/add", protect, addIncome)
router.get("/get", protect, getAllIncome)
router.delete("/:id", protect, deleteIncome)
router.post("/download-excel", protect, downloadIncomeExcel)



module.exports = router;

