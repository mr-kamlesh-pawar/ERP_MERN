import React, { useState, useEffect } from "react";
import axios from "axios";
import { Upload, Calendar, Clock } from "lucide-react";

const TimeTable = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [year, setYear] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch uploaded files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/get-timetable", {
          withCredentials: true,
        }
      );
        setUploadedFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files. Please try again.");
      }
    };
    fetchFiles();
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedOption || !year || !classNumber) {
      setError("Please fill all fields and select a file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("option", selectedOption);
      formData.append("year", year);
      formData.append("classNumber", classNumber);

      const response = await axios.post(
        "https://rmd-erp-server.vercel.app/api/faculty/upload-timetable",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setUploadedFiles((prev) => [...prev, response.data.file]);
      alert(`${selectedOption} uploaded successfully!`);
      setFile(null);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">TimeTable Management</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Files</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Option</option>
                <option value="academic-calendar">Academic Calendar</option>
                <option value="timetable">TimeTable</option>
              </select>
              
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
              </select>

              <select
                value={classNumber}
                onChange={(e) => setClassNumber(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </div>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="text-gray-500 mb-2" size={24} />
                  <p className="text-gray-500">
                    {file ? file.name : "Drag & drop or click to upload"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium p-3 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
            >
              <Upload size={18} /> {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </div>

        {/* Uploaded Files Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                {file.option === "academic-calendar" ? (
                  <Calendar className="text-blue-600" size={24} />
                ) : (
                  <Clock className="text-purple-600" size={24} />
                )}
                <h2 className="text-xl font-semibold text-gray-700 capitalize">
                  {file.option}
                </h2>
              </div>
              <img
                src={file.fileUrl}
                alt={file.option}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700">
                Year: {file.year}, Class: {file.classNumber}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTable;