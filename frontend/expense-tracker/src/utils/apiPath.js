export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/V1/auth/login",
    REGISTER: "/api/V1/auth/register",
    GET_USER_INFO: "/api/V1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/V1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/V1/income/add",
    GET_INCOMES: "/api/V1/income/getAll",
    DELETE_INCOME: (incomeId) => `/api/V1/income/${incomeId}`,
    DOWNLOAD_INCOME_CSV: "/api/V1/income/download-excel",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/V1/expense/add",
    GET_EXPENSES: "/api/V1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/V1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE_CSV: "/api/V1/expense/download-excel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/V1/image/upload",
  },
};
