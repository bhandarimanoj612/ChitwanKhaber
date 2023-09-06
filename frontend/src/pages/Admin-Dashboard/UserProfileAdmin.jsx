import { useState, useEffect } from "react";
import { BiSolidShare, BiCommentDetail } from "react-icons/bi";
import { LuEdit2 } from "react-icons/lu";
import { FcAddImage } from "react-icons/fc";
import Dashboard from "./Dashboard";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./EditUser";
import EditPassword from "./EditPassword";
axios.defaults.withCredentials = true;



function UserProfileAdmin() {
  const [user, setUser] = useState();
  const [editUser, setEditUser] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState();
  const [postsData, setPostsData] = useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendPostRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/post/allpost/admin", { withCredentials: true })
      .catch((err) => console.log(err));
    const posts = await res.data;
    return posts;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setImg(data.user.profilePic)
    });
    sendPostRequest().then((posts) => {
      setPostsData(posts.result);
    });
  }, []);


  const editHandler = (e) => {
    e.preventDefault()
    setEditUser(true)
  }

  function editPasswordHandler(e) {
    e.preventDefault();
    setEditPassword(true)

  }
  const handleBoolValueChange = (newValue) => {
    setEditUser(newValue);
  };
  const handleBoolValueChangePassword = (newValue) => {
    setEditPassword(newValue);
  };


  async function imageUpload(imgs) {
    console.log("hellotoat");
    try {
      const data = new FormData();
      data.append("file", imgs);
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
        console.log(res2.error);
      } else {
        let x = res2.url;
        toast.update(toastIdImage, {
          render: "Image uploaded successfully!",
          autoClose: 3000,
        });
        const data = {
          img: x,
        };
        await axios
          .post("http://localhost:3001/edit-img", data, {
            withCredentials: true,
          })
          .then(() => {
            toast.success("Successfully, updated profile");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }


  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImg(changeEvent.target.files[0]);
    imageUpload(changeEvent.target.files[0]);
  }




  return (
    <>
      <Dashboard />

      <div className="pb-36">

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
              <span>Username</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={user && (`${user?.username}`)}
                  className="border border-gray-400 rounded-md pl-3 py-2 w-96 "
                />
                <LuEdit2 className="text-2xl  cursor-pointer" onClick={editHandler} />
              </div>
            </div>

            <div>
              <span>Email Address</span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder={user && (`${user?.email}`)}
                  className="border border-gray-400 rounded-md pl-3 py-2 w-96"
                />
                <LuEdit2 className="text-2xl  cursor-pointer" onClick={editHandler} />
              </div>
            </div>

            <div>
              <span>Password</span>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  placeholder="*********"
                  className="border border-gray-400 rounded-md pl-3 py-2 w-96"
                />
                <LuEdit2 className="text-2xl  cursor-pointer" onClick={editPasswordHandler} />
              </div>
            </div>
          </div>
          {/* User Image Section */}
          <div className="flex relative pl-10">
            <div className="flex flex-col justify-center items-center">
              <div className="rounded-full bg-slate-300 h-32 w-32 border border-gray-400 overflow-hidden">
                {imageSrc ? (
                  <>

                    <img
                      src={imageSrc}
                      alt="profile"
                      className="object-cover w-[10rem] h-[10rem]"
                    />

                  </>
                ) : (
                  <>

                    <img
                      src={img}
                      alt="profile"
                      className="object-cover w-[10rem] h-[10rem]"
                    />

                  </>
                )}
              </div>
              <span className="font-[500]">{user && (user?.username)}</span>
            </div>

            <div className="flex flex-col justify-center items-center absolute md:top-32 md:left-32 top-24 left-32 cursor-pointer">
              <div className="rounded-full bg-slate-300 h-8 w-8 border border-gray-400  flex items-center justify-center relative cursor-pointer">
                <input
                  type="file"
                  name="postImg"
                  id="postimg-input"
                  accept="image/jpeg, image/png"
                  onChange={handleOnChange}
                  className="cursor-pointer absolute inset-0 opacity-0 z-50"
                />
                <FcAddImage size={25} className="cursor-pointer" />
              </div>
            </div>

          </div>
        </div>

        {/* for search  */}
        {editUser ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <EditUser props={handleBoolValueChange} userData={user} />
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
          ""
        )}

        {/* for search  */}
        {editPassword ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <EditPassword props={handleBoolValueChangePassword} userData={user} />
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
          ""
        )}
        <span
          className="md:mx-20 ml-24 lg:gap-52 md:flex-row md:gap-11 font-bold text-lg
      flex flex-col-reverse pb-4"
        >
          User's Recent Post
        </span>

        <div className="w-[100%] flex item-center justify-center">
          {/* User All posts Section */}
          <div className="w-[88%] gap-8 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1">
            {postsData?.slice(0, 5).map((val, index) => {
              // Filter out posts with isDraft equal to true
              if (!val.isDraft) {
                return (
                  <div key={index}>
                    <span className="font-serif text-gray-500">{val?.postedBy.username}</span>
                    <div className=" h-[12rem] rounded-xl ">
                      <img src={val.picture} alt="news" className="w-full h-full object-cover rounded-md" />
                    </div>
                    <div className="h-14 overflow-hidden">
                      <h3 className="font-bold font-timesNewRoman leading-relaxed tracking-wide">{val.title}</h3> {/* Display the post title */}
                    </div>
                  </div>
                );
              } else {
                return null; // Don't render drafts
              }
            })}

          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileAdmin;
