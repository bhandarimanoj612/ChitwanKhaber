import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

const EditUser = ({ props, userData }) => {
  const [username, setUsername] = useState(userData?.username);
  const [email, setEmail] = useState(userData?.email);

  const saveHandler = async () => {
    try {
      const response = await axios
        .put(
          "http://localhost:3001/edit-user",
          { username, email },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Successfully, updated profile");
          window.location.reload();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } catch (error) {
      console.log("Error updating:", error);
    }
  };

  return (
    <>
      {/*content*/}

      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[20rem] lg:h-[30rem] pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
            <AiOutlineClose
              size={30}
              className="text-red-900 block cursor-pointer"
            />
          </i>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
          {/* User personal detail Section */}
          <div className="flex flex-col gap-3">
            <div>
              <span>Username</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="border border-gray-400 rounded-md pl-3 py-2 w-96"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <span>Email Address</span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  className="border border-gray-400 rounded-md pl-3 py-2 w-96"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <span
                className="mt-4 px-8 py-2 rounded-md bg-green-400 text-white cursor-pointer"
                onClick={saveHandler}
              >
                Save
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
