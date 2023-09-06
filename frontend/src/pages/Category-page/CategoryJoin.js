import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar-landing/Navbar";
import Footer from "../../components/Footer/Footer";
import Category from "./Category";
import axios from "axios";

const CategoryJoin = () => {
  const [categoryAds, setCategoryAds] = useState(null);

  const sendRequestCategory = async () => {
    const res = await axios
      .get("http://localhost:3001/ads/ads-category")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequestCategory().then((data) => {
      setCategoryAds(data.ads[0]);
    });
  }, []);

  return (
    <>
      <div className="bg-white dark:bg-darkMode flex items-center flex-col mb-7 md:mb-10">
        <Navbar />
        <div className="mt-[6rem] w-[90%] xl:w-[85%] 2xl:w-[80%]">
          {categoryAds && categoryAds.image1 ? (
            <>
              <a href={categoryAds.link1}>
                <img src={categoryAds.image1} className=" object-cover " />
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
        </div>
        <Category categoryAds={categoryAds} />
      </div>
      <Footer />
    </>
  );
};

export default CategoryJoin;
