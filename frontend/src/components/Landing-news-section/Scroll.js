import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Fade } from "react-awesome-reveal";
import parse from "html-react-parser";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Scroll = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 2500 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1950, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 912, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 480, min: 320 },
      items: 1,
    },
  };


  return (
    (<div>Scroll</div>),
    (
      <div className="w-[99%]">
        <Carousel responsive={responsive} className="w-full z-10">
          {data?.slice(1, 5).map((val, index) => (
            <>
              {/* one data start */}
              <Fade>
                <Link to={`/article/${val?.title.replace(/\s+/g, "-")}`}>
                  <div
                    className="md:pr-5 md:pb-5 md:pt-5 flex flex-col gap-y-3"
                    key={index}
                  >
                    <img
                      src={val?.picture}
                      alt=""
                      className="w-full md:w-[14rem] object-cover h-[10rem] md:h-[8rem] rounded-md"
                    />
                    <span className=" font-mukta leading-relaxed tracking-wide dark:text-white h-[9.25rem] overflow-y-hidden">
                      {parse(val.content)}
                    </span>
                    <p className="text-xs text-gray-400 font-domine dark:text-yellow-200">
                      {format(val.updatedAt)} | {val.postedBy.username}
                    </p>
                  </div>
                </Link>
              </Fade>
              {/* one data end  */}
            </>
          ))}
        </Carousel>
      </div>
    )
  );
};

export default Scroll;
