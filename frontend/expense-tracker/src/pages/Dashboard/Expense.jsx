import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import ExpenseList from "../../components/expense/ExpenseList";
import ExpenseOverView from "../../components/expense/ExpenseOverView";
import toast from "react-hot-toast";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [opendeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [OpenAddExpenseModal, setOpenExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSES}`,
      );
      console.log("FULL RESPONSE 👉", response.data);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something Went wrong, Please try again Later", error);
    } finally {
      setLoading(false);
    }
  };

  const handelAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenExpenseModal(false);
      toast.success("Expense added Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(
        "Error adding Expense:",
        error.response?.data?.message || error.message,
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense details deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleteing Expense:",
        error.response?.message || error.message,
      );
    }
  };
  const downloadExpenseDetails = async () => {};

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverView
              transactions={expenseData}
              onAddExpense={() => setOpenExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={downloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenExpenseModal(false)}
          title="Add Income"
        >
          <AddExpenseForm onAddExpense={handelAddExpense} />
        </Modal>
        <Modal
          isOpen={opendeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, date: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure want to delete this expense source"
            onDelete={() => deleteExpense(opendeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
