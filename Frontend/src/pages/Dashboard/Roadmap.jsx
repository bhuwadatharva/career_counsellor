import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function Roadmap() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [phases, setPhases] = useState([]);

  // 🔥 FETCH PHASES FROM BACKEND
  useEffect(() => {
    const fetchPhases = async () => {
      try {
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/phases/${user.user_id}`,
        );
        const data = await res.json();
        setPhases(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.user_id) fetchPhases();
  }, [user]);

  return (
    <div className="relative p-10 max-w-7xl mx-auto min-h-full bg-slate-50 overflow-hidden bg-square-pattern">
      <div className="relative z-10 border-b-2 border-emerald-100 pb-4 mb-8">
        <h1 className="text-4xl font-serif font-black tracking-tight text-emerald-900">
          Career Roadmap Strategy
        </h1>
        <p className="font-mono text-xs tracking-widest text-emerald-700/70 uppercase mt-2">
          Your path to operational excellence
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <div
            key={phase.id}
            onClick={() => {
              if (phase.status !== "locked") {
                navigate(`/phase/${phase.id}`);
              }
            }}
            className={`p-6 border transition-all duration-300 relative overflow-hidden group rounded-xl shadow-sm ${
              phase.status === "locked"
                ? "bg-slate-100 border-slate-200 cursor-not-allowed opacity-70"
                : "bg-white border-emerald-100 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300"
            }`}
          >
            {/* Status indicator line element */}
            <div
              className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-300 ${
                phase.status === "completed"
                  ? "bg-emerald-600"
                  : phase.status === "active"
                    ? "bg-emerald-400"
                    : "bg-transparent"
              }`}
            />

            <span className="font-mono text-[10px] font-bold tracking-widest uppercase border border-emerald-200 px-2 py-1 bg-emerald-50 text-emerald-800 rounded mb-4 inline-block">
              Phase {String(phase.phase_number).padStart(2, "0")}
            </span>

            <h3 className="text-xl font-serif font-bold text-slate-800 group-hover:text-emerald-900 transition-colors">
              {phase.title}
            </h3>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest flex justify-between items-center text-slate-500">
              <span>Status</span>
              <span
                className={`font-semibold border-b ${
                  phase.status === "completed"
                    ? "text-emerald-700 border-emerald-200"
                    : phase.status === "active"
                      ? "text-emerald-600 border-dashed border-emerald-300"
                      : "text-slate-400 border-slate-300"
                }`}
              >
                {phase.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
