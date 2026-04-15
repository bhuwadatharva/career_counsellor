import React, { useState } from "react";
import { RiTeamLine } from "react-icons/ri";
import { LuUserPlus } from "react-icons/lu";
import { FaUser, FaChartBar, FaCreditCard, FaLock } from "react-icons/fa";

import PersonalDetails from "./PersonalDetails";
import AnalyticsSection from "./AnalyticsSection";
import PaymentSection from "./PaymentSection";
import PrivacySection from "./PrivacySection";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  // Dummy profile data
  const formData = {
    student_name: "Jane Smith",
    courses_in_progress: 5,
    courses_completed: 12,
  };

  const tabs = [
    { id: "Personal Details", label: "Personal Details", icon: <FaUser /> },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block h-full overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col lg:flex-row gap-4 h-full p-4 bg-white rounded-2xl">
          {/* LEFT CARD */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
            <h2 className="text-xl font-semibold text-black text-center">
              {formData.student_name}
            </h2>

            {/* Course Stats */}
            <div className="flex gap-6 mt-6 mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-black">
                  {formData.courses_in_progress}
                </div>
                <div className="text-sm text-gray-700">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-black">
                  {formData.courses_completed}
                </div>
                <div className="text-sm text-gray-700">Completed</div>
              </div>
            </div>

            {/* Achievements */}

            {/* Support Section */}
          </div>

          {/* RIGHT CARD */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-black">
                Profile Setting
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 text-sm font-medium focus:outline-none whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Personal Details" && (
              <PersonalDetails student={formData} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col h-screen bg-white">
        {/* Mobile Profile Card */}
        <div className="bg-white rounded-xl shadow p-4 m-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-200"
              />
              <div>
                <h2 className="text-lg font-semibold text-black">
                  {formData.student_name}
                </h2>
              </div>
            </div>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileDropdownOpen ? (
                <span className="text-black">▲</span>
              ) : (
                <span className="text-black">▼</span>
              )}
            </button>
          </div>

          {isMobileDropdownOpen && (
            <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-lg font-bold text-black">
                    {formData.courses_in_progress}
                  </div>
                  <div className="text-sm text-gray-700">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-black">
                    {formData.courses_completed}
                  </div>
                  <div className="text-sm text-gray-700">Completed</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === "Personal Details" && (
            <PersonalDetails student={formData} />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 ${
                  activeTab === tab.id
                    ? "text-black font-semibold"
                    : "text-gray-500"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-xs">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
