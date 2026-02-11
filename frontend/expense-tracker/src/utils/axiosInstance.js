import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance =  axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken && !config.url.includes("/login") && !config.url.includes("/register")) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response && error.response.status === 500) {
      console.log("Server error, please try again later");
    } else if (error.code === "ENCONNABORTED") {
      console.error("Request Timed Out. Please try again later.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
