import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import axios from "axios";
axios.defaults.withCredentials = true;


function UserList({ searchValue }) {
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [editRole, setEditRole] = useState(false);
  const [editId, setEditId] = useState("")
  const [role, setRole] = useState("editor")


  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/getalluser", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUsers(data.users);
    });
  }, []);


  function deleteUserHandler(index, id) {
    const sendRequestToDelete = async () => {
      await axios
        .delete("http://localhost:3001/deleteuser/" + id, { withCredentials: true })
        .catch((err) => console.log(err));
    };

    sendRequestToDelete().then(() => {
      window.location.reload();
    });
  }

  const filteredUsers = users?.filter(user =>
    user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  function editUserRoleHandler(index, id) {
    setEditRole(true);
    setEditId(id);
  }

  function functionEditHandler() {
    console.log(editId, role)
    const updateUserRole = async (userId, newRole) => {
      try {
        const response = await axios.post(`http://localhost:3001/update-role/${userId}`, { newRole });
        const data = response.data;
        alert(data.message);
        window.location.reload();
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    };

    updateUserRole(editId, role);

  }



  return (
    <>
      {/* user list section */}
      <div className="flex flex-col px-4">
        <div className="flex w-full sm:w-[80%] md:w-[60%] flex-col px-2 gap-2">
          <label
            htmlFor="pendingRequest"
            className="text-txtLight font-medium text-sm sm:text-base"
          >
            {" "}
            Users ({filteredUsers?.length})
          </label>
          <div className="flex flex-col gap-2 overflow-hidden  ">
            {filteredUsers?.length === 0 ? (
              <p className="text-txtLight px-2">No users.</p>
            ) : (
              <>
                {filteredUsers?.slice(0, showUsers ? undefined : 3)
                  .map((val, index) => (
                    <div
                      key={index}
                      className="flex bg-white text-dark rounded-md border-gray-300 border-[1px] px-2 py-2 items-center"
                    >
                      <div className="flex gap-2 md:gap-4 items-center w-full ">
                        <div className="w-7 h-7 md:w-[3rem] md:h-[3rem] rounded-full bg-gray-300 flex-shrink-0 object-cover overflow-hidden border-gray-300 border-2 cursor-pointer" onClick={() => {
                          navigate(`/cms-admin/user/${val?._id}`)
                        }}>
                          {" "}
                          <img
                            src={val.profilePic}
                            alt="user img"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className=" flex flex-col  w-full md:w-[90%]">
                          <div className="flex justify-between flex-wrap">
                            <p className="cursor-pointer font-semibold text-sm md:text-base ">
                              {val.username}

                            </p>

                            <span className=" text-gray-400 text-xs md:text-sm">
                              Role: {val?.role}
                            </span>
                          </div>
                          <div className="flex items-center justify-between flex-wrap">

                            <p className="break-all text-txtLight  rounded-md text-xs sm:text-sm md:text-base">
                              {val.email}
                            </p>
                            <div className="flex gap-4 px-2  text-txtLight">
                              <MdModeEdit className="hover:text-dark cursor-pointer" onClick={() => editUserRoleHandler(index, val?._id)} />
                              <IoMdTrash className="hover:text-dark cursor-pointer text-red-500" onClick={() => deleteUserHandler(index, val?._id)} />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
            {editRole && (
              <>
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
                  <div
                    className="relative flex w-[50%] md:w-[45%] px-4 py-4 bg-dark rounded-sm flex-col gap-2 items-center"
                  >
                    <div className="flex absolute inset-0 h-8 w-8  justify-center items-center">
                      <button
                        className="text-gray-400 w-5 h-5 hover:text-gray-300 focus:outline-none"
                        onClick={() => { setEditRole(false) }}

                      >
                        <AiOutlineClose className="text-lg" />
                      </button>
                    </div>
                    {/* edit role */}
                    <div className="flex flex-1  flex-col justify-center items-center text-white gap-4">
                      <div className="flex flex-col gap-1 justify-center items-center">
                        <h1 className="text-xl md:text-3xl font-semibold text-center">
                          Edit Role
                        </h1>
                      </div>

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
                      className="bg-green-400 border-2 border-gray-400 px-8 py-1 rounded-md focus:border-gray-300 mt-4"
                      onClick={functionEditHandler}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
            {filteredUsers?.length > 3 && (
              <button
                onClick={() => {
                  setShowUsers(!showUsers);
                }}
                className="md:px-2 border-2 border-gray-300 rounded-md w-[50%] sm:w-[30%] md:w-[30%] self-center text-dark bg-white flex justify-center items-center font-medium text-xs md:text-sm focus:outline-2 focus:outline-txtLight"
              >
                {showUsers ? "View Less" : "View All"}
                {showUsers ? (
                  <BiChevronUp className="text-2xl" />
                ) : (
                  <BiChevronDown className="text-2xl" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>

  )
}

export default UserList;