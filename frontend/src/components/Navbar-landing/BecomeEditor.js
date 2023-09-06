import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function BecomeEditor({ handleClick, handleOutClick }) {
  const [email, setEmail] = useState("");

  const SubmitRequest = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:${"khalifaanil@gmail.com"}?subject=${encodeURIComponent(
      "To became an editor"
    )}&body=Please attached your CV, We Will reach you Soon , Thank you! ${email} .`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center md:py-5">
      <div
        className="relative flex w-[80%] md:w-[75%] bg-dark rounded-sm"
        onClick={handleOutClick}
      >
        <div className="flex absolute inset-0 h-8 w-8  justify-center items-center">
          <button
            className="text-gray-400 w-5 h-5 hover:text-gray-300 focus:outline-none"
            onClick={handleClick}
          >
            <AiOutlineClose className="text-lg" /> {/*place the cross icon*/}
          </button>
        </div>
        {/* become an editor section */}
        <div className="flex flex-1 px-4 py-4 flex-col justify-center items-center bg-dark text-white gap-4">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-xl md:text-3xl font-semibold text-center">
              Become an Editor
            </h1>
            <p className="text-sm font-thin md:font-light w-[80%] text-center">
              Join us and Become an editor at News portal
            </p>
          </div>
          {/* email and file section */}
          <div className="flex flex-col w-[100%] sm:w-[80%] md:w-[100%] justify-center items-center gap-3">
            <input
              type="email"
              placeholder="your email"
              className="text-dark px-4 py-2 w-[100%] md:w-[40%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* attach file */}
            {/* <AttachFile /> */}
          </div>
          {/* submit button */}
          <button
            className="bg-dark border-2 border-gray-400 px-2 md:w-[20%] rounded-md focus:border-gray-300"
            onClick={SubmitRequest}
          >
            send request
          </button>
          {/* note */}
          <p className="text-xs italic text-gray-400">
            *Note: We will send you an email if you are chosen ,with your roles
            and additional details.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BecomeEditor;
