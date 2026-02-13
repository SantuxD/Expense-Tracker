const XLSX = require("xlsx");
const expenseModel = require("../models/expense.model");

const addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;
    if ( !icon || !category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.user.id;
    const newExpense = new expenseModel({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};


const getAllExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const expenses = await expenseModel.find({ userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// const downloadExpenseExcel = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     if (!userId) {
//       return res.status(400).json({ message: "Unauthorized" });
//     }
//     const expenses = await expenseModel.find({ userId }).sort({ date: -1 });

//     const wb = XLSX.utils.book_new();
//     const wsData = expenses.map((expense) => ({
//       Category: expense.category,
//       Amount: expense.amount,
//       Date: expense.date.toISOString().split("T")[0],
//     }));
//     const ws = XLSX.utils.json_to_sheet(wsData);
//     XLSX.utils.book_append_sheet(wb, ws, "Expenses");
//     XLSX.writeFile(wb, "expenses_details.xlsx");
//     res.status(200).json({ message: "Excel file generated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error: " + error.message });
//   }
// };

const downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await expenseModel
      .find({ userId })
      .sort({ date: -1 });

    const wsData = expenses.map((expense) => ({
      Category: expense.category,
      Amount: expense.amount,
      Date: expense.date.toISOString().split("T")[0],
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");

    console.log("Sending Excel file...");


    const buffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    });

    // 🔥 THIS PART IS CRITICAL
    res.status(200);
    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        "attachment; filename=expense_details.xlsx",
      "Content-Length": buffer.length,
    });

    return res.end(buffer);

  } catch (error) {
    return res.status(500).json({
      message: "Server Error: " + error.message,
    });
  }
};






const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense record not found" });
    }
    res.status(200).json({ message: "Expense record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  downloadExpenseExcel,
  deleteExpense,
};
