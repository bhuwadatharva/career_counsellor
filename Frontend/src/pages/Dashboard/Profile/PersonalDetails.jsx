import React, { useState, useEffect } from "react";

export default function PersonalDetails() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "+1 234 567 8901",
    college: "Greenfield College",
    degree: "B.Tech Computer Science",
    year: "3rd Year",
    goal: "Web Developer",
  });

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="text"
            value={formData.mobile}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">College</label>
          <input
            type="text"
            value={formData.college}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Degree</label>
          <input
            type="text"
            value={formData.degree}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Year</label>
          <input
            type="text"
            value={formData.year}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Goal</label>
          <input
            type="text"
            value={formData.goal}
            className="w-full border border-gray-300 rounded-xl p-2 text-sm"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
