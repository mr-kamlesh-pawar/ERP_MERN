import React from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

import { logoutUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
 

const FacultyHeader = () => {
  const dispatch = useDispatch();
function handleLogout() {
  dispatch(logoutUser());
}
 

  return (
    <nav className="header flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md "  style={{ background: "linear-gradient(to bottom, #d7e8fc, #ffffff)" }}>
      {/* Left Section: Title and Avatar */}
     <Link to="/">
     
    
      <div className="title head-lg flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://res.cloudinary.com/dftldrxjh/image/upload/v1739607198/Images/p7p4ek9g2mmkk5g92qr8.jpg" />
        </Avatar>
        <p className="clg-name text-lg font-semibold text-gray-800">
        Rasiklal M. Dhariwal Institute of Technology, Chinchwad
        </p>
      </div>

      </Link>

      {/* Right Section: Header Buttons */}
      <div className="header-buttons flex items-center space-x-4 mt-4 sm:mt-0 sm:justify-center">
        {/* Home Button */}
        <Link to="/">
        <button className="home-button p-2 rounded-lg  transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6">
            <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112-.29a16 16 0 0 0 16-15.74V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v96.11a16 16 0 0 0 16 15.74l112 .29a16 16 0 0 0 16-16V300L295.67 148.26a12 12 0 0 0-15.3 0zM573.32 268.35L488 182.6V44a12 12 0 0 0-12-12h-72a12 12 0 0 0-12 12v72.61L318.47 43.2c-27-23.3-68.6-23.3-95.6 0L2.68 268.35a12 12 0 0 0-1.32 16.9l25.5 29.6a12 12 0 0 0 17 1.3L64 281.91V464a48 48 0 0 0 48 48h112a48 48 0 0 0 48-48V368a48 48 0 0 1 48-48h64a48 48 0 0 1 48 48v96a48 48 0 0 0 48 48h112a48 48 0 0 0 48-48V281.91l20.1 17.34a12 12 0 0 0 17-1.3l25.5-29.6a12 12 0 0 0-1.32-16.9z" />
          </svg>
        </button>
        </Link>

        {/* FAQ Button */}
        <Link to="faq">
        <button className="faq-button p-2 rounded-lg  transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
            <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
          </svg>
        </button>
        </Link>

        {/* Loader */}
        <Link to="show-notices">
       
        <div className="loader relative p-2 rounded-lg  transition-all duration-200">
          <svg viewBox="0 0 24 24" fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-6 h-6 text-gray-800">
            <path d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" />
          </svg>
          <div className="point absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        </Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="Btn flex items-center space-x-2 p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-200">
          <div className="sign">
            <svg viewBox="0 0 512 512" className="w-6 h-6">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </div>
          <div className="text">Logout</div>
        </button>
      </div>
    </nav>
  );
};

export default FacultyHeader;