import React, { useState, useEffect, useRef } from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoriesData from "./Categories";
import RichTextEditor from "./RichTextEditor";
import { HiPhoto } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../feature/postReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Politics");
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState(null);
  const [isDraft, setIsDraft] = useState(false);

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    try {
      reader.readAsDataURL(changeEvent.target.files[0]);
      setImg(changeEvent.target.files[0]);
    } catch (error) {
      alert("Error reading file");
      console.error("Error reading file:", error);
    }
  }

  // image upload
  async function imageUpload() {
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "odpnluy0");
      data.append("cloud_name", "dfmzsqto7");

      // Use toast to display a pending toast message while the image is being uploaded
      const toastIdImage = toast("Uploading image...", {
        // set autoClose to false so that the toast stays visible until the promise resolves
        autoClose: false,
        // set type to "info" to display a pending toast message
        type: "info",
      });

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfmzsqto7/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();
      console.log(res2);
      if (res2.error) {
        console.log("something went wrong");
      } else {
        let x = res2.url;
        const data = {
          img: x,
          content,
          title,
          category,
          isDraft,
        };
        dispatch(createPost(data));
        // update the toast object with a success message and type
        toast.update(toastIdImage, {
          render: "Image uploaded successfully!",
          type: "success",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function publishHandler(e) {
    if (img && title && content) {
      if (category) {
        imageUpload();
      } else {
        alert("Please, Select the category!..");
      }
    } else {
      alert("Please, fill all the field to post!..");
    }
  }

  //create post state handler-->
  const createPostState = useSelector((state) => state.posts);

  const handleToast = (createPostState) => {
    switch (createPostState.createPostStatus) {
      case "pending":
        if (toastId.current === null) {
          toastId.current = toast.info("Loading...", {
            position: "top-right",
            autoClose: 8000,
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
            render: createPostState.createPost.message,
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
          window.location.reload();
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: createPostState.createPostError,
            type: toast.TYPE.ERROR,
            autoClose: 8000,
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

  // call the handleToast function when createPostState changes
  useEffect(() => {
    if (createPostState && createPostState.createPostStatus) {
      handleToast(createPostState);
    }
  }, [createPostState]);

  return (
    <div className="flex flex-col w-full h-full pb-40 bg-gray-200 py-2 gap-4 font-serif leading-relaxed tracking-wide">
      <div className="flex justify-between items-center border-b-[1px] border-b-gray-400 px-8 py-2">
        <Link to="/dashboard/Posts">
          <AiOutlineArrowLeft className="text-2xl md:text-3xl text-gray-500 hover:text-dark cursor-pointer" />
        </Link>
        {/* save as daraft  */}
        <div className="flex items-center justify-center gap-x-3">
          <span>Save as Draft: </span>
          <input
            type="checkbox"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
          />
        </div>

        {/* publish button */}
        <button
          className="text-sm md:text-base flex items-center gap-2 border-2 border-gray-400 outline-none bg-white  px-4 py-2 rounded-lg focus:ring-1 focus:ring-dark font-medium"
          onClick={publishHandler}
        >
          <IoMdSend />
          Publish
        </button>
      </div>

      <div className="w-full flex flex-col items-center gap-4 px-8 ">
        <div className="w-full">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Enter Title here..."
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-gray-100 border-2 rounded-md shadow-sm text-sm sm:text-base"
          />
        </div>
        <div className="w-full">
          <label htmlFor="postimg-input" className="cursor-pointer">
            <span className="font-bold font-serif">Select Title image</span>
            <HiPhoto size={25} color="#f5190a" />
          </label>
          <input
            type="file"
            name="postImg"
            id="postimg-input"
            onChange={handleOnChange}
            style={{ display: "none" }}
          />
          {imageSrc ? (
            <>
              <div className="w-[100%] ">
                <img
                  src={imageSrc}
                  className="w-[15rem] object-cover rounded-b-md"
                />
              </div>
              <span
                className="bg-red-300 px-4 py-1 mt-5 rounded-md cursor-pointer flex items-center justify-center w-[6rem] "
                onClick={() => {
                  setImageSrc(false);
                  setImg(null);
                }}
              >
                Clear
                <AiOutlineClose size={18} />
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-full ">
          <label htmlFor="content" className="font-bold">
            Content
          </label>
          <RichTextEditor setContent={setContent} value={content} />
        </div>
        <div className="w-full">
          <label htmlFor="category" className="font-bold">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border-gray-100 border-2 rounded-md shadow-sm text-sm sm:text-base"
          >
            {CategoriesData.map((value) => (
              <option htmlFor={value.catValue}>{value.category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
