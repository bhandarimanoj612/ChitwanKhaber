import React, { useState, useEffect } from "react";
import Dashboard from "../Admin-Dashboard/Dashboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const Ads = () => {
  const [imageSrc, setImageSrc] = useState();
  const [img, setImg] = useState();
  const [link, setLink] = useState("");
  const [linkCategory, setLinkCategory] = useState("");
  const [linkArticle, setLinkArticle] = useState("");
  const [page, setPage] = useState("");
  const [adNo, setAdNo] = useState("1");
  const [adNoCategory, setAdNoCategory] = useState("1");
  const [adNoArticle, setAdNoArticle] = useState("1");
  const [adHomeId, setAdHomeId] = useState("");
  const [adCategoryId, setCategoryId] = useState("");
  const [adArticleId, setAdArticleId] = useState("");

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

        await axios
          .put(
            `http://localhost:3001/ads/homead/${adHomeId}/${adNo}`,
            { image: x, link: link },
            { withCredentials: true }
          )
          .then(() => {
            toast.success(`Successfully updated ad${adNo}`);
            window.location.reload();
          })
          .catch((err) => {
            toast.error("Something went wrong");
          });

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

  function uploadAdFunction() {
    if (img && link && adNo) {
      imageUpload();
    }
  }
  function uploadAdCategoryFunction() {
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

          await axios
            .put(
              `http://localhost:3001/ads/categoryad/${adCategoryId}/${adNoCategory}`,
              { image: x, link: linkCategory },
              { withCredentials: true }
            )
            .then(() => {
              toast.success(`Successfully updated ad${adNoCategory}`);
              window.location.reload();
            })
            .catch((err) => {
              toast.error("Something went wrong");
            });

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
    if (img && linkCategory && adNoCategory) {
      imageUpload();
    }
  }

  function uploadAdArticleFunction() {
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

          await axios
            .put(
              `http://localhost:3001/ads/articlead/${adArticleId}/${adNoArticle}`,
              { image: x, link: linkArticle },
              { withCredentials: true }
            )
            .then(() => {
              toast.success(`Successfully updated ad${adNoArticle}`);
              window.location.reload();
            })
            .catch((err) => {
              toast.error("Something went wrong");
            });

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
    if (img && linkArticle && adNoArticle && adArticleId) {
      imageUpload();
    }
  }

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-home", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequestCategory = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-category", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequestArticle = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-article", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setAdHomeId(data.ads[0]._id);
    });
    sendRequestCategory().then((data) => {
      setCategoryId(data.ads[0]._id);
    });
    sendRequestArticle().then((data) => {
      setAdArticleId(data.ads[0]._id);
    });
  }, []);

  return (
    <>
      <Dashboard />
      <div className="w-[100%] flex flex-col items-center justify-center">
        <div className="w-[90%] flex flex-col items-center justify-center">
          <div className="flex gap-x-3 my-4">
            <span
              className="px-3 py-1 bg-blue-300 cursor-pointer"
              onClick={() => {
                setPage("home");
              }}
            >
              Home page
            </span>
            <span
              className="px-3 py-1 bg-blue-300 cursor-pointer"
              onClick={() => {
                setPage("category");
              }}
            >
              Category page
            </span>
            <span
              className="px-3 py-1 bg-blue-300 cursor-pointer"
              onClick={() => {
                setPage("article");
              }}
            >
              Article page
            </span>
          </div>

          {/* home */}
          {page === "home" ? (
            <>
              <div>
                <span>(Home page): Between navbar and slider (height)</span>
                <div className="flex flex-col gap-y-5 bg-slate-300 p-5">
                  <span>Long: 2560 (width) X 302 (height) </span>
                  <img
                    src={imageSrc}
                    className="w-[15rem] object-cover rounded-b-md"
                  />
                  <div className="flex flex-col gap-y-3">
                    <input
                      type="file"
                      name="postImg"
                      id="postimg-input"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={handleOnChange}
                      className=""
                    />
                    <input
                      type="text"
                      placeholder="Link.."
                      className="py-1 px-3"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                      value={link}
                    />
                    <label
                      for="role"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Select Ad No:
                    </label>
                    <select
                      id="role"
                      className="text-black"
                      onChange={(e) => {
                        setAdNo(e.target.value);
                      }}
                      defaultValue={adNo}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <span
                      className="py-1 px-3 rounded-md bg-green-400"
                      onClick={uploadAdFunction}
                    >
                      Upload
                    </span>
                  </div>

                  <span>Short: 1066 X 1600</span>
                  <div className="flex flex-col gap-y-3">
                    <input
                      type="file"
                      name="postImg"
                      id="postimg-input"
                      accept="image/jpeg, image/png"
                      onChange={handleOnChange}
                      className=""
                    />
                    <input
                      type="text"
                      placeholder="Link.."
                      className="py-1 px-3"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                    <label
                      for="role"
                      className="block mb-2 text-sm font-medium text-black"
                    >
                      Select Ad No:
                    </label>
                    <select
                      id="role"
                      className="text-black"
                      onChange={(e) => {
                        setAdNo(e.target.value);
                      }}
                      defaultValue={adNo}
                    >
                      <option value="">Select one</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    <span
                      className="py-1 px-3 rounded-md bg-green-400"
                      onClick={uploadAdFunction}
                    >
                      Upload
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {/* category  */}
          <div>
            {page === "category" ? (
              <>
                <div>
                  <span>(Category page): Category page(height)</span>
                  <div className="flex flex-col gap-y-5 bg-slate-300 p-5">
                    <span>Long: 2560 (width) X 302 (height) </span>
                    <img
                      src={imageSrc}
                      className="w-[15rem] object-cover rounded-b-md"
                    />
                    <div className="flex flex-col gap-y-3">
                      <input
                        type="file"
                        name="postImg"
                        id="postimg-input"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleOnChange}
                        className=""
                      />
                      <input
                        type="text"
                        placeholder="Link.."
                        className="py-1 px-3"
                        onChange={(e) => {
                          setLinkCategory(e.target.value);
                        }}
                        value={linkCategory}
                      />
                      <label
                        for="role"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Select Ad No:
                      </label>
                      <select
                        id="role"
                        className="text-black"
                        onChange={(e) => {
                          setAdNoCategory(e.target.value);
                        }}
                        defaultValue={adNoCategory}
                      >
                        <option value="1">1</option>
                      </select>
                      <span
                        className="py-1 px-3 rounded-md bg-green-400"
                        onClick={uploadAdCategoryFunction}
                      >
                        Upload
                      </span>
                    </div>

                    <span>Short: 1066 X 1600</span>
                    <div className="flex flex-col gap-y-3">
                      <input
                        type="file"
                        name="postImg"
                        id="postimg-input"
                        accept="image/jpeg, image/png"
                        onChange={handleOnChange}
                        className=""
                      />
                      <input
                        type="text"
                        placeholder="Link.."
                        className="py-1 px-3"
                        onChange={(e) => {
                          setLinkCategory(e.target.value);
                        }}
                      />
                      <label
                        for="role"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Select Ad No:
                      </label>
                      <select
                        id="role"
                        className="text-black"
                        onChange={(e) => {
                          setAdNoCategory(e.target.value);
                        }}
                        defaultValue={adNoCategory}
                      >
                        <option value="">Select one</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                      <span
                        className="py-1 px-3 rounded-md bg-green-400"
                        onClick={uploadAdCategoryFunction}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {/* article */}
          <div>
            {page === "article" ? (
              <>
                <div>
                  <span>(Article page): Article page(height)</span>
                  <div className="flex flex-col gap-y-5 bg-slate-300 p-5">
                    <span>Long: 2560 (width) X 302 (height) </span>
                    <img
                      src={imageSrc}
                      className="w-[15rem] object-cover rounded-b-md"
                    />
                    <div className="flex flex-col gap-y-3">
                      <input
                        type="file"
                        name="postImg"
                        id="postimg-input"
                        accept="image/jpeg, image/png, image/gif"
                        onChange={handleOnChange}
                        className=""
                      />
                      <input
                        type="text"
                        placeholder="Link.."
                        className="py-1 px-3"
                        onChange={(e) => {
                          setLinkArticle(e.target.value);
                        }}
                        value={linkArticle}
                      />
                      <label
                        for="role"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Select Ad No:
                      </label>
                      <select
                        id="role"
                        className="text-black"
                        onChange={(e) => {
                          setAdNoArticle(e.target.value);
                        }}
                        defaultValue={adNoArticle}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                      <span
                        className="py-1 px-3 rounded-md bg-green-400"
                        onClick={uploadAdArticleFunction}
                      >
                        Upload
                      </span>
                    </div>

                    <span>Short: 1066 X 1600</span>
                    <div className="flex flex-col gap-y-3">
                      <input
                        type="file"
                        name="postImg"
                        id="postimg-input"
                        accept="image/jpeg, image/png"
                        onChange={handleOnChange}
                        className=""
                      />
                      <input
                        type="text"
                        placeholder="Link.."
                        className="py-1 px-3"
                        onChange={(e) => {
                          setLinkArticle(e.target.value);
                        }}
                      />
                      <label
                        for="role"
                        className="block mb-2 text-sm font-medium text-black"
                      >
                        Select Ad No:
                      </label>
                      <select
                        id="role"
                        className="text-black"
                        onChange={(e) => {
                          setAdNoArticle(e.target.value);
                        }}
                        defaultValue={adNoArticle}
                      >
                        <option value="">Select one</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                      <span
                        className="py-1 px-3 rounded-md bg-green-400"
                        onClick={uploadAdArticleFunction}
                      >
                        Upload
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ads;
