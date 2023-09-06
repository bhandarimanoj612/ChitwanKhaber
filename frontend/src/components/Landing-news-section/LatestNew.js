import React from "react";
import { Fade } from "react-awesome-reveal";
import parse from "html-react-parser";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const LatestNews = ({ data }) => {

  return (
    <>
      <Fade>
        <Link to={data ? `/article/${data[0].title.replace(/\s+/g, "-")}` : ""}>
          <div className="flex bg-gray-200 dark:bg-[#242424]  rounded-md">
            <div className="w-[50%] md:h-[13rem]">
              <img
                src={data ? data[0].picture : ""}
                alt=""
                className=" w-full h-full object-cover rounded-l-md"
              />
            </div>
            <div className=" bg-gray-200 dark:bg-[#242424] flex flex-col gap-y-3 w-[50%] p-5 h-[13rem] rounded-md">
              <h3 className="font-bold font-karma leading-relaxed tracking-wide dark:text-white">
                {data ? data[0].title : ""}
              </h3>
              <p className="text-md font-mukta leading-relaxed tracking-wide dark:text-white h-[7rem] overflow-y-hidden">
                {data ? parse(data[0].content) : ""}
              </p>
              <p className="text-xs text-gray-400 font-domine dark:text-yellow-200">
                {data ? format(data[0].updatedAt) : ""} |{" "}
                {data ? data[0].postedBy.username : ""}
              </p>
            </div>
          </div>
        </Link>
      </Fade>
    </>
  );
};

export default LatestNews;
