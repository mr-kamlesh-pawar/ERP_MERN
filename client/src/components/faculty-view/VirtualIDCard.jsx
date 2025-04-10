import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCode } from "react-qr-code"; // For generating QR codes

const FacultyIDCard = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrData, setQrData] = useState(null);

  // Fetch faculty details from the API
  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/profile", {
          withCredentials: true, // Include cookies in the request
        });
        setFaculty(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, []);

  // Generate QR code data when faculty data is available
  useEffect(() => {
    if (faculty) {
      setQrData({
        id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        designation: faculty.designation,
        joiningYear: faculty.joiningYear,
      });
    }
  }, [faculty]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d7e8c]">
      {/* ID Card Container */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-96 transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="bg-blue-900 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Faculty ID Card</h1>
        </div>

        {/* Faculty Photo and Details */}
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <img
              src={faculty.avatar || "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"} // Use avatar from API or fallback
              alt="Faculty"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">{faculty.userName}</h2>
            <p className="text-gray-600">ID: {faculty._id}</p>
            <p className="text-gray-600">Designation: {faculty.designation || "Teacher"}</p>
            <p className="text-gray-600">Department: {faculty.department}</p>
            <p className="text-gray-600">Joining Year: {faculty.joiningYear}</p>
            <p className="text-gray-600">Email: {faculty.email}</p>
            <p className="text-gray-600">Contact: +91 {faculty.contactNumber}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-gray-100 p-6 flex justify-center">
          <QRCode
            value={JSON.stringify(qrData)} // Encode faculty details in the QR code
            size={128}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H" // High error correction level
          />
        </div>

        {/* Footer Section */}
        <div className="bg-blue-900 p-4 text-center">
          <p className="text-white text-sm">Scan the QR code for more details</p>
        </div>
      </div>
    </div>
  );
};

export default FacultyIDCard;