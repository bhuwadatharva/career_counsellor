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
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md relative">
        {/* Decorative corner accents */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-neutral-700 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-neutral-700 pointer-events-none" />

        <div className="bg-[#050505] border border-neutral-800 p-10 sm:p-12">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2">
              Access Portal
            </p>
            <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
              User Login
            </h1>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. name@intelligence.com"
                className="block w-full py-4 px-4 text-sm text-white bg-[#0a0a0a] border border-neutral-800 rounded-sm focus:outline-none focus:border-white transition-colors"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-widest uppercase text-neutral-500 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="block w-full py-4 px-4 text-sm text-white bg-[#0a0a0a] border border-neutral-800 rounded-sm focus:outline-none focus:border-white transition-colors"
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black font-mono text-xs tracking-widest uppercase font-semibold py-4 mt-6 hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Initialize Session"}
            </button>

            {error && (
              <div className="mt-4 p-3 border border-red-900/30 bg-red-900/10 text-red-500 font-mono text-[10px] tracking-widest uppercase text-center">
                {error}
              </div>
            )}

            <div className="mt-8 text-center border-t border-neutral-900 pt-6">
              <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                Awaiting authorization?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-white hover:underline underline-offset-4 ml-1"
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
