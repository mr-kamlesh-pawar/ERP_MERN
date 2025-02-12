import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileImage, Loader, AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeeStructureStudent = () => {
  const [loading, setLoading] = useState(true);
  const [feeStructure, setFeeStructure] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/student/fee-structure", {
          withCredentials: true,
        });
        setFeeStructure(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fee structure:", error);
        setError("Failed to fetch fee structure. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeeStructure();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <AlertCircle className="inline-block mb-4 text-red-600" size={48} />
          <p className="text-xl text-gray-700 font-semibold">{error}</p>
          <Button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white transition-transform transform hover:scale-105"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!feeStructure) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <FileImage className="inline-block mb-4 text-gray-600" size={48} />
          <p className="text-xl text-gray-700 font-semibold">No fee structure found.</p>
          <p className="text-gray-500 mt-2">
            It looks like no fee structure has been uploaded for your department and year.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800">Fee Structure</h2>
          <p className="text-gray-600 mt-2">
            Department: {feeStructure.department} | Year: {feeStructure.year}
          </p>
        </div>
        <div className="p-6">
          <img
            src={feeStructure.fileUrl}
            alt="Fee Structure"
            className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-transform transform hover:scale-105"
            onClick={() => window.open(feeStructure.fileUrl)}
          >
            <Download className="mr-2" size={20} />
            Download Fee Structure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeeStructureStudent;