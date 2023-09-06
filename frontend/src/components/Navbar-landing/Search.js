import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

function Search({ handleClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div onClick={toggleSearch}>
      <AiOutlineSearch className="md:text-xl lg:text-2xl text-txtLight hover:text-dark cursor-pointer dark:text-white" size={25}/>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-start">
          <div
            className="flex flex-col pb-4 w-[80%] md:w-[50%] lg:w-[33%] bg-white rounded-sm mt-4"
            onClick={handleClick}
          >
            {/* close button */}
            <div className="flex  justify-start py-4 px-4">
              <button
                className="text-txtLight w-5 h-5 hover:text-dark focus:outline-none"
                onClick={toggleSearch}
              >
                <AiOutlineClose className="text-lg" />{" "}
                
              </button>
            </div>
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button className="px-4 py-2 bg-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
