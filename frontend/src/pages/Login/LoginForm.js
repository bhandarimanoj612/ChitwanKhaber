import React, { useState, useRef, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../../feature/loginSignupReducer";
import { authActions } from "../../feature/authReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //for auth
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  const role = useSelector((state) => state.authenticate.role.payload);

  useEffect(() => {
    if (isLoggedIn && role === "admin") {
      navigate("/cms-admin/Profile");
    }
    if (isLoggedIn && role === "editor") {
      navigate("/dashboard/Profile");
    }
  }, []);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const loginDetails = useSelector((state) => state.loginSignup);

  const handleToast = (loginDetails) => {
    switch (loginDetails.loginStatus) {
      case "pending":
        if (toastId.current === null) {
          toastId.current = toast.info("Loading...", {
            position: "top-right",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        break;
      case "success":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: "Successfully, logged in",
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
          dispatch(authActions.login(loginDetails.loginUserDetails[0].role));
          if (loginDetails.loginUserDetails[0].role === "admin") {
            navigate("/cms-admin/Profile");
          }
          if (loginDetails.loginUserDetails[0].role === "editor") {
            navigate("/dashboard/Profile");
          }
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: loginDetails.loginError.message,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
        }
        break;
      default:
        break;
    }
  };

  // call the handleToast function when loginDetails changes
  useEffect(() => {
    if (loginDetails && loginDetails.loginStatus) {
      handleToast(loginDetails);
    }
  }, [loginDetails]);

  //handle login function
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    dispatch(loginUser(loginData));
  };

  return (
    <>
      <div className="bg-dark fixed inset-0 flex items-center justify-center select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5 items-center justify-center">
          <div className="w-full flex flex-col md:w-[50%] gap-y-3 p-4">
            <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
              <img
                src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1691894291/logo-footer_omsriq.png"
                alt="logo"
                className="w[13rem] h-[7rem]"
              />
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-y-2">
              <span className="text-[1rem] md:text-[1.5rem] font-black leading-relaxed tracking-wide text-white">
                Login to your account
              </span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="w-full flex flex-col items-center juistify-center mt-5 gap-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />

                {/* for password  */}
                <div className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEye className="h-5 w-5" />
                    ) : (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] font-poppins text-sm leading-relaxed px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md text-center mt-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
