import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhaseDetails() {
  const { phaseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  // 🔥 FETCH PHASE DATA
  const fetchDetails = async () => {
    const res = await fetch(`http://127.0.0.1:8000/phases/details/${phaseId}`);
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
    await fetch(`http://127.0.0.1:8000/skills/complete/${skillId}`, {
      method: "PUT",
    });
    fetchDetails(); // 🔄 refresh UI
  };

  if (!data) {
    return (
      <div className="p-6 h-full flex items-center justify-center font-mono text-sm tracking-widest text-gray-500 uppercase">
        Loading Phase Intelligence...
      </div>
    );
  }

  const isCompleted = data.phase.status === "completed";

  return (
    <div className="p-10 max-w-5xl mx-auto h-full flex flex-col bg-black">
      {/* HEADER */}
      <div className="border-b-2 border-neutral-800 pb-4 mb-8 flex justify-between items-end">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">
            Phase {String(data.phase.phase_number).padStart(2, "0")}
          </p>
          <h1 className="text-4xl font-serif font-black tracking-tight text-white">
            {data.phase.title}
          </h1>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase border border-[#444] px-3 py-1 rounded">
          {data.phase.status}
        </span>
      </div>

      {/* 🎥 VIDEOS */}
      <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-4">📺 01 / Learn</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {data.resources.map((video, i) => {
          const videoId = getVideoId(video.url);

          return (
            <div key={i} className="border border-[#333] p-4 rounded hover:border-neutral-800 transition-colors duration-300">
              <img
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt="thumbnail"
                className="w-full rounded mb-3 grayscale hover:grayscale-0 transition-all duration-300"
              />
              <h3 className="font-semibold text-lg font-serif">{video.title}</h3>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="text-white font-mono text-xs uppercase tracking-widest mt-2 inline-block border-b border-neutral-800 pb-1 hover:text-gray-400 hover:border-gray-600 transition"
              >
                Watch Video ↗
              </a>
            </div>
          );
        })}
      </div>

      {/* 💻 TASKS */}
      <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-4 mt-6">💻 02 / Tasks</h2>
      <div className="mb-10 p-6 border border-neutral-800 bg-[#111] flex flex-col gap-4">
        <p className="font-serif text-lg mb-4 text-white border-b border-[#444] pb-4">
          Apply your knowledge by completing the assigned tasks for this phase.
        </p>
        {data.projects.map(project => (
          <div key={project.id} className="flex flex-col md:flex-row items-start md:items-center justify-between border border-[#444] p-4 bg-black hover:border-neutral-800 transition-all">
            <div>
              <h3 className="font-semibold text-lg font-serif">{project.title}</h3>
              <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500 mt-1">
                Status: <span className={project.status === 'approved' ? 'text-white font-bold' : ''}>{project.status === 'approved' ? 'Completed' : 'Pending'}</span>
              </p>
            </div>
            <button
              onClick={() => navigate(`/task/${phaseId}/${project.id}`)}
              className="mt-4 md:mt-0 bg-black text-white px-6 py-2 font-mono text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              {project.status === 'approved' ? 'Review Task' : 'Submit Task'} →
            </button>
          </div>
        ))}
      </div>

      {/* ✅ SKILLS */}
      <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500 mb-4 mt-2">✅ 03 / Skills & Validation</h2>
      <p className="text-gray-400 mb-4 text-sm font-sans">
        After completing your task, validate your acquired skills below to complete this phase.
      </p>

      <div className="flex flex-col gap-3 mb-12">
        {data.skills.map((skill) => (
          <label key={skill.id} className="flex items-center gap-4 p-3 border border-[#333] cursor-pointer hover:border-neutral-800 transition-colors rounded">
            <input
              type="checkbox"
              className="w-5 h-5 accent-black cursor-pointer"
              checked={skill.status === "completed"}
              onChange={() => completeSkill(skill.id)}
              disabled={skill.status === "completed"}
            />
            <span
              className={`font-medium ${
                skill.status === "completed" ? "line-through text-gray-400" : "text-white"
              }`}
            >
              {skill.name}
            </span>
          </label>
        ))}
      </div>

      {/* 🎉 COMPLETION MESSAGE */}
      {isCompleted && (
        <div className="mt-8 p-6 bg-black text-white text-center border border-neutral-800">
          <h2 className="text-2xl font-serif font-bold mb-2">
            Phase Operations Completed
          </h2>
          <p className="font-mono text-xs tracking-widest text-gray-400 mb-6 uppercase">
            Badge Acquired Successfully
          </p>
          <button
            onClick={() => navigate("/roadmap")}
            className="bg-black text-white px-6 py-2 rounded-none font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition"
          >
            Return to Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
