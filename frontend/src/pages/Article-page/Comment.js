import { useRef, useState, useEffect } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import { addComment } from "../../feature/commentSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import {format} from "timeago.js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CommentSection({ postId }) {
  const textareaRef = useRef(null);
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [commentsData, setCommentsData] = useState();

  const sendRequestComment = async () => {
    try {
      if (postId) {
        const res = await axios.get(
          `http://localhost:3001/post/${postId}/comments`,
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        return data;
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      return [];
    }
  };

  useEffect(() => {
    sendRequestComment().then((data) => setCommentsData(data?.comments));
  }, [postId]);

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") {
      return; // Prevent submitting empty comments
    }
    if (username && profile) {
      const data = {
        postId: postId,
        comment: newComment,
        profile: profile,
        username: username,
      };
      dispatch(addComment(data));
      handleTextareaResize();
    }
  };

  const handleTextareaResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      textareaRef.current.style.maxHeight = "8rem";
    }
  };

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  const commentsDatas = useSelector((state) => state.comments);

  const handleToast = (commentsDatas) => {
    switch (commentsDatas.allCommentStatus) {
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
            render: "Comment, added successfully",
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
          sendRequestComment().then((data) => setCommentsData(data.comments));
          setNewComment("");
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: "Something went wrong",
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

  // call the handleToast function when commentsData changes
  useEffect(() => {
    if (commentsDatas && commentsDatas.allCommentStatus) {
      handleToast(commentsDatas);
    }
  }, [commentsDatas]);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-black  w-full gap-4 border-y-2 border-gray-300 px-4 md:px-8 py-4 md:py-8">
      {/* label and text area */}
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 font-medium text-sm md:text-lg">
          <BiSolidCommentDetail className="flex flex-shrink-0" /> Comments
        </span>
        <GoogleOAuthProvider clientId="413784933925-2b99lvr45j9onafcb7p46g3341ccgta7.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              console.log(decoded);
              setUsername(decoded?.name);
              setProfile(decoded?.picture);

              setSuccessLogin(true);
            }}
            onError={() => {
              setSuccessLogin(false);
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>

        <div className="flex items-center flex-row gap-2 md:gap-4 w-full rounded-lg flex-nowrap ">
          <textarea
            ref={textareaRef}
            placeholder="Type your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex sm:flex-shrink w-full rounded-lg px-4 py-2 border-2 border-gray-300 dark:bg-[#242424] focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none lg:overflow-hidden text-sm md:text-base font-serif dark:text-white"
            onInput={handleTextareaResize}
          />
          {/* post comment button */}
          {successLogin ? (
            <>
              <button
                type="submit"
                onClick={handleCommentSubmit}
                className="text-txtLight text-lg cursor-pointer focus:outline-none focus:ring-2 rounded-sm focus:ring-gray-400 "
              >
                <IoMdSend />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        {commentsData?.length === 0 ? (
          <p className="text-txtLight">No comments yet.</p>
        ) : (
          <ul className="list-reset flex flex-col gap-2 md:gap-4">
            {/* show at most 3 comments firstly */}
            {commentsData
              ?.slice(0, showAllComments ? undefined : 3)
              .map((comment) => (
                <li
                  key={comment._id}
                  className="flex flex-wrap items-center gap-2  md:gap-4 p-2 "
                >
                  <div className="flex gap-2 md:gap-4 items-center w-full ">
                    <div className="w-7 h-7 md:w-[3rem] md:h-[3rem] rounded-full bg-gray-300 flex-shrink-0 object-cover overflow-hidden border-gray-300 border-2">
                      {" "}
                      <img
                        src={comment.profile}
                        alt="user img"
                        className="w-full h-full"
                      />
                    </div>
                    <div className=" flex flex-col gap-2 w-full md:w-[90%] ">
                      <div className="flex gap-2 justify-between flex-wrap dark:text-white">
                        <p className="cursor-pointer text-sm font-bold">
                          {comment.username}
                        </p>
                        <div className="flex">
                          <span className=" text-gray-400 text-xs md:text-sm dark:text-yellow-200">
                            {format(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <p className="break-words bg-gray-200 p-2 md:p-3 rounded-md text-xs md:text-base font-serif leading-relaxed tracking-wide dark:bg-[#242424] dark:text-white">
                        {comment.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
        {/* Show "View All" button if there are more than 3 comments */}
        {commentsData?.length > 3 && (
          <button
            onClick={toggleShowAllComments}
            className="md:px-2 border-2 border-gray-300 rounded-md w-[50%] sm:w-[30%] md:w-[30%] self-center text-dark bg-white flex justify-center items-center font-medium text-xs md:text-sm focus:outline-2 focus:outline-txtLight dark:bg-[#242424] dark:text-white"
          >
            {showAllComments ? "View Less" : "View All"}
            {showAllComments ? (
              <BiChevronUp className="text-2xl" />
            ) : (
              <BiChevronDown className="text-2xl" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
