import React from "react";
import { Fade } from "react-awesome-reveal";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

const MoreNews = ({ postDetails }) => {
  const navigate = useNavigate();
  
  const eventNews = postDetails?.filter(
    (newsItem) => newsItem.category === "इभेन्ट"
  );

  const bidyarthyAnuvab = postDetails?.filter(
    (newsItem) => newsItem.category === "विद्यार्थीलाई सुझाव"
  );

  const bibid = postDetails?.filter(
    (newsItem) => newsItem.category === "विविध"
  );

  return (
    <>
      <div className="flex md:flex-row flex-col gap-x-4 p-5">
        <div className="w-[100%] md:w-[33.33%] md:border-r-[1px] border-black p-3 flex flex-col gap-y-4 dark:border-white">
          <div className="flex flex-col ">
            {/* top  */}
            <div className="flex items-center justify-between dark:text-white">
              <Fade>
                <p className="font-bold font-karma text-lg">इभेन्ट</p>
              </Fade>
              <span className="mr-4">
                <IoIosArrowDroprightCircle
                  size={30}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <hr className=" border-t-4 border-black w-12 mt-0 mb-2 dark:border-white" />
          </div>
          {eventNews.length === 0 ? (
            <h1>No Posts</h1>
          ) : (
            eventNews.slice(0, 3).map((val, index) => (
              <>
                {/* one item start  */}
                <Fade>
                  <div className="flex cursor-pointer" key={index}>
                    <div className="w-[45%]">
                      <img
                        className="md:h-[5rem] w-full object-cover rounded-md"
                        src={val.picture}
                        alt="news1 "
                      />
                    </div>
                    {/*This Is to separate three spans in sport section*/}
                    <div className="flex flex-col h-[5rem] p-2 gap-y-1">
                      <span className="font-bold text-[14px] font-karma leading-relaxed tracking-wide dark:text-white">
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
        <div className="w-[100%] md:w-[33.33%] md:border-r-[1px] border-black p-3 flex flex-col gap-y-3 dark:border-white">
          <div className="flex flex-col">
            {/* top  */}
            <div className="flex items-center justify-between dark:text-white">
              <Fade>
                <p className="font-bold text-lg font-karma">विद्यार्थीलाई सुझाव</p>
              </Fade>
              <span className="mr-4">
                <IoIosArrowDroprightCircle
                  size={30}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <hr className=" border-t-4 border-black w-12 mt-0 mb-2 dark:border-white" />
          </div>
          {bidyarthyAnuvab.length === 0 ? (
            <h1>No posts</h1>
          ) : (
            bidyarthyAnuvab.slice(0, 3).map((val, index) => (
              <>
                {/* one item start  */}
                <Fade>
                  <div className="flex cursor-pointer" key={index}>
                    <div className="w-[45%]">
                      <img
                        className="md:h-[5rem] w-full object-cover rounded-md"
                        src={val.picture}
                        alt="news1 "
                      />
                    </div>
                    {/*This Is to separate three spans in sport section*/}
                    <div className="flex flex-col h-[5rem] p-2 gap-y-1">
                      <span className="font-bold text-[14px] font-karma leading-relaxed tracking-wide dark:text-white">
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
        <div className="w-[100%] md:w-[33.33%] md:border-r-[1px] border-black p-3 flex flex-col gap-y-4 dark:border-white">
          <div className="flex flex-col">
            {/* top  */}
            <div className="flex items-center justify-between dark:text-white">
              <Fade>
                <p className="font-bold text-lg font-karma">विविध</p>
              </Fade>
              <span className="mr-4">
                <IoIosArrowDroprightCircle
                  size={30}
                  className="cursor-pointer"
                />
              </span>
            </div>
            <hr className=" border-t-4 border-black w-12 mt-0 mb-2 dark:border-white " />
          </div>
          {bibid.length === 0 ? (
            <h1>No posts</h1>
          ) : (
            bibid.slice(0, 3).map((val, index) => (
              <>
                {/* one item start  */}
                <Fade>
                  <div
                    className="flex cursor-pointer"
                    key={index}
                    onClick={() => {
                      navigate(`/article/${val?.title.replace(/\s+/g, "-")}`);
                    }}
                  >
                    <div className="w-[45%]">
                      <img
                        className="md:h-[5rem] w-full object-cover rounded-md"
                        src={val.picture}
                        alt="news1 "
                      />
                    </div>
                    {/*This Is to separate three spans in sport section*/}
                    <div className="flex flex-col h-[5rem] p-2 gap-y-1">
                      <span className="font-bold text-[14px] font-karma leading-relaxed tracking-wide dark:text-white">
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
      </div>
    </>
  );
};

export default MoreNews;
