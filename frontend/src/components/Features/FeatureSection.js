import React from "react";
import { Fade } from "react-awesome-reveal";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { format } from "timeago.js";
import parse from "html-react-parser";

const FeatureSection = ({ postDetails }) => {
  const targetCategories = [
    "न्यु साउथ वेल्स",
    "भिक्टोरिया",
    "क्युइन्सल्याण्ड",
    "वेस्टर्न अष्ट्रेलिया",
    "साउथर्न अष्ट्रेलिया",
    "नर्थन टेरिटोरी",
    "तास्मानिया",
    "अष्ट्रेलियन क्यापिटल टेरिटोरी",
  ];

  const filteredNews = postDetails?.filter((newsItem) =>
    targetCategories.includes(newsItem.category)
  );

  return (
    <>
      <div className="w-[100%] flex items-center justify-center my-7">
        <div className="w-[96%] bg-gray-500 dark:bg-white h-[0.5px]"></div>
      </div>
      <div className="flex flex-col pl-5">
        {/* top  */}
        <div className="flex items-center justify-between">
          <p className="font-bold dark:text-white">अष्ट्रेलिया</p>
          <span className="mr-4">
            <IoIosArrowDroprightCircle
              size={30}
              className="cursor-pointer dark:text-white"
            />
          </span>
        </div>
        <hr className=" border-t-4 border-black w-12 mt-0 mb-2 dark:border-white" />
      </div>
      <div className="flex p-5 gap-x-10">
        {/* left side  */}
        <div className="w-[100%] md:w-[40%] ">
          <Fade>
            <div className="flex flex-col gap-y-3">
              {/* image  */}
              <div>
                <img
                  src={filteredNews ? filteredNews[0].picture : ""}
                  alt="feature-image"
                  className="rounded-md"
                />
              </div>
              {/* data  */}
              <div>
                <p className="text-md font-mukta leading-relaxed h-[9.5rem] overflow-hidden tracking-wide dark:text-white">
                  {filteredNews ? parse(`${filteredNews[0].content}`) : ""}
                </p>
              </div>
            </div>
          </Fade>
        </div>
        {/* right side  */}
        <div className="hidden w-[60%] md:grid grid-cols-2 gap-4">
          {filteredNews?.length === 0
            ? ""
            : filteredNews.slice(1, 8).map((val, index) => (
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
                        <span className="font-bold text-[14px] font-mukta leading-relaxed tracking-wide dark:text-white">
                          {val.title}
                        </span>
                        <span className="text-[10px] font-domine text-gray-400 dark:text-yellow-200">
                          {format(val.time)}
                        </span>
                      </div>
                    </div>
                  </Fade>
                  {/* one items end  */}
                </>
              ))}
        </div>
      </div>
      <div className="w-[100%] flex items-center justify-center my-5">
        <div className="w-[96%] bg-gray-500 h-[0.5px]"></div>
      </div>
    </>
  );
};

export default FeatureSection;
