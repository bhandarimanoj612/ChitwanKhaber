import React, { useState, useEffect } from "react";
import Join from "../components/Navbar-landing/JoinPage";
import LandingJoin from "../components/Landing-news-section/LandingJoin";
import FeatureSection from "../components/Features/FeatureSection";
import MoreNews from "../components/Features/MoreNews";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../feature/postReducer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  // const [stateChanged, setStateChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAd, setLoadAd] = useState(true);
  const [homeAds, setHomeAds] = useState(null);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-home")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    dispatch(getAllPost())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));

    sendRequest().then((data) => {
      setHomeAds(data.ads[0]);
    });

    const adShownInSession = sessionStorage.getItem("adShown");
    if (adShownInSession) {
      setLoadAd(false);
    }
  }, []);

  const handleCloseAd = () => {
    // Set the flag in sessionStorage to remember that the ad was shown in this session
    sessionStorage.setItem("adShown", "true");
    setLoadAd(false);
  };

  const postDetails = useSelector((state) => state.posts.allPost.result);


  return (
    <>
      {isLoading ? (
        <>
          {Array(2)
            .fill()
            .map((item, index) => {
              return (
                <div className="w-full flex items-center justify-center my-5">
                  <div className="w-[95%] grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
                    {Array(10)
                      .fill()
                      .map((item, index) => (
                        <Skeleton
                          key={index}
                          height={200}
                          baseColor="#d5d7db"
                        />
                      ))}
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <>
          {loadAd ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-[10rem]">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none h-[28rem] lg:h-[30rem] pb-5 z-50">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <span className="text-red-500 font-timesNewRoman">
                        Skip this ad{" "}
                      </span>
                      <i
                        className="p-1 ml-auto float-right"
                        onClick={handleCloseAd}
                      >
                        <AiOutlineClose
                          size={30}
                          className="text-red-900 block cursor-pointer"
                        />
                      </i>
                    </div>
                    <div className="flex justify-center gap-x-4   w-[20rem]">
                      <img
                        src="https://res.cloudinary.com/dfmzsqto7/image/upload/v1693791121/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%A8-%E0%A4%96%E0%A4%AC%E0%A4%B0_qxbihj.jpg"
                        className=" object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* navbar and landing slider  */}
              <Join postDetails={postDetails} homeAds={homeAds} />
              {homeAds && homeAds.image4 !== "" ? (
                <>
                  <a href={homeAds.link4}>
                    <img src={homeAds.image1} className=" object-cover " />
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
              <LandingJoin postDetails={postDetails} homeAds={homeAds} />
              <div className="w-full flex items-center justify-center dark:bg-darkMode">
                <div className="w-[90%] xl:w-[85%] 2xl:w-[70%] dark:bg-darkMode">
                  <FeatureSection postDetails={postDetails} />
                  <MoreNews postDetails={postDetails} />
                </div>
              </div>
              <Footer />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
