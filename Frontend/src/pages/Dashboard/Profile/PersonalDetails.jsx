import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";

export default function PersonalDetails() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.user_id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/auth/profile/${user.user_id}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="text-sm font-medium text-slate-500 animate-pulse">
        Loading personal details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm font-medium text-red-500">Error: {error}</div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-emerald-900">
        Personal Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 font-semibold text-slate-600">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            className="w-full border border-emerald-200 bg-emerald-50 text-emerald-900 rounded-xl p-2 text-sm shadow-sm"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-semibold text-slate-600">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            className="w-full border border-emerald-200 bg-emerald-50 text-emerald-900 rounded-xl p-2 text-sm shadow-sm"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
