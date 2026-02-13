import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";

const Logout = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <button
        onClick={() => setShowLogoutModal(true)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
      >
        <LuLogOut size={18} />
        Logout
      </button>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Confirm Logout
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
