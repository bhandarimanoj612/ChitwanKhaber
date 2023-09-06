import SettingDashboard from "./Dashboard";
import { AiOutlinePlus } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  BiSolidCommentDetail,
  BiChevronDown,
  BiChevronUp,
} from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { useState, useEffect } from "react";
import MoreOptions from "./MoreOptions";
import axios from "axios";
axios.defaults.withCredentials = true;

function Posts() {
  const [showAllPost, setShowAllPost] = useState(false);
  const [filter, setFilter] = useState("all");
  const [openOptionsIndex, setOpenOptionsIndex] = useState(-1);
  const [postsData, setPostsData] = useState([]);

  const toggleShowAllPost = () => {
    setShowAllPost(!showAllPost);
  };

  // filtering posts data based on dropdown selection
  let filteredPosts = postsData;

  if (filter === "published") {
    filteredPosts = postsData?.filter((post) => !post.isDraft);
  }

  if (filter === "draft") {
    filteredPosts = postsData?.filter((post) => post.isDraft);
  }

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/post/allpost/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setPostsData(data.result);
    });
  }, []);

  return (
    <div
      className="flex w-full flex-col px-8"
      onClick={() => openOptionsIndex !== -1 && setOpenOptionsIndex(-1)} //closes the option if clicked outside the option
    >
      <SettingDashboard />
      <div className="flex flex-col bg-gray-100 w-full min-h-screen gap-2 pb-16">
        {/* Posts top start*/}
        <div className="flex justify-between items-center py-2 border-b-2 border-b-gray-300 px-4 gap-2">
          <span className="text-xl font-bold text-dark">Posts</span>
          <Link to="/dashboard/create-post">
            <button className="px-2 py-[0.2rem]  border-2 border-gray-300 rounded-md  text-dark bg-white flex justify-center items-center font-semibold text-xs md:text-lg focus:outline-2 focus:outline-txtLight md:gap-2 hover:border-gray-400">
              {" "}
              <AiOutlinePlus className="text-xl " /> New Post
            </button>
          </Link>
        </div>
        {/* Posts top end */}
        <div className="flex px-4">
          <select
            className="flex border-[1px] border-gray-200 rounded-sm w-[6rem] md:w-[8rem] bg-transparent text-xs sm:text-base text-txtLight font-medium cursor-pointer focus:outline-txtLight"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All ({postsData.length})</option>
            <option value="published">
              Published ({postsData.filter((post) => !post?.isDraft).length})
            </option>
            <option value="draft">
              Draft ({postsData.filter((post) => post?.isDraft).length})
            </option>
          </select>
        </div>

        <div className="flex flex-col  gap-4 px-4 py-4 w-full">
          {postsData.length === 0 ? (
            <p className="text-txtLight">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
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
    </div>
  );
}

export default Posts;
