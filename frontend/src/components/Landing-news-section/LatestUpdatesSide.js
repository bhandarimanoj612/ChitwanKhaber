import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

const LatestUpdatesSide = ({ postDetails, title }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className=" dark:bg-[#242424] bg-white py-8 px-4 flex flex-col gap-y-5 mt-4 drop-shadow-lg">
        {/*top*/}
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-10 ">
            <span className="font-bold font-karma dark:text-white">
              {title ? "लोकप्रिय" : "पछिल्लो अपडेट"}
            </span>
          </div>
          <hr className="w-10 border-black border-t-4 dark:border-white "></hr>
        </div>

        {/* mapping  */}
        <div className="flex flex-col gap-y-4">
          {postDetails?.slice(0, 6).map((val, index) => (
            <>
              {/* one item start  */}
              <Fade>
                <div
                  className="flex items-center justify-center h-[6rem] cursor-pointer "
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
                  <div className="flex flex-col h-[5rem] w-[55%]  justify-center px-2 gap-y-1">
                    <span className="text-sm text-gray-400 font-bold font-karma ">
                      In {val.category}
                    </span>
                    <span className="font-bold text-[12px] leading-relaxed tracking-wide dark:text-white line-clamp-2 font-karma">
                      {val.title}
                    </span>
                    <span className="text-[10px] font-domine text-gray-400 dark:text-yellow-200">
                      {format(val.updatedAt)}
                    </span>
                  </div>
                </div>
                {/* one items end  */}
              </Fade>
            </>
          ))}

          {/*This is for the view all Button*/}
        </div>
        {/* mapping end  */}
        <hr className="w-72 border-black border-t-1 dark:border-white"></hr>
        <div className="flex items-center justify-center">
          <span class="bg-white hover:bg-gray-300 px-4 cursor-pointer py-2 shadow-xl rounded-full font-playfair font-bold text-sm flex items-center justify-center gap-x-2 text-gray-500">
            View all
            <MdOutlineArrowForwardIos />
          </span>
        </div>
      </div>
    </>
  );
};

export default LatestUpdatesSide;
