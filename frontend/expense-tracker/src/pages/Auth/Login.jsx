import React from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/Usercontext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);

  const {updateUser} = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Welcome Back!!!</h3>
        <p className="text-xs text-slate-700 mt-5 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            lang="Enter your email address"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Log In
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?
            <Link className="font-medium text-primary underline " to="/signup">
              {" "}
              SignUp{" "}
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
