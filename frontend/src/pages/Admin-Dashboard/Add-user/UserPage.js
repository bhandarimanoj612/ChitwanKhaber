import SettingDashboard from "../Dashboard";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import AddUser from "./AddUser";
import UserList from "./UserList";

function UserPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleAreaClick = (e) => {
    e.stopPropagation();
  };
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="flex w-full flex-col px-8">
      <SettingDashboard />
      <div className="flex flex-col bg-gray-100 w-full min-h-screen gap-8 pb-16">
        {/* users top start*/}
        <div className="flex justify-between py-2 border-b-2 border-b-gray-300 px-4">
          <span className="text-xl font-bold text-dark">Users</span>

          <div className="relative w-[50%] md:w-[20%]">
            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 text-xs md:text-base rounded-md pl-8 pr-4 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />

            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {/* users top end */}

        {/* add user  */}
        <div className="ml-6 flex flex-col gap-y-4">
          <span className="font-serif font-bold text-lg">
            Do you want to add someone?
          </span>
          <span
            className="flex px-4 py-2 bg-green-300 w-[10rem] items-center justify-center gap-x-2 font-serif font-bold cursor-pointer"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            Add User
            <AiOutlinePlus size={15} />
          </span>
        </div>

        {showAddForm && (
          <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
              <AddUser
                handleOutClick={handleAreaClick}
                handleClick={toggleAddForm}
              />
            </div>
          </>
        )}

        <UserList searchValue={searchValue} />
      </div>
    </div>
  );
}

export default UserPage;
