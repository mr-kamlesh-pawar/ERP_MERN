import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IdCard } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WhiteHeader = () => {
  const [data, setData] = useState({ userName: '', department: '', avatar: '' });

  // Fetch faculty profile data
  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/faculty/profile", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching faculty profile:", error);
      }
    };
    fetchFacultyProfile();
  }, []);

  // Function to generate avatar fallback initials
  const getAvatarFallback = (name) => {
    if (!name) return 'FN';
    const names = name.split(' ');
    const firstNameInitial = names[0] ? names[0][0] : '';
    const lastNameInitial = names[1] ? names[1][0] : '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  return (
    <div className="header white-header flex flex-col sm:flex-row items-center justify-between p-4 shadow-md bg-white border border-t-gray-300">
      {/* Left Section: User Info */}
      <div className="user-info-left flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={data.avatar} alt={data.userName} />
          <AvatarFallback className="bg-slate-600 text-white">
            {getAvatarFallback(data.userName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 ">
          <span className="user-name text-lg font-semibold">
            {data.userName || 'Faculty Name'}
          </span>
          <span className="status-box space-x-3">
            <span className="status active text-sm text-green-600">● Active</span>
           
          </span>
          <span className="">Teacher</span>

          
        </div>
      </div>

      {/* Center Section: Department */}
      <div className="department-center mt-4 sm:mt-0">
        <span className="department text-md text-gray-700">
          Diploma - {data.department || 'ABCD Engineering'}
        </span>
      </div>

      {/* Right Section: ID Card */}
      <Link to="virtual-id">
        <div className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer mt-4 sm:mt-0">
          <span className="flex items-center space-x-2">
            <span>ID</span>
            <IdCard className="w-5 h-5" />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default WhiteHeader;