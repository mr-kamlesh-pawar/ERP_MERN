import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-serif">
      <div className="relative w-full max-w-4xl text-center">
      <h1 className="text-8xl font-bold text-black">404</h1>
        {/* 404 Background */}
        <div
          className="h-96 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
          }}
        >
          
        </div>

        {/* Content Box */}
        <div className="mt-[-50px] p-6 text-center">
          <h2 className="text-2xl font-bold">Looks like you're lost</h2>
          <p className="text-gray-600 mt-2">
            The page you are looking for is not available!
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-blue-800 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
