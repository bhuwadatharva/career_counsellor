// Resources.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

export default function Resources() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [pathInfo, setPathInfo] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const roadmap = JSON.parse(localStorage.getItem("dynamicRoadmap"));
    const completedStore =
      JSON.parse(localStorage.getItem(`completed-${id}`)) || [];

    if (roadmap && roadmap[id]) {
      setPathInfo(roadmap[id]);
      setVideos(roadmap[id].videos || []);
      setCompleted(completedStore);
    }
  }, [id]);

  // Progress %
  const progress =
    videos.length > 0
      ? Math.round((completed.length / videos.length) * 100)
      : 0;

  // Handle Complete Toggle
  const handleComplete = (index) => {
    let updated;

    if (completed.includes(index)) {
      updated = completed.filter((x) => x !== index);
    } else {
      updated = [...completed, index];
    }

    setCompleted(updated);
    localStorage.setItem(`completed`, JSON.stringify(updated));

    if (updated.length === videos.length) {
      setShowModal(true);
    }
  };

  return (
    <div className="h-full bg-slate-50 bg-square-pattern p-8 overflow-y-auto">
      {/* Header */}
      {pathInfo && (
        <div className="bg-emerald-900 text-white rounded-3xl p-8 mb-10 shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-serif font-bold tracking-tight">{pathInfo.title}</h1>
            <p className="mt-2 text-emerald-100/80 font-mono text-sm tracking-widest uppercase">
              Managed by {pathInfo.manager} | {videos.length} videos
            </p>

            {/* Progress Bar */}
            <div className="mt-6 w-full sm:w-1/2">
              <div className="flex justify-between text-sm mb-2 font-mono uppercase tracking-widest text-emerald-50/80">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-emerald-950/50 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 hover:shadow-md hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-video mb-4 rounded-xl overflow-hidden shadow-sm">
              <iframe
                className="w-full h-full"
                src={video.url.replace("watch?v=", "embed/")}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>

            <h2 className="font-semibold text-lg text-emerald-900 mb-1 font-serif leading-tight">
              {video.title}
            </h2>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{video.description}</p>

            <div className="flex items-center justify-between border-t border-emerald-50 pt-4 mt-2">
              <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                {video.duration}
              </p>

              {/* Completed Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer group">
                <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-700 transition-colors">MARK DONE</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-emerald-600 rounded border-emerald-300 cursor-pointer"
                  checked={completed.includes(index)}
                  onChange={() => handleComplete(index)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-slate-900/40">
          <div className="bg-white p-8 rounded-2xl text-center w-80 shadow-2xl border border-emerald-100 animate-slideUp">
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-emerald-600" size={32} strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-emerald-900">
              Operations Complete
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-sans">
              You have validated all intelligence in the <strong className="text-emerald-700">{pathInfo?.title}</strong> path!
            </p>

            <button
              onClick={() => navigate("/task")}
              className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 hover:shadow-md transition-all w-full"
            >
              Proceed to Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
