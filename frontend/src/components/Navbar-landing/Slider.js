import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import parse from "html-react-parser";




// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import HeroSubs from "./HeroSubs";

const Slider = ({postDetails}) => {
  return (
    <div className="flex justify-center items-center mb-4 mt-1">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper w-[100%] text-sm"
      >
        {postDetails?.slice(0,5).map((val) => (
          <SwiperSlide key={val.id} >
            <HeroSubs
              imgSrc={val.picture}
              altImg={val.title}
              articleTitle={val.title}
              articleWriter={val.postedBy.username}
              snippet={parse(val.content)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
