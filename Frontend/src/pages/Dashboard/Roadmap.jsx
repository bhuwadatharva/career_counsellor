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
        const res = await fetch(`http://127.0.0.1:8000/phases/${user.user_id}`);
        const data = await res.json();
        setPhases(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user?.user_id) fetchPhases();
  }, [user]);

  return (
    <div className="p-10 max-w-7xl mx-auto h-full bg-[#0a0a0a]">
      <div className="border-b-2 border-neutral-800 pb-4 mb-8">
        <h1 className="text-4xl font-serif font-black tracking-tight text-white">
          Career Roadmap Strategy
        </h1>
        <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mt-2">
          Your path to operational excellence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {phases.map((phase) => (
          <div
            key={phase.id}
            onClick={() => {
              if (phase.status !== "locked") {
                navigate(`/phase/${phase.id}`);
              }
            }}
            className={`p-6 border transition-all duration-300 relative overflow-hidden group ${
              phase.status === "locked"
                ? "bg-[#1a1a1a] border-[#444] cursor-not-allowed opacity-70"
                : "bg-black border-neutral-800 cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(255,255,255,0.15)]"
            }`}
          >
            {/* Status indicator line element */}
            <div className={`absolute top-0 left-0 w-1 h-full ${
              phase.status === 'completed' ? 'bg-black' : phase.status === 'active' ? 'bg-gray-400' : 'bg-transparent'
            }`} />
                
            <span className="font-mono text-[10px] tracking-widest uppercase border border-[#444] px-2 py-1 bg-black text-white mb-4 inline-block">
              Phase {String(phase.phase_number).padStart(2, "0")}
            </span>

            <h3 className="text-xl font-serif font-bold text-white group-hover:underline underline-offset-4 decoration-2">
              {phase.title}
            </h3>

            <p className="mt-4 font-mono text-[11px] uppercase tracking-widest flex justify-between items-center text-gray-500">
              <span>Status</span>
              <span
                className={`font-semibold border-b ${
                  phase.status === "completed"
                    ? "text-white border-neutral-800"
                    : phase.status === "active"
                    ? "text-white border-dashed border-neutral-800"
                    : "text-gray-400 border-[#444]"
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
