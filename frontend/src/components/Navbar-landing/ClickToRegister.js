import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import BecomeEditor from "./BecomeEditor";

function User({ handleClick }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div onClick={toggleProfile}>
      <FaUserAlt className="md:text-xl lg:text-xl text-txtLight hover:text-dark cursor-pointer dark:text-white" />
      {isProfileOpen && (
 <BecomeEditor handleOutClick={handleClick} handleClick={toggleProfile}/>
      )}
    </div>
  );
}

export default User;
