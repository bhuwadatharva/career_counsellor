import React, { useState, useEffect } from "react";
import { RiTeamLine } from "react-icons/ri";
import { LuUserPlus } from "react-icons/lu";
import { FaUser, FaChartBar, FaCreditCard, FaLock } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";

import PersonalDetails from "./PersonalDetails";
import AnalyticsSection from "./AnalyticsSection";
import PaymentSection from "./PaymentSection";
import PrivacySection from "./PrivacySection";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Loading...",
    email: "...",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.user_id) return;
      try {
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/auth/profile/${user.user_id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setProfileData((prev) => ({
            ...prev,
            name: data.name || "Unknown",
            email: data.email || "No email",
          }));
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, [user]);

  const tabs = [
    { id: "Personal Details", label: "Personal Details", icon: <FaUser /> },
  ];

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block h-full overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col lg:flex-row gap-4 h-full p-4 bg-slate-50 bg-square-pattern rounded-2xl">
          {/* LEFT CARD */}
          <div className="w-full lg:w-1/3 bg-white border border-emerald-100 p-6 rounded-xl shadow-sm flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-emerald-200"
            />
            <h2 className="text-xl font-semibold text-emerald-900 text-center">
              {profileData.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{profileData.email}</p>

            {/* Course Stats */}

            {/* Achievements */}

            {/* Support Section */}
          </div>

          {/* RIGHT CARD */}
          <div className="flex-1 bg-white border border-emerald-100 p-6 rounded-xl shadow-sm overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-emerald-900">
                Profile Setting
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-emerald-100 mb-6 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-4 text-sm font-medium focus:outline-none whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-emerald-500 text-emerald-700"
                      : "text-slate-500 hover:text-emerald-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Personal Details" && <PersonalDetails />}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col h-screen bg-slate-50 bg-square-pattern">
        {/* Mobile Profile Card */}
        <div className="bg-white border border-emerald-100 rounded-xl shadow-sm p-4 m-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-emerald-200"
              />
              <div>
                <h2 className="text-lg font-semibold text-emerald-900">
                  {profileData.name}
                </h2>
                <p className="text-xs text-slate-500">{profileData.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-emerald-700"
            >
              {isMobileDropdownOpen ? "▲" : "▼"}
            </button>
          </div>
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === "Personal Details" && <PersonalDetails />}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-emerald-100 z-50 shadow-md">
          <div className="flex justify-around py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 ${
                  activeTab === tab.id
                    ? "text-emerald-700 font-semibold"
                    : "text-slate-500 hover:text-emerald-600"
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
