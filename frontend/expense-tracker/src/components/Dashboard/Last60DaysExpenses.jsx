import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last60DaysExpenses = ({ data }) => {
  const [chartdata, setChartData] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const result = prepareExpenseBarChartData(data);

    setChartData(result);
  }, [data]);
  return (
    <div className=" card col-span-1">
      <div className="flex item-center justify-between">
        <h5 className="text-lg">Last 60 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartdata} />
    </div>
  );
};

export default Last60DaysExpenses;
