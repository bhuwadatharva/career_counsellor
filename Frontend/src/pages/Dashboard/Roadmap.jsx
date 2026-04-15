import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRoute } from "react-icons/fa";
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
    <div className="p-6 flex flex-col gap-6 bg-white">
      <h1 className="text-3xl font-bold text-center">Your Career Roadmap 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {phases.map((phase) => (
          <div
            key={phase.id}
            onClick={() => {
              if (phase.status !== "locked") {
                navigate(`/phase/${phase.id}`);
              }
            }}
            className={`p-5 rounded-xl border cursor-pointer ${
              phase.status === "locked"
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white hover:shadow-md"
            }`}
          >
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              Phase {phase.phase_number}
            </span>

            <h3 className="text-lg font-semibold mt-2">{phase.title}</h3>

            <p className="mt-2 text-sm">
              Status:
              <span
                className={`ml-2 font-semibold ${
                  phase.status === "completed"
                    ? "text-green-600"
                    : phase.status === "active"
                      ? "text-blue-600"
                      : "text-gray-400"
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
