import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://career-counsellor-ha78.onrender.com/auth/login?email=${form.email}&password=${form.password}`,
        { method: "POST" },
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.detail || "Authentication sequence failed");

      // 🔥 STORE USER
      login({ user_id: data.user_id });
      navigate("/dashboard");
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
              Access Portal
            </p>
            <h1 className="text-3xl font-serif font-bold text-emerald-900 tracking-tight">
              User Login
            </h1>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-2 ml-1 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. name@intelligence.com"
                className="block w-full py-4 px-4 text-sm text-emerald-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-medium"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-slate-500 mb-2 ml-1 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="block w-full py-4 px-4 text-sm text-emerald-900 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors font-medium"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-mono text-xs tracking-widest uppercase font-semibold py-4 mt-6 hover:bg-emerald-700 transition-colors duration-300 disabled:opacity-50 shadow-md rounded-sm"
            >
              {loading ? "Authenticating..." : "Initialize Session"}
            </button>

            {error && (
              <div className="mt-4 p-3 border border-red-200 bg-red-50 text-red-600 font-mono text-[10px] tracking-widest uppercase text-center rounded-sm">
                {error}
              </div>
            )}

            <div className="mt-8 text-center border-t border-emerald-50 pt-6">
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                Awaiting authorization?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline underline-offset-4 ml-1"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
