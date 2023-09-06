import React from "react";
import Article from "./Article";
import Navbar from "../../components/Navbar-landing/Navbar";
import Footer from "../../components/Footer/Footer";

const Content = () => {
  return (
    <>
      <div className="bg-white flex items-center flex-col dark:bg-darkMode">
        <Navbar />
        <Article />
      </div>
      <Footer />
    </>
  );
};

export default Content;
