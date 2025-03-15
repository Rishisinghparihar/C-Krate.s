import React from "react";

const Profile = () => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
      <img
        className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
        src="https://via.placeholder.com/150"
        alt="Profile"
      />
      <h2 className="text-xl font-bold text-gray-800 mt-4">Rishi Parihar</h2>
      <p className="text-gray-600">Frontend Developer | React & Next.js</p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
          Follow
        </button>
        <button className="ml-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition">
          Message
        </button>
      </div>
    </div>
  );
};

export default Profile;
