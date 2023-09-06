import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiSolidShare } from "react-icons/bi";
import Dashboard from "../Dashboard";
import {
  BiSolidCommentDetail,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";
import { FiMoreVertical } from "react-icons/fi";
import MoreOptions from "../MoreOptions";
import axios from "axios";

const OtherUserProfile = () => {
  const id = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [showAllPost, setShowAllPost] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openOptionsIndex, setOpenOptionsIndex] = useState(-1);

  const toggleShowAllPost = () => {
    setShowAllPost(!showAllPost);
  };

  // filtering posts data based on dropdown selection
  let filteredPosts = posts;

  if (filter === "published") {
    filteredPosts = posts?.filter((post) => !post.isDraft);
  }

  if (filter === "draft") {
    filteredPosts = posts?.filter((post) => post.isDraft);
  }

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/user/" + id.id, { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setPosts(data.post);
    });
  }, []);

  return (
    <>
      <Dashboard />

      <div
        className=""
        onClick={() => openOptionsIndex !== -1 && setOpenOptionsIndex(-1)} //closes the option if clicked outside the option
      >
        {/* Heading Section */}
        <div className="flex justify-between mx-14 my-3 border-b-2 border-gray-300 py-1">
          <h2 className="font-[500] md:text-3xl text-xl">User Profile</h2>
          <div className="flex gap-2 items-center">
            <BiSolidShare className="md:text-2xl text-xl" />
            <span className="text-sm">Share Profile</span>
          </div>
        </div>

        {/* User Details Section */}
        <div
          className="md:mx-20 md:mt-7 mx-20 lg:gap-52 md:flex-row md:gap-11
 flex flex-col-reverse pb-14 border-b border-gray-400 mb-6 bg-gray-1 "
        >
          {/* User personal detail Section */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-bold font-serif flex gap-x-2">
                Username:
                <span className="font-timesNewRoman text-gray-500">
                  {user && `${user?.username}`}
                </span>
              </span>
            </div>

            <div>
              <span className="font-bold font-serif flex gap-x-2">
                Email Address:
                <span className="font-timesNewRoman text-gray-500">
                  {user && `${user?.email}`}
                </span>
              </span>
            </div>
            <div>
              {posts ? (
                <>
                  <span className="font-bold font-serif flex gap-x-2">
                    Number of Article:
                    <span className="font-timesNewRoman text-gray-500">
                      {posts && `${posts?.length}`}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold font-serif flex gap-x-2">
                    Number of Article:
                    <span className="font-timesNewRoman text-gray-500">0</span>
                  </span>
                </>
              )}
            </div>
          </div>
          {/* User Image Section */}
          <div className="flex relative pl-10">
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-full bg-slate-300 h-32 w-32 border border-gray-400 overflow-hidden">
                <img
                  src={user && `${user?.profilePic}`}
                  alt="profile"
                  className="object-cover w-[10rem] h-[10rem]"
                />
              </div>
              <span className="font-[500]">{user && user?.username}</span>
              <span className="font-[500]">{user && user?.bio}</span>
            </div>
          </div>
        </div>

        <span
          className="md:mx-20 ml-24 lg:gap-52 md:flex-row md:gap-11 font-bold text-lg
flex flex-col-reverse pb-4"
        >
          {user && `${user?.username} Posts`}
        </span>
        {/* Posts top end */}
        <div className="flex px-4 items-center justify-center mb-5">
          <select
            className="flex border-[1px] border-gray-200 rounded-sm w-[6rem] md:w-[8rem] bg-transparent text-xs sm:text-base text-txtLight font-medium cursor-pointer focus:outline-txtLight"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All ({posts.length})</option>
            <option value="published">
              Published ({posts.filter((post) => !post?.isDraft).length})
            </option>
            <option value="draft">
              Draft ({posts.filter((post) => post?.isDraft).length})
            </option>
          </select>
        </div>

        {/* User All posts Section */}
        <div
          className="flex flex-col items-center justify-center  gap-4 px-4 py-4 w-full pb-32"
          onClick={() => openOptionsIndex !== -1 && setOpenOptionsIndex(-1)} //closes the option if clicked outside the option
        >
          {posts.length === 0 ? (
            <p className="text-txtLight">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 w-[90%]">
              {filteredPosts
                .slice(0, showAllPost ? undefined : 8)
                .map((val, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between rounded-md overflow-hidden gap-2"
                  >
                    <div className="h-[12rem]">
                      <img
                        src={val.picture}
                        alt="related article 1"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex flex-col justify-between px-2 gap-2 sm:gap-3 ">
                      <span className="text-xs sm:text-sm font-bold line-clamp-2">
                        {val.title}
                      </span>
                      <div className="flex justify-between  items-center text-xs">
                        <p className="text-xs text-txtLight flex gap-2">
                          {!val?.isDraft ? (
                            <p>Published</p>
                          ) : (
                            <p className="text-blue-600">DRAFT</p>
                          )}{" "}
                          • {val.date}
                        </p>
                        <div className="flex justify-between items-center gap-2 text-txtLight text-sm md:text-base bg-red- ">
                          <BsShareFill
                            className={
                              !val?.isDraft
                                ? `hover:text-dark cursor-pointer text-sm`
                                : `hidden`
                            }
                          />
                          <p className="flex items-center text-sm gap-1">
                            {val.commentCount}
                            <BiSolidCommentDetail className="hover:text-dark cursor-pointer text-base" />
                          </p>
                          <FiMoreVertical
                            className="hover:text-dark cursor-pointer text-lg"
                            // for displaying options based on the index of post clicked
                            onClick={() =>
                              setOpenOptionsIndex(
                                index === openOptionsIndex ? -1 : index
                              )
                            }
                          />
                          {index === openOptionsIndex && (
                            <MoreOptions
                              published={!val?.isDraft}
                              postId={val?._id}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {filteredPosts.length > 3 && (
            <button
              onClick={toggleShowAllPost}
              className="md:px-2 border-2 border-gray-300 rounded-md w-[50%] sm:w-[30%] md:w-[30%] self-center text-dark bg-white flex justify-center items-center font-medium text-xs md:text-sm focus:outline-2 focus:outline-txtLight"
            >
              {showAllPost ? "View Less" : "View All"}
              {showAllPost ? (
                <BiChevronUp className="text-2xl" />
              ) : (
                <BiChevronDown className="text-2xl" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default OtherUserProfile;
