import CustomPieChart from "../Charts/CustomPiechart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  const balanceData = [
    {
      name: "Total Balance",
      amount: totalBalance,
    },
    {
      name: "Total Income",
      amount: totalIncome,
    },
    {
      name: "Total Expense",
      amount: totalExpense,
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <h5 className="text-lg">Finance Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        colors={COLORS}
        label={"Total Balance"}
        totalAmount={`$${totalBalance}`}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
