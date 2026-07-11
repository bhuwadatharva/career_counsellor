import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhaseDetails() {
  const { phaseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  // 🔥 FETCH PHASE DATA
  const fetchDetails = async () => {
    const res = await fetch(
      `https://career-counsellor-ha78.onrender.com/phases/details/${phaseId}`,
    );
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchDetails();
  }, [phaseId]);

  // 🎥 Extract YouTube ID
  const getVideoId = (url) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  };

  // ✅ COMPLETE SKILL
  const completeSkill = async (skillId) => {
    await fetch(
      `https://career-counsellor-ha78.onrender.com/skills/complete/${skillId}`,
      {
        method: "PUT",
      },
    );
    fetchDetails(); // 🔄 refresh UI
  };

  if (!data) {
    return (
      <div className="p-6 h-full flex items-center justify-center font-mono text-sm tracking-widest text-slate-500 uppercase bg-slate-50 bg-square-pattern">
        Loading Phase Intelligence...
      </div>
    );
  }

  const isCompleted = data.phase.status === "completed";

  return (
    <div className="relative p-10 max-w-5xl mx-auto min-h-full flex flex-col bg-slate-50 bg-square-pattern overflow-hidden">
      <div className="relative z-10">
        {/* HEADER */}
        <div className="border-b-2 border-emerald-100 pb-4 mb-8 flex justify-between items-end">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-emerald-600 font-bold uppercase mb-2">
              Phase {String(data.phase.phase_number).padStart(2, "0")}
            </p>
            <h1 className="text-4xl font-serif font-black tracking-tight text-emerald-900">
              {data.phase.title}
            </h1>
          </div>
          <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-800 uppercase border border-emerald-200 bg-emerald-50 px-3 py-1 rounded">
            {data.phase.status}
          </span>
        </div>

        {/* 🎥 VIDEOS */}
        <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-slate-500 mb-4">
          📺 01 / Learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {data.resources.map((video, i) => {
            const videoId = getVideoId(video.url);

            return (
              <div
                key={i}
                className="border border-emerald-100 bg-white p-4 rounded-xl shadow-sm hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <img
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  alt="thumbnail"
                  className="w-full rounded-lg mb-3 object-cover shadow-sm transition-all duration-300"
                />
                <h3 className="font-semibold text-lg font-serif text-slate-800">
                  {video.title}
                </h3>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 font-mono text-xs uppercase tracking-widest mt-2 font-bold inline-block border-b border-emerald-200 pb-1 hover:text-emerald-800 hover:border-emerald-400 transition"
                >
                  Watch Video ↗
                </a>
              </div>
            );
          })}
        </div>

        {/* 💻 TASKS */}
        <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-slate-500 mb-4 mt-6">
          💻 02 / Tasks
        </h2>
        <div className="mb-10 p-6 border border-emerald-100 rounded-xl shadow-sm bg-white flex flex-col gap-4">
          <p className="font-serif text-lg mb-4 text-slate-700 border-b border-slate-100 pb-4">
            Apply your knowledge by completing the assigned tasks for this
            phase.
          </p>
          {data.projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between border border-slate-200 p-4 rounded-lg bg-slate-50 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <div>
                <h3 className="font-semibold text-lg font-serif text-emerald-900">
                  {project.title}
                </h3>
                <p className="font-mono text-[10px] tracking-widest uppercase text-slate-500 mt-1 flex items-center gap-2">
                  Status:{" "}
                  <span
                    className={`font-bold px-2 py-0.5 rounded ${
                      project.status === "approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {project.status === "approved" ? "Completed" : "Pending"}
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate(`/task/${phaseId}/${project.id}`)}
                className="mt-4 md:mt-0 bg-emerald-600 text-white rounded-lg px-6 py-2 font-mono font-bold text-xs tracking-widest uppercase hover:bg-emerald-700 hover:shadow-md transition-all"
              >
                {project.status === "approved" ? "Review Task" : "Submit Task"}{" "}
                →
              </button>
            </div>
          ))}
        </div>

        {/* ✅ SKILLS */}
        <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-slate-500 mb-4 mt-2">
          ✅ 03 / Skills & Validation
        </h2>
        <p className="text-slate-600 mb-4 text-sm font-sans">
          After completing your task, validate your acquired skills below to
          complete this phase.
        </p>

        <div className="flex flex-col gap-3 mb-12">
          {data.skills.map((skill) => (
            <label
              key={skill.id}
              className="flex items-center gap-4 p-3 bg-white border border-emerald-100 cursor-pointer hover:border-emerald-300 transition-colors rounded-lg shadow-sm"
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-emerald-600 cursor-pointer rounded"
                checked={skill.status === "completed"}
                onChange={() => completeSkill(skill.id)}
                disabled={skill.status === "completed"}
              />
              <span
                className={`font-medium ${
                  skill.status === "completed"
                    ? "line-through text-slate-400"
                    : "text-slate-700"
                }`}
              >
                {skill.name}
              </span>
            </label>
          ))}
        </div>

        {/* 🎉 COMPLETION MESSAGE */}
        {isCompleted && (
          <div className="mt-8 p-6 bg-white text-emerald-900 text-center border border-emerald-200 rounded-xl shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-2 flex items-center justify-center gap-2">
              <span className="text-emerald-500">✓</span> Phase Operations
              Completed
            </h2>
            <p className="font-mono text-xs tracking-widest font-bold text-emerald-600 mb-6 uppercase">
              Badge Acquired Successfully
            </p>
            <button
              onClick={() => navigate("/roadmap")}
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-mono font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 hover:shadow-md transition-all"
            >
              Return to Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
