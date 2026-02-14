import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import InfoCard from "../../components/cards/InfoCards";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { addThoushandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last60DaysExpenses from "../../components/Dashboard/Last60DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import Logout from "./Logout";
const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setloading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setloading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );

      if (response.data.DashboardData) {
        setDashboardData(response.data.DashboardData);
      }
    } catch (error) {
      console.error("DASHBOARD DATA FETCH ERROR 👉", error);
    }

    setloading(false);
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThoushandSeparator(dashboardData?.totalbalance || 0)}
            colors="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThoushandSeparator(dashboardData?.totalIncome || 0)}
            colors="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThoushandSeparator(dashboardData?.totalExpense || 0)}
            colors="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransaction}
            onSeeMore={() => navigate("/expenses")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalbalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <ExpenseTransaction
            transactions={
              dashboardData?.totalLast60DaysExpense?.transactions || []
            }
            onSeeMore={() => navigate("/expenses")}
          />
          <Last60DaysExpenses
            data={dashboardData?.totalLast60DaysExpense?.transactions || []}
          />
          <RecentIncomeWithChart
            data={
              dashboardData?.totalLast60Daysincome?.transactions?.slice(0, 4) ||
              []
            }
            totalIncome={dashboardData?.totalIncome || 0}
          />
          <RecentIncome
            transactions={
              dashboardData?.totalLast60Daysincome?.transactions || []
            }
            onSeeMore={() => navigate("/income")}
          />
          <Logout />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
