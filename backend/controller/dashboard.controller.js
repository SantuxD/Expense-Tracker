const Income = require("../models/Income.models");
const Expense = require("../models/Expense.model");

const {  Types } = require("mongoose");

const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(userId);

    // TOTAL INCOME
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // TOTAL EXPENSE
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // LAST 60 DAYS
    const last60DaysDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const last60DaysIncome = await Income.find({
      userId: userObjectId,
      date: { $gte: last60DaysDate },
    }).sort({ date: -1 });

    const totalLast60Daysincome = last60DaysIncome.reduce(
      (sum, income) => sum + income.amount,
      0,
    );

    const last60DaysExpense = await Expense.find({
      userId: userObjectId,
      date: { $gte: last60DaysDate },
    }).sort({ date: -1 });

    const totalLast60DaysExpense = last60DaysExpense.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // LAST TRANSACTIONS
    const lastTransactions = [
      ...(
        await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)
      ).map((txn) => ({ ...txn.toObject(), type: "income" })),

      ...(
        await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)
      ).map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        totalbalance:
          (totalIncomeAgg[0]?.total || 0) - (totalExpenseAgg[0]?.total || 0),
        totalIncome: totalIncomeAgg[0]?.total || 0,
        totalExpense: totalExpenseAgg[0]?.total || 0,
        totalLast60DaysExpense: {
          total: totalLast60DaysExpense,
          transactions: last60DaysExpense,
        },
        totalLast60Daysincome: {
          total: totalLast60Daysincome,
          transactions: last60DaysIncome,
        },
        recentTransaction: lastTransactions,
      },
    });
  } catch (error) {
    console.error("Error in getDashboardData:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { getDashboardData };
