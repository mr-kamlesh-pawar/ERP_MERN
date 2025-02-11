import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCode } from "react-qr-code"; // Corrected import

const VirtualIDCard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrData, setQrData] = useState(null);

  // Fetch student details from the API
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/profile", {
            withCredentials: true, // Include cookies in the request
          });
        setStudent(response.data);
        


        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

useEffect(()=>{
    if(student){
        setQrData({
            id:student._id,
            name: student.name,
            email:student.email,
            department:student.department,
            year:student.year              
        })

    }

}, [student])
 

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* ID Card Container */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-96 transform transition-all hover:scale-105">
        {/* Header Section */}
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">Student ID Card</h1>
        </div>

        {/* Student Photo and Details */}
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <img
              src={student.avatar || "https://via.placeholder.com/150"} // Use avatar from API or fallback
              alt="Student"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-600">ID: {student._id}</p>
            <p className="text-gray-600">Department: {student.department}</p>
            <p className="text-gray-600">Batch: {student.batch}</p>
            <p className="text-gray-600">Year: {student.year}</p>
            <p className="text-gray-600">Father's Name: {student.fatherName}</p>
            <p className="text-gray-600">Contact: {student.contactNumber}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="bg-gray-100 p-6 flex justify-center">
          <QRCode
            value={JSON.stringify(qrData)} // Encode student details in the QR code
            size={128}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H" // High error correction level
          />
        </div>

        {/* Footer Section */}
        <div className="bg-blue-600 p-4 text-center">
          <p className="text-white text-sm">Scan the QR code for more details</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualIDCard;