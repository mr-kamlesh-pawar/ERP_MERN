import React, { useState } from "react";
import axios from "axios";
import { Search, User, Mail, AlertTriangle } from "lucide-react";

const AllStudents = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/faculty/get-students",
        { class1: selectedClass },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      setStudents(response.data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-6 gap-6 bg-gray-50">
      {/* Left Panel - Class Selection */}
      <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Select Class
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium">Choose a class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            <Search size={18} /> {loading ? "Fetching..." : "Fetch Students"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-100 p-3 rounded-lg">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Right Panel - Students List */}
      <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Students Information
        </h2>

        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Roll No</th>
                  <th className="py-3 px-4 border-b text-left">Name</th>
                  <th className="py-3 px-4 border-b text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-4 border-b text-gray-700">
                      {student.rollNo || index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={16} /> {student.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 border-b text-gray-700">
                      <div className="flex items-center gap-2">
                        <Mail size={16} /> {student.email}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No students found. Select a class and fetch students.</p>
        )}
      </div>
    </div>
  );
};

export default AllStudents;