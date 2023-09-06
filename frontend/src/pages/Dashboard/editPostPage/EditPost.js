import React, { useState, useEffect} from "react";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";
import CategoriesData from "./Categories";
import RichTextEditor from "./RichTextEditor";
import { HiPhoto } from "react-icons/hi2";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

function EditPost() {
  const id = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [contentToSend, setContentToSend] = useState("");
  const [img, setImg] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [postData, setPostData] = useState({});

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
        alert("something went wrong");
      } else {
        let x = res2.url;
        const data = {
          img: x,
          content,
          title,
          category,
          isDraft,
        };
        await axios
          .put("http://localhost:3001/post/updatepost/" + id.id, data, {
            withCredentials: true,
          })
          .then(() => {
            toast.success("Successfully, updated post!");
            window.location.reload();
          })
          .catch((err) => console.log(err));
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

  const publishHandler = async (e) => {
    e.preventDefault();
    if (img === postData?.picture) {
      const data = {
        img: postData?.picture,
        content,
        title,
        category,
        isDraft,
      };
      await axios
        .put("http://localhost:3001/post/updatepost/" + id.id, data, {
          withCredentials: true,
        })
        .then(() => {
          toast.success("Successfully, updated profile");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      imageUpload();
    }
  };

  const sendRequest = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/post/edit-post/authenticate/" + id.id,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data?.message === "Access denied") {
        navigate("/dashboard/Posts");
      } else {
        setTitle(data?.post.title);
        setContentToSend(data?.post.content);
        setImg(data?.post.picture);
        setCategory(data?.post.category);
        setIsDraft(data?.post.isDraft);
        setPostData(data?.post);
      }
    });
  }, [navigate]);

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
            <>
              <div className="w-[100%] ">
                <img
                  src={img}
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
          )}
        </div>
        <div className="w-full ">
          <label htmlFor="content" className="font-bold">
            Content
          </label>
          <RichTextEditor
            setContent={setContent}
            value={content}
            contentToSend={contentToSend}
          />
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
            {CategoriesData.map((value, index) => (
              <option htmlFor={value.catValue} key={index}>{value.category}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
