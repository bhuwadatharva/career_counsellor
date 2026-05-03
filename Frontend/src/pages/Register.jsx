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
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-neutral-700 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-neutral-700 pointer-events-none" />

        <div className="bg-[#050505] border border-neutral-800 p-10 sm:p-12">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
              Registration Portal
            </p>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              User Registration
            </h1>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2 ml-1">
                Full Name
              </label>
              <input
                name="name"
                placeholder="e.g. Jane Doe"
                className="block w-full py-4 px-4 text-sm text-white bg-[#0a0a0a] border border-neutral-800 rounded-sm focus:outline-none focus:border-white transition-colors"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2 ml-1">
                Email Address
              </label>
              <input
                name="email"
                placeholder="name@intelligence.com"
                className="block w-full py-4 px-4 text-sm text-white bg-[#0a0a0a] border border-neutral-800 rounded-sm focus:outline-none focus:border-white transition-colors"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="block w-full py-4 px-4 text-sm text-white bg-[#0a0a0a] border border-neutral-800 rounded-sm focus:outline-none focus:border-white transition-colors"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold py-4 mt-6 hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Allocating..." : "Request Access"}
            </button>

            {error && (
              <div className="mt-4 p-3 border border-red-900/30 bg-red-900/10 text-red-500 font-mono text-[10px] tracking-widest uppercase text-center">
                {error}
              </div>
            )}

            <div className="mt-8 text-center border-t border-neutral-900 pt-6">
              <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                Already registered?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-white hover:underline underline-offset-4 ml-1"
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
