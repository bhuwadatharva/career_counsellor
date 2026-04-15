import { nav } from "framer-motion/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Task() {
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!submissionUrl.trim()) return alert("Please provide your project link");
    setShowPopup(true);

    // Store to localStorage (optional)
    localStorage.setItem("taskSubmission", submissionUrl);
    navigate("/dashboard");

    setTimeout(() => setShowPopup(false), 3000); // auto close popup
  };

  return (
    <div className="p-6 w-full h-full bg-[#F7F9FC] flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-7 border border-gray-200 animate-fadeIn">
        {/* Task Header */}
        <h1 className="text-3xl font-bold text-[#2563EB]">
          Task: E-Commerce Website
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Complete this task to unlock your next learning level.
        </p>

        {/* Task Description */}
        <div className="mt-6 p-5 border rounded-xl bg-gray-50">
          <h2 className="text-lg font-semibold">Problem Statement</h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Develop a fully functional <b>E-Commerce Web Application</b> with
            the following features:
          </p>

          <ul className="list-disc text-gray-700 mt-3 pl-6 space-y-1">
            <li>Home Page with Product Listing</li>
            <li>Product Detail Page</li>
            <li>Add to Cart Functionality</li>
            <li>User Signup / Login</li>
            <li>Checkout Page</li>
            <li>Any UI framework: Tailwind / Bootstrap / Material UI</li>
          </ul>

          <p className="text-gray-700 mt-3">
            You may use any stack like: <b>MERN</b>, <b>Django + React</b>,{" "}
            <b>Node + EJS</b>, etc.
          </p>
        </div>

        {/* Submission Box */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Submission URL (GitHub / Live Link)
          </label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#2563EB]"
            placeholder="https://github.com/yourproject OR https://yourapp.vercel.app"
            value={submissionUrl}
            onChange={(e) => setSubmissionUrl(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#2563EB] hover:bg-[#1F4FCF] text-white px-6 py-2 rounded-lg transition shadow-md"
          >
            Submit Task
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 bg-white text-gray-800 px-5 py-3 rounded-lg shadow-lg border border-gray-200 animate-slideUp">
          ✅ <b>Submission received!</b>
          <p className="text-sm text-gray-600">
            Badge will be issued soon after verification.
          </p>
        </div>
      )}
    </div>
  );
}
