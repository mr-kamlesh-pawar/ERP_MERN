import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IdCard } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WhiteHeader = () => {

    const [data, setData]= useState("");
    // Fetch student profile data
    useEffect(() => {
      const fetchStudentProfile = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/student/profile", {
            withCredentials: true,
          });
          setData(response.data);
        } catch (error) {
          console.error("Error fetching student profile:", error);
        }
      };
      fetchStudentProfile();
    }, []);

  return (
    <div className="header white-header flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-300 shadow-md">
      {/* Left Section: User Info */}
      <div className="user-info-left flex items-center space-x-4">

      <Avatar>
  <AvatarImage src={data.avatar ? data.avatar : "https://github.com/shadcn.png"} />
</Avatar>


        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <span className="user-name text-lg font-semibold">{data.name || `Student Name`}</span>
          <span className="status-box">
            <span className="status active text-sm text-green-600">● Active</span>
          </span>
        </div>
      </div>

      {/* Center Section: Branch */}
      <div className="branch-center mt-4 sm:mt-0 ">
        <span className="branch text-lg text-gray-700">Diploma- {data.department || `Computer Engineering`}</span>
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