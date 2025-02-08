import React from "react";

const UnAuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* Unauthorized Icon */}
      <div className="bg-red-100 p-6 rounded-full">
        <svg
          className="w-16 h-16 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 2a10 10 0 1 1-7.07 2.93A10 10 0 0 1 12 2zm0 18a8 8 0 1 0-5.66-2.34A8 8 0 0 0 12 20zM9.29 8.71a1 1 0 0 1 1.42-1.42l1.29 1.3 1.29-1.3a1 1 0 1 1 1.42 1.42L13.42 10l1.3 1.29a1 1 0 1 1-1.42 1.42L12 11.42l-1.29 1.29a1 1 0 0 1-1.42-1.42L10.58 10 9.29 8.71z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Unauthorized Message */}
      <h1 className="text-3xl font-bold text-gray-900 mt-4">
        401 - Unauthorized
      </h1>
      <p className="text-gray-600 mt-2">
        You don't have permission to access this page.
      </p>

      {/* Redirect Button */}
      <a
        href="/"
        className="mt-5 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 transition"
      >
        Go to Home
      </a>
    </div>
  );
};

export default UnAuthPage;
