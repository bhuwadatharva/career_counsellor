import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://career-counsellor-ha78.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.detail || "Registration sequence failed");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-slate-50 px-6 bg-square-pattern"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-md relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-300 pointer-events-none rounded-tl-xl" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-300 pointer-events-none rounded-br-xl" />

        <div className="bg-white border border-emerald-100 p-10 sm:p-12 shadow-lg rounded-xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] tracking-widest text-emerald-600 uppercase mb-2 font-bold">
              Registration Portal
            </p>
            <h1 className="text-3xl font-serif font-bold text-emerald-900 tracking-tight">
              User Registration
            </h1>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-2 ml-1 font-semibold">
                Full Name
              </label>
              <input
                name="name"
                placeholder="e.g. Atharva Bhuwad"
                className="block w-full py-4 px-4 text-sm text-emerald-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-medium"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-2 ml-1 font-semibold">
                Email Address
              </label>
              <input
                name="email"
                placeholder="name@intelligence.com"
                className="block w-full py-4 px-4 text-sm text-emerald-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-medium"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-2 ml-1 font-semibold">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="block w-full py-4 px-4 text-sm text-emerald-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-medium"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-mono text-xs tracking-widest uppercase font-semibold py-4 mt-6 hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50 shadow-md rounded-sm"
            >
              {loading ? "Allocating..." : "Request Access"}
            </button>

            {error && (
              <div className="mt-4 p-3 border border-red-200 bg-red-50 text-red-600 font-mono text-[10px] tracking-widest uppercase text-center rounded-sm">
                {error}
              </div>
            )}

            <div className="mt-8 text-center border-t border-emerald-50 pt-6">
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                Already registered?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline underline-offset-4 ml-1"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
