import React from "react";
import LeftArrow from "./LeftArrow";
import LatestUpdatesSide from "./LatestUpdatesSide";

const LandingJoin = ({ postDetails, homeAds }) => {
  const politicsNews = postDetails?.filter(
    (newsItem) => newsItem.category === "नेपाली राजनीति"
  );

  const chitwanNews = postDetails?.filter(
    (newsItem) => newsItem.category === "चितवन"
  );

  const sportsNews = postDetails?.filter(
    (newsItem) => newsItem.category === "खेलकुद"
  );

  const nepaliSamaj = postDetails?.filter(
    (newsItem) => newsItem.category === "नेपाली समाज"
  );

  const austrailaSamaj = postDetails?.filter(
    (newsItem) => newsItem.category === "अष्ट्रेलिया समाज"
  );

  const bidyarthyAnuwav = postDetails?.filter(
    (newsItem) => newsItem.category === "विद्यार्थी अनुभव"
  );

  //lokpriya news
  const lokpriya = postDetails?.slice(7, 13);

  return (
    <>
      <div className="w-[100%] flex items-center justify-center">
        <div className="w-[95%] bg-gray-500 h-[0.5px]"></div>
      </div>
      <div className="w-[100%] flex items-center justify-center dark:bg-darkMode">
        <div className="w-[90%] xl:w-[90%] 2xl:w-[80%] flex md:px-10 my-4">
          <div className="w-[100%] md:w-[70%] p-5">
            {politicsNews.length > 0 ? (
              <>
                <LeftArrow data={politicsNews} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}
            {chitwanNews.length > 0 ? (
              <>
                <LeftArrow data={chitwanNews} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}
            {sportsNews.length > 0 ? (
              <>
                <LeftArrow data={sportsNews} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}
            {nepaliSamaj.length > 0 ? (
              <>
                <LeftArrow data={nepaliSamaj} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}

            {austrailaSamaj.length > 0 ? (
              <>
                <LeftArrow data={austrailaSamaj} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}

            {bidyarthyAnuwav.length > 0 ? (
              <>
                <LeftArrow data={bidyarthyAnuwav} />
                <div className="w-[100%] flex items-center justify-center my-5">
                  <div className="w-[100%] bg-gray-500 h-[0.5px]"></div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="hidden md:flex flex-col gap-y-5 md:w-[30%]">
            <LatestUpdatesSide postDetails={postDetails} />
            <div>
              {homeAds && homeAds.image5 !== "" ? (
                <>
                  <a href={homeAds.link5}>
                    <img src={homeAds.image5} className=" object-cover " />
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
            <LatestUpdatesSide postDetails={lokpriya} title="लोकप्रिय" />
            <div>
              {homeAds && homeAds.image6 !== "" ? (
                <>
                  <a href={homeAds.link6}>
                    <img src={homeAds.image6} className=" object-cover " />
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
    </>
  );
};

export default LandingJoin;
