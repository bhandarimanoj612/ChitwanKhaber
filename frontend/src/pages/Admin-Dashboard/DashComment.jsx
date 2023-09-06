import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiSealWarningBold } from "react-icons/pi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import Dashboard from "./Dashboard";
import { format } from "timeago.js"
import axios from "axios";
axios.defaults.withCredentials = true;


function DashComment() {
  const [allComment, setAllComment] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filteredPost = allComment?.filter(post =>
    post.post.title.toLowerCase().includes(searchValue.toLowerCase())
  );


  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/post/allcomment/admin", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setAllComment(data.result);
    });
  }, []);

  function commentDeleteHandler(commentId) {
    const sendRequestToDelete = async () => {
      await axios
        .delete("http://localhost:3001/post/deletecomment/" + commentId, { withCredentials: true })
        .catch((err) => console.log(err));
    };

    sendRequestToDelete().then(() => {
      alert("Sucessfully, Deleted..")
      window.location.reload();
    });
  }

  return (
    <div className="">
      <div className="flex  w-full font-semibold text-base md:text-lg px-4 md:px-10 py-2 justify-start gap-4 sm:gap-8 mb-[-1rem]">
        {/* hamburger menu */}
        <Dashboard />
      </div>

      {/*Division which holds Comment Section */}
      <div className="py-4 mb-14 w-full">
        {/*This Division contains Heading and a search bar */}
        <div
          className="mx-6 sm:mx-14 my-3 py-1 flex border-b-2
         border-gray-300 items-center flex-wrap justify-between"
        >
          <span className="font-[500] lg:text-3xl text-xl">Comments</span>
          <div className="relative w-[50%] md:w-[20%]">

            <input
              type="text"
              placeholder="Search ..."
              className="border border-gray-300 text-xs md:text-base rounded-md pl-8 pr-4 w-full py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => { setSearchValue(e.target.value) }}
            />

            <AiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />

          </div>
        </div>
        {/*All news filter */}
        <div className="flex mx-8 my-8 sm:mx-20">
          <span>All ({filteredPost?.length})</span>
          <RiArrowDropDownLine className="text-3xl" />
        </div>
        {/*All Comments Section */}
        {filteredPost?.length === 0 ? (

          <p className="text-txtLight px-2">No Comments.</p>

        ) : filteredPost?.map((val) => (
          <>
            <div
              className="mx-5 my-3 border border-gray-400 px-3
     py-2 flex justify-between lg:mx-20"
            >
              <div className="flex gap-5">
                <div
                  className="border border-gray-400
  bg-slate-600 rounded-full lg:w-16 lg:h-16 w-20 h-12 sm:w-14 sm:h-14"
                >
                  <img src={val.profile} alt="comment-profile" className="rounded-full" />
                </div>
                <div>
                  <p className="text-blue-800 font-[600] text-xs sm:text-sm">
                    {val.username}{" "}
                    <span className="font-[600] text-black text-xs sm:text-sm">
                      Commented on{" "}
                    </span>
                    {val.post.title}
                  </p>
                  <p className="text-xs sm:text-sm">{val.body}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs">{format(val.createdAt)}</p>
                <div className="flex justify-end">
                  <BsFillTrash3Fill className="text-xs text-red-500 cursor-pointer" onClick={() => commentDeleteHandler(val._id)} />
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default DashComment;
