import { AiOutlineClose } from "react-icons/ai";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../feature/loginSignupReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddUser({ handleClick, handleOutClick }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("editor");

  const signupDetails = useSelector((state) => state.loginSignup);


  const handleToast = async(signupDetails) => {
    switch (signupDetails.signupStatus) {
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
            render: signupDetails.signupUserDetails[0].message,
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
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
          toast.update(toastId.current, {
            render: signupDetails.signupUserDetails[0].message,
            type: toast.TYPE.SUCCESS,
          });
          
          if (signupDetails.signupUserDetails[0].message) {
            // Reload the page only if there's a message
            window.location.reload();
          } else {
            navigate("/cms-admin/Users"); // Navigate without reload
          }
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: signupDetails.signupError,
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

  const functionAddHandler = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      username: username,
      role: role,
    };

    if (email && password && username) {
      dispatch(signupUser(data));
    }
  };

  // call the handleToast function when signupDetails changes
  useEffect(() => {
    if (signupDetails && signupDetails.signupStatus) {
      handleToast(signupDetails);
    }
  }, [signupDetails]);

  return (
    <>
      <div
        className="relative flex w-[80%] md:w-[75%] px-4 py-4 bg-dark rounded-sm flex-col gap-2"
        onClick={handleOutClick}
      >
        <div className="flex absolute inset-0 h-8 w-8  justify-center items-center">
          <button
            className="text-gray-400 w-5 h-5 hover:text-gray-300 focus:outline-none"
            onClick={handleClick}
          >
            <AiOutlineClose className="text-lg" />
          </button>
        </div>
        {/* become an editor section */}
        <div className="flex flex-1  flex-col justify-center items-center text-white gap-4">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-xl md:text-3xl font-semibold text-center">
              Add User
            </h1>
          </div>
          {/* email and password */}
          <div className="flex flex-col w-[100%] sm:w-[80%] md:w-[100%] justify-center items-center gap-3">
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              placeholder="Username..."
              className="text-dark px-4 py-2 w-[100%] md:w-[40%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              placeholder="Email..."
              className="text-dark px-4 py-2 w-[100%] md:w-[40%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="text-dark px-4 py-2 w-[100%] md:w-[40%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <label
              for="role"
              className="block mb-2 text-sm font-medium text-white"
            >
              Select Role
            </label>
            <select
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              defaultValue={role}
            >
              <option value="editor" selected>
                Editor
              </option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="bg-dark border-2 border-gray-400 px-4 py-2 md:w-[20%] rounded-md focus:border-gray-300 mt-4"
            onClick={functionAddHandler}
          >
            Add Now
          </button>
        </div>
      </div>
    </>
  );
}

export default AddUser;
