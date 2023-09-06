import React from "react";
import Navbar from "../components/Navbar-landing/Navbar";

const NotFound = () => {
  return (
    <>
      <div>
        <div className="bg-white dark:bg-darkMode flex items-center flex-col w-full h-screen ">
          <Navbar />
          <div className="flex flex-col items-center justify-center mt-48">
            <span className="text-[4rem] md:text-[8rem] font-bold text-blue-600">
              404
            </span>
            <span>
              <span className="text-[1.5rem] md:text-[3rem] font-bold text-red-600 mr-4">
                Oopps!
              </span>
              <span className="text-[1.5rem]  md:text-[3rem] font-bold text-black capitalize dark:text-white">
                Something went wrong
              </span>
            </span>
            <span className=" md:text-[1rem] font-bold text-black mt-6 dark:text-white">
              The Page you are looking for doesn't exist.{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
