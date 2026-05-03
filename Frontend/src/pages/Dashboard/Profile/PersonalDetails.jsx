import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";

export default function PersonalDetails() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",

    email: "",
  });

  useEffect(() => {
    if (user?.user_id) {
      fetch(`https://career-counsellor-ha78.onrender.com/auth/profile/${user.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          const nameParts = data.name ? data.name.split(" ") : ["", ""];
          setFormData((prev) => ({
            ...prev,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: data.email || "",
          }));
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-white">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-300">Full Name</label>
          <input
            type="text"
            value={formData.firstName}
            className="w-full bg-[#1a1a1a] text-white border border-[#444] rounded-xl p-2 text-sm"
            disabled
          />
        </div>



        <div>
          <label className="block text-sm mb-1 text-gray-300">Email</label>
          <input
            type="email"
            value={formData.email}
            className="w-full bg-[#1a1a1a] text-white border border-[#444] rounded-xl p-2 text-sm"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
