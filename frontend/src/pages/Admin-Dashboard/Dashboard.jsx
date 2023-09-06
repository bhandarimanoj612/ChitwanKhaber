import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


function SettingDashboard() {
  const navigate = useNavigate();
  const panelData = [
    "Profile",
    "Users",
    "Posts",
    "Comments",
    "Ads",
    "LogOut",
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAreaClick = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="flex border-b-2 border-b-gray-300 w-full font-semibold text-base md:text-lg px-4 md:px-10 py-2 justify-start gap-4 sm:gap-8">
      {/* hamburger menu */}
      <div className="flex items-center justify-center" onClick={toggleMenu}>
        <AiOutlineMenu className="cursor-pointer" />
        {menuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-start">
            <div
              className="w-[80%] sm:w-[35%] flex flex-col bg-dark text-white justify-start gap-4"
              onClick={handleAreaClick}
            >
              {/* close menu */}
              <div className="flex bg-black w-full font-semibold text-base md:text-lg px-4 py-2 justify-start items-center gap-4">
                <button
                  className="text-txtLight w-5 h-5 hover:text-white focus:outline-none"
                  onClick={toggleMenu}
                >
                  <AiOutlineClose className="text-lg" />
                </button>
                Chitrawan Khabar
              </div>
              {/* hamburger nav links */}
              <div
                className="flex flex-col gap-4 px-8 max-h-[70vh] overflow-y-auto"
              >
                {panelData.map((val) => (
                  <div
                    key={val}
                    className="cursor-pointer font-normal text-base hover:text-white hover:font-medium border-b-gray-200 border-b-[1px] border-opacity-40 py-[.25rem] text-gray-200 px-4"

                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/cms-admin/${val}`)
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <span className="md:text-lg">Admin Dashboard</span>
    </div>
  );
}

export default SettingDashboard;
