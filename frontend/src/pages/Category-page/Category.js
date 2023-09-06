import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LatestUpdatesSide from "../../components/Landing-news-section/LatestUpdatesSide";
import { Fade } from "react-awesome-reveal";
import { AiOutlineHome } from "react-icons/ai";
import axios from "axios";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../feature/postReducer";

const Category = ({ categoryAds }) => {
  const slug = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const words = slug.cat.split("-");
  const cat = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");


  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/post/category/" + cat)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setArticleData(data.posts);
      setIsLoading(false);
    });

    dispatch(getAllPost())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [slug]);

  const postDetails = useSelector((state) => state.posts.allPost.result);

  return (
    <>
      <div className="flex w-[90%] xl:w-[85%] 2xl:w-[80%] items-center justify-center pt-4">
        <div className="flex flex-col w-full gap-2 md:gap-4">
          <div className="flex w-[100%] gap-x-5 ">
            <div className=" flex md:w-[75%]  flex-col gap-8 py-4 px-2">
              <div className="flex flex-col gap-2">
                {/* category */}
                <span className="flex gap-2 items-center text-txtLight text-xs sm:text-sm md:text-base dark:text-white">
                  <AiOutlineHome className="cursor-pointer hover:text-dark" /> /{" "}
                  <p className="underline text-[#434141] font-semibold cursor-pointer tracking-widest dark:text-white">
                    {" "}
                    {slug?.cat}
                  </p>
                </span>
              </div>
              <div className="grid md:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-6">
                {articleData?.length === 0 ? (
                  <>
                    <h1 className="font-bold">No posts</h1>
                  </>
                ) : (
                  articleData?.map((val, index) => (
                    <>
                      {/* one item start  */}
                      <Fade>
                        <div
                          className="flex cursor-pointer"
                          key={index}
                          onClick={() => {
                            navigate(
                              `/article/${val?.title.replace(/\s+/g, "-")}`
                            );
                          }}
                        >
                          <div className="w-[45%]">
                            <img
                              className="h-[6rem] w-full object-cover rounded-md"
                              src={val.picture}
                              alt="news1 "
                            />
                          </div>
                          {/*This Is to separate three spans in sport section*/}
                          <div className="flex flex-col h-[6rem] p-2 gap-y-4 w-[55%]">
                            <span className="font-bold text-[14px]  font-timesNewRoman leading-relaxed tracking-wide line-clamp-2 dark:text-white">
                              {val.title}
                            </span>
                            <span className="text-[10px] font-domine text-gray-400 dark:text-yellow-200">
                              {format(val.createdAt)} | {val.postedBy.username}
                            </span>
                          </div>
                        </div>
                      </Fade>
                      {/* one items end  */}
                    </>
                  ))
                )}
              </div>
              <div className="w-full flex items-center justify-center font-timesNewRoman font-semibold tracking-widest leading-relaxed md:my-8 my-4">
                {articleData.length < 7 ? (
                  ""
                ) : (
                  <>
                    <span className="px-4 py-2 bg-[#121221] dark:bg-black text-white rounded-md cursor-pointer">
                      Load More
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block md:w-[30%]">
              <LatestUpdatesSide postDetails={postDetails} />
              {categoryAds &&  categoryAds.image2 ? (
                <>
                  <a href={categoryAds.link2}>
                    <img src={categoryAds.image2} className=" object-cover " />
                  </a>
                </>
              ) : (
                <>
                  <img
                    src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791121/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%A8-%E0%A4%96%E0%A4%AC%E0%A4%B0_qxbihj.jpg"
                    className=" object-cover "
                  />
                </>
              )}
              {categoryAds &&  categoryAds.image3 ? (
                <>
                  <a href={categoryAds.link3}>
                    <img src={categoryAds.image3} className=" object-cover " />
                  </a>
                </>
              ) : (
                <>
                  <img
                    src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791121/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%A8-%E0%A4%96%E0%A4%AC%E0%A4%B0_qxbihj.jpg"
                    className=" object-cover "
                  />
                </>
              )}

              <div>
                {categoryAds &&  categoryAds.image4 ? (
                  <>
                    <a href={categoryAds.link4}>
                      <img
                        src={categoryAds.image4}
                        className=" object-cover "
                      />
                    </a>
                  </>
                ) : (
                  <>
                    <img
                      src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791121/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%A8-%E0%A4%96%E0%A4%AC%E0%A4%B0_qxbihj.jpg"
                      className=" object-cover "
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
