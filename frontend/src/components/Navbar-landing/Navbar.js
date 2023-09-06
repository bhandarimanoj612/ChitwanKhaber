import { useState } from "react";
import Navlinks from "./NavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Search from "./Search";
import User from "./ClickToRegister";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(localStorage.getItem("theme"));

  // dark mode and light mode
  let clickedClass = "clicked";
  let htmlClasses = document.querySelector("html").classList;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    htmlClasses.add(theme);
  } else {
    htmlClasses.add(lightTheme);
  }

  //dark mode and light mode function
  const toggleFunc = (e) => {
    e.preventDefault();
    if (theme === darkTheme) {
      htmlClasses.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      htmlClasses.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
    setToggle(!toggle);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAreaClick = (e) => {
    e.stopPropagation();
  };

  return (
    // nav section
    <nav className="w-[100%] xl:w-[95%] 2xl:w-[80%] flex justify-between items-center border-b-[0.5px] border-txtLight px-4 py-4 flex-shrink md:gap-6 lg:gap-0 top-0 z-50 fixed bg-white dark:bg-darkMode">
      {/* logo div */}
      <div
        className="flex items-center cursor-pointer select-none"
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={`${
            theme == "dark"
              ? "https://res.cloudinary.com/dfmzsqto7/image/upload/v1693305757/370577386_996863954973349_1097135917385513051_n-fotor-bg-remover-20230829162648_k6p3fr.png"
              : "https://res.cloudinary.com/dfmzsqto7/image/upload/v1693305399/370590838_540256184908583_8817982493336954463_n_jzgtzl.png"
          }`}
          alt="logo"
          className="w-[10rem] h-[3rem] select-none"
        />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4">
        {/* SEARCH IN SMALL SCREEN */}
        <div className="md:hidden flex">
          <Search handleClick={handleAreaClick} />
        </div>

        {/* hamburger menu */}
        <div
          className="md:hidden flex items-center justify-center "
          onClick={toggleMenu}
        >
          <AiOutlineMenu size={25} className="dark:text-white" />
          {isOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end ">
              <div
                className="flex flex-col h-full w-64 bg-white dark:bg-darkMode animate__animated animate__fadeInRightBig"
                onClick={handleAreaClick}
              >
                {/* close menu */}
                <div className="flex  py-4 px-4 justify-between border-b-[.5px] ">
                  <button
                    className="text-txtLight w-5 h-5 hover:text-dark focus:outline-none"
                    onClick={toggleMenu}
                  >
                    <AiOutlineClose
                      className="text-lg dark:text-white"
                      size={25}
                    />
                  </button>
                  {localStorage && localStorage.getItem("theme") === "dark" ? (
                    <MdLightMode
                      size={25}
                      color="yellow"
                      onClick={(e) => toggleFunc(e)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <MdDarkMode
                      size={25}
                      onClick={(e) => toggleFunc(e)}
                      className="cursor-pointer"
                    />
                  )}
                  <User handleClick={handleAreaClick} />
                </div>

                {/* hamburger nav links */}
                <Navlinks
                  ulClassName={
                    "flex flex-col items-center gap-4 font-karma  py-4 px-8"
                  }
                  liClassName={
                    " flex text-txtLight hover:text-dark border-b-[.25px] border-txtLight border-opacity-20 pb-2 justify-center items-center w-[100%] dark:text-white"
                  }
                  iconClassName={"text-base -rotate-90"}
                />
              </div>
            </div>
          )}
        </div>
        <Navlinks
          ulClassName={
            "hidden md:flex items-center flex-wrap md:gap-4 lg:gap-6 font-medium "
          }
          liClassName={
            "flex flex-row text-txtLight md:text-sm lg:text-base hover:text-dark hover:border-b-2 border-dark items-center dark:text-white"
          }
          iconClassName={`md:text-xl lg:text-2xl transform transition-transform dark:text-yellow-200 font-bold text-black`}
        />
      </div>

      <div className="hidden md:flex md:gap-4 lg:gap-6">
        {localStorage && localStorage.getItem("theme") === "dark" ? (
          <MdLightMode
            size={25}
            color="yellow"
            onClick={(e) => toggleFunc(e)}
            className="cursor-pointer"
          />
        ) : (
          <MdDarkMode
            size={25}
            onClick={(e) => toggleFunc(e)}
            className="cursor-pointer"
          />
        )}
        {/* search section */}
        <Search handleClick={handleAreaClick} />
        {/* profile section */}
        <User handleClick={handleAreaClick} />
      </div>
    </nav>
  );
}

export default Navbar;
