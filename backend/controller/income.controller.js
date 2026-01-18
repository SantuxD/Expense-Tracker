const user = require("../models/User.models");
const Income = require("../models/Income.models");


const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body

    if (!source || !amount || !date) {
      return res.status(400).json({
        message: "all fields are required"
      })
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date)

    })

    await newIncome.save();
    console.log(req.body);
    res.status(200).json(newIncome)
  } catch (error) {
    res.status(500).json({ message: "server Error" + error.message })
  }

}

const getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
 };

const deleteIncome = async (req, res) => {
  const incomeId = req.params.id;
  try {
    const deletedIncome = await Income.findByIdAndDelete(incomeId);
    if (!deletedIncome) {
      return res.status(404).json({ message: "Income record not found" });
    }
    res.status(200).json({ message: "Income record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }

 };

const downloadIncomeExcel = async (req, res) => { };

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
};
