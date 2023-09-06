import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

function Navlinks({ ulClassName, liClassName, iconClassName }) {
  const [more, setMore] = useState(false);
  const [three, setThree] = useState(false);
  const navigate = useNavigate();

  let style =
    "w-full  py-2 flex gap-2 justify-center items-center cursor-pointer font-navIns font-bold text-sm hover:text-landing-0 dark:bg-[#242424] dark:text-white hover:text-red-500 dark:hover:text-yellow-500";

  return (
    <>
      <ul className={ulClassName}>
        <li
          className={`${liClassName} font-karma font-bold lg:text-[1.15rem] `}
        >
          <button onClick={() => navigate("/")}>गृहपृष्ठ</button>
        </li>
        <li
          className={`${liClassName} font-karma font-bold lg:text-[1.15rem] `}
        >
          <button
            onClick={() =>
              navigate(`/category/${encodeURIComponent("नेपाली-राजनीति")}`)
            }
          >
            नेपाली राजनीति
          </button>
        </li>
        <li
          className={`${liClassName} font-karma font-bold lg:text-[1.15rem] `}
        >
          <button
            onClick={() =>
              navigate(`/category/${encodeURIComponent("नेपाली-समाज")}`)
            }
          >
            नेपाली समाज
          </button>
        </li>
        <li
          className={`${liClassName} font-karma font-bold lg:text-[1.15rem] `}
        >
          <button
            onClick={() =>
              navigate(`/category/${encodeURIComponent("अष्ट्रेलिया-समाज")}`)
            }
          >
            अष्ट्रेलिया समाज
          </button>
        </li>
        <li
          className={`${liClassName} font-karma font-bold lg:text-[1.15rem] `}
        >
          <button
            onClick={() =>
              navigate(`/category/${encodeURIComponent("विद्यार्थी-अनुभव")}`)
            }
          >
            विद्यार्थी अनुभव
          </button>
        </li>
        <div className="flex flex-col relative">
          <li
            className={`${liClassName} pb-0 cursor-pointer font-karma font-bold lg:text-[1.15rem]`}
            onClick={() => setMore(true)}
          >
            प्रदेश{" "}
            {more ? (
              <BiChevronUp className="iconClassName" />
            ) : (
              <BiChevronDown className={iconClassName} />
            )}
          </li>
          {more && (
            <>
              <div
                className="absolute top-7 md:left-2 w-40 bg-whiteE-0 shadow-2xl rounded-lg bg-gray-200"
                onMouseEnter={() => setMore(true)}
                onMouseLeave={() => setMore(false)}
              >
                <ul className="flex items-center justify-center flex-col">
                  <ol className={`${style} font-karma lg:text-base `}>
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent("न्यु-साउथ-वेल्स")}`
                        )
                      }
                    >
                      न्यु साउथ वेल्स
                    </button>
                  </ol>
                  <ol className={`${style} font-karma font-bold lg:text-base `}>
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent("भिक्टोरिया")}`
                        )
                      }
                    >
                      भिक्टोरिया
                    </button>
                  </ol>
                  <ol className={`${style} font-karma font-bold lg:text-base `}>
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent("क्युइन्सल्याण्ड")}`
                        )
                      }
                    >
                      क्युइन्सल्याण्ड
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base  `}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent(
                            "वेस्टर्न-अष्ट्रेलिया"
                          )}`
                        )
                      }
                    >
                      वेस्टर्न अष्ट्रेलिया
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base  `}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent(
                            "साउथर्न-अष्ट्रेलिया"
                          )}`
                        )
                      }
                    >
                      साउथर्न अष्ट्रेलिया
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base  `}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent("नर्थन-टेरिटोरी")}`
                        )
                      }
                    >
                      नर्थन टेरिटोरी
                    </button>
                  </ol>
                  <ol className={`${style} font-karma font-bold lg:text-base `}>
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent("तास्मानिया")}`
                        )
                      }
                    >
                      तास्मानिया
                    </button>
                  </ol>
                  <ol className={`${style} font-karma font-bold lg:text-base `}>
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent(
                            "अष्ट्रेलियन-क्यापिटल-टेरिटोरी"
                          )}`
                        )
                      }
                      className="flex flex-col items-center justify-center"
                    >
                      <span>अष्ट्रेलियन</span>
                      क्यापिटल टेरिटोरी
                    </button>
                  </ol>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col relative">
          <li
            className={`${liClassName} pb-0 cursor-pointer font-karma font-bold lg:text-[1.15rem]`}
            onClick={() => setThree(true)}
          >
            थप
            {three ? (
              <BiChevronUp className="iconClassName" />
            ) : (
              <BiChevronDown className={iconClassName} />
            )}
          </li>
          {three && (
            <>
              <div
                className="absolute top-7 md:left-2 w-40 bg-whiteE-0 shadow-2xl rounded-lg bg-gray-200"
                onMouseEnter={() => setThree(true)}
                onMouseLeave={() => setThree(false)}
              >
                <ul className="flex items-center justify-center flex-col">
                  <ol
                    className={`${style} font-karma font-bold lg:text-base   `}
                  >
                    <button
                      onClick={() =>
                        navigate(`/category/${encodeURIComponent("चितवन")}`)
                      }
                    >
                      चितवन
                    </button>
                  </ol>
                  <ol className={`${style} font-karma font-bold lg:text-base`}>
                    <button
                      onClick={() =>
                        navigate(`/category/${encodeURIComponent("इभेन्ट")}`)
                      }
                    >
                      इभेन्ट
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base   `}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/category/${encodeURIComponent(
                            "विद्यार्थीलाई-सुझाव"
                          )}`
                        )
                      }
                    >
                      विद्यार्थीलाई सुझाव
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base  `}
                  >
                    <button
                      onClick={() =>
                        navigate(`/category/${encodeURIComponent("खेलकुद")}`)
                      }
                    >
                      खेलकुद
                    </button>
                  </ol>
                  <ol
                    className={`${style} font-karma font-bold lg:text-base  `}
                  >
                    <button
                      onClick={() =>
                        navigate(`/category/${encodeURIComponent("विविध")}`)
                      }
                    >
                      विविध
                    </button>
                  </ol>
                </ul>
              </div>
            </>
          )}
        </div>
      </ul>
    </>
  );
}
export default Navlinks;
