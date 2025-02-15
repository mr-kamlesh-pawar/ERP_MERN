import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Mail, Phone, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Faculties = () => {
  const [loading, setLoading] = useState(true);
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/student/faculties", {
          withCredentials: true,
        });
        setFaculties(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        setError("Failed to fetch faculties. Please try again later.");
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[300px] h-[200px] rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <AlertCircle className="inline-block mb-4 text-red-600" size={48} />
          <p className="text-xl text-gray-700 font-semibold">{error}</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (faculties.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Users className="inline-block mb-4 text-gray-600" size={48} />
          <p className="text-xl text-gray-700 font-semibold">No faculties found.</p>
          <p className="text-gray-500 mt-2">
            It looks like no faculties are available for your department.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
  <Users className="mr-2 text-blue-600" size={32} />
  Faculties of {faculties[0].department} Department
</h1>


        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
  <thead className="bg-gray-100     ">
    <tr>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Sr. No</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
      {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone No</th> */}
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
  {faculties.map((faculty, index) => (
    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
      {/* Sr. No */}
      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>

      {/* Name Column */}
      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
        {faculty.userName}
      </td>

      {/* Email Column */}
      <td className="px-6 py-4 text-sm text-gray-700 flex items-center">
        <Mail className="mr-2 text-blue-600" size={16} />
        {faculty.email}
      </td>

      {/* Phone Number Column */}
      {/* <td className="px-6 py-4 text-sm text-gray-700 flex items-center">
        <Phone className="mr-2 text-blue-600" size={16} />
        {faculty.contactNumber ? `+91 ${faculty.contactNumber}` : "Not Available"}
      </td> */}
    </tr>
  ))}
</tbody>


</table>
        </div>
      </div>
    </div>
  );
};

export default Faculties;