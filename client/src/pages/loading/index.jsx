import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Spinner Animation */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-blue-600 border-opacity-50"></div>
        <div className="absolute inset-0 animate-ping rounded-full border-4 border-blue-300 opacity-75"></div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-5 text-xl font-semibold text-gray-800">
      Rasiklal M. Dhariwal Institute of Technology, chinchwad
      </h2>
      <p className="text-gray-600 text-sm mt-2">Loading, please wait...</p>
    </div>
  );
};

export default LoadingScreen;
