import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Calendar, User, X } from "lucide-react";

const DisplayNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://rmd-erp-server.vercel.app/api/faculty/fac-notices");
        setNotices(response.data.notices);
      } catch (err) {
        setError("Failed to fetch notices. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">📢 Faculty Notices</h1>

      {loading && <p className="text-gray-500">Loading notices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-white shadow-lg p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => setSelectedNotice(notice)}
          >
            <div className="flex items-center mb-2">
              <FileText className="text-blue-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold">{notice.title}</h2>
            </div>
            <p className="text-gray-600 flex items-center">
              <Calendar className="mr-2 text-gray-500" size={16} />
              {notice.date}
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <User className="mr-2 text-gray-500" size={16} />
              From: {notice.from}
            </p>
          </div>
        ))}
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedNotice(null)}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedNotice.title}</h2>
            <p className="text-gray-600 flex items-center">
              <Calendar className="mr-2 text-gray-500" size={18} />
              {selectedNotice.date}
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <User className="mr-2 text-gray-500" size={18} />
              From: {selectedNotice.from}
            </p>
            <div className="mt-4 p-3 border-l-4 border-blue-500 bg-blue-100 text-gray-800">
              {selectedNotice.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayNotice;
