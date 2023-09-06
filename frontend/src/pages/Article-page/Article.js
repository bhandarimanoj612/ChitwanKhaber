import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import CommentSection from "./Comment";
import RelatedArticles from "./Related";
import LatestUpdatesSide from "../../components/Landing-news-section/LatestUpdatesSide";
import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  TelegramIcon,
  InstapaperIcon,
} from "react-share";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";
import axios from "axios";
import parse from "html-react-parser";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../feature/postReducer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Article() {
  const slug = useParams();
  const [ArticleData, setArticleData] = useState({});
  const dispatch = useDispatch();
  // const [stateChanged, setStateChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articleAds, setArticleAds] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  const sendRequestArticle = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-article")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    dispatch(getAllPost())
      .then()
      .catch((error) => console.log(error));

    sendRequestArticle().then((data) => {
      setArticleAds(data.ads[0]);
    });
  }, []);

  const postDetails = useSelector((state) => state.posts.allPost.result);

  const words = slug.title.split("-");
  const title = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const encodedTitle = encodeURIComponent(title);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/post/article/" + encodedTitle)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setArticleData(data.post);
      setIsLoading(false);
    });
  }, [slug]);


  return (
    <>
      <div className="flex w-[90%] xl:w-[85%] 2xl:w-[80%] items-center justify-center pt-4 mt-20">
        <div className="flex flex-col w-full gap-2 md:gap-4">
          <div className="flex w-[100%] gap-x-5 ">
            <div className=" flex md:w-[75%] flex-col gap-8 py-4 px-2">
              <div className="flex flex-col gap-2">
                {/* category */}
                {isLoading ? (
                  <Skeleton width={300} height={32} baseColor="#d5d7db" />
                ) : (
                  <>
                    <span className="flex gap-2 items-center text-txtLight text-xs sm:text-sm md:text-base dark:text-white">
                      <AiOutlineHome className="cursor-pointer hover:text-dark" />{" "}
                      /{" "}
                      <p className="underline text-[#434141] font-semibold font-karma cursor-pointer tracking-widest dark:text-white">
                        {" "}
                        {ArticleData?.category}
                      </p>
                    </span>
                  </>
                )}

                {/* title */}
                {isLoading ? (
                  <Skeleton width={500} height={32} baseColor="#d5d7db" />
                ) : (
                  <>
                    <span className="font-karma text-dark font-bold text-xl tracking-wide leading-relaxed lg:text-3xl dark:text-white">
                      {ArticleData?.title}
                    </span>
                  </>
                )}

                {isLoading ? (
                  <Skeleton width={500} height={32} baseColor="#d5d7db" />
                ) : (
                  <>
                    {/* article editor */}
                    <span className="text-gray-400 font-domine flex gap-2 items-center text-sm md:text-base dark:text-yellow-200">
                      {" "}
                      <AiTwotoneEdit />{" "}
                      {ArticleData.postedBy
                        ? ArticleData?.postedBy.username
                        : ""}{" "}
                      | {format(ArticleData?.updatedAt)}
                    </span>
                  </>
                )}
              </div>

              {isLoading ? (
                <Skeleton width={500} height={32} baseColor="#d5d7db" />
              ) : (
                <>
                  {/* share code start */}
                  <div className="social-share flex flex-col md:flex-row justify-start items-center ">
                    <div className="flex gap-2 my-3">
                      <FacebookShareButton
                        url={window.location.href}
                        quote=""
                        hashtag=""
                        description=""
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <InstapaperShareButton
                        url={window.location.href}
                        quote=""
                        hashtag=""
                        description=""
                      >
                        <InstapaperIcon size={32} round />
                      </InstapaperShareButton>

                      <TwitterShareButton
                        url={window.location.href}
                        quote=""
                        hashtag=""
                        description=""
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>

                      <EmailShareButton
                        url={window.location.href}
                        quote=""
                        hashtag=""
                        description=""
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>

                      <TelegramShareButton
                        url={window.location.href}
                        quote=""
                        hashtag=""
                        description=""
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                    </div>
                  </div>
                  {/* share code end  */}
                </>
              )}
              {articleAds && articleAds.image1 !== "" ? (
                <>
                  <a href={articleAds.link1}>
                    <img src={articleAds.image1} className=" object-cover " />
                  </a>
                </>
              ) : (
                <>
                  <img
                    src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791130/space_yct71p.gif"
                    className=" object-cover "
                  />
                </>
              )}

              {isLoading ? (
                <Skeleton width={700} height={1000} baseColor="#d5d7db" />
              ) : (
                <>
                  <div className="flex flex-col gap-4 md:gap-8 dark:text-white">
                    {/* article image */}
                    <img
                      src={ArticleData?.picture}
                      alt={ArticleData?.title}
                      className="w-[100%] h-96 md:h-[33rem] object-cover rounded-md"
                    />
                    {/* article text */}
                    <p className="font-mukta text-[1.25rem] tracking-wider leading-loose dark:text-white">
                      {ArticleData ? parse(`${ArticleData.content}`) : ""}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="hidden md:block md:w-[30%]">
              {isLoading ? (
                <Skeleton width={400} height={500} baseColor="#d5d7db" />
              ) : (
                <>
                  <LatestUpdatesSide postDetails={postDetails} />
                  {articleAds && articleAds.image3 !== "" ? (
                    <>
                      <a href={articleAds.link3}>
                        <img
                          src={articleAds.image3}
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
                  {articleAds && articleAds.image4 !== "" ? (
                    <>
                      <a href={articleAds.link4}>
                        <img
                          src={articleAds.image4}
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
                  {articleAds && articleAds.image5 !== "" ? (
                    <>
                      <a href={articleAds.link5}>
                        <img
                          src={articleAds.image5}
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
                  {articleAds && articleAds.image6 !== "" ? (
                    <>
                      <a href={articleAds.link6}>
                        <img
                          src={articleAds.image6}
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
                </>
              )}
            </div>
          </div>

          <div className="w-full sm:w-[70%]">
            {isLoading ? (
              <Skeleton width={400} height={500} baseColor="#d5d7db" />
            ) : (
              <>
                <CommentSection postId={ArticleData?._id} />
                {articleAds && articleAds.image2 !== "" ? (
                  <>
                    <a href={articleAds.link2}>
                      <img src={articleAds.image2} className=" object-cover " />
                    </a>
                  </>
                ) : (
                  <>
                    <img
                      src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791130/space_yct71p.gif"
                      className=" object-cover "
                    />
                  </>
                )}
              </>
            )}
          </div>
          <RelatedArticles
            postDetails={postDetails}
            currentArticle={title}
            category={ArticleData.category}
          />
        </div>
      </div>
    </>
  );
}

export default Article;
