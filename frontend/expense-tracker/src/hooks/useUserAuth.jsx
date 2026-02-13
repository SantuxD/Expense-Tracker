import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

import { API_PATHS } from "@/utils/apiPath";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useContext } from "react";

export const useUserAuth = () => {
  const { user, updateUser, clearUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearUser();
      navigate("/login");
      return;
    }
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          const userData = response.data;
          updateUser(userData);
        }
      } catch (err) {
        console.error("USER AUTH ERROR 👉", err);
        console.error("RESPONSE 👉", err?.response?.data);

        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate, user]);
  return { user, logout };
};
