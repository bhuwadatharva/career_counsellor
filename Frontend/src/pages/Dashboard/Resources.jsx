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
    <div className="h-full bg-gray-50 p-8 overflow-y-auto">
      {/* Header */}
      {pathInfo && (
        <div className="bg-blue-950 text-white rounded-3xl p-8 mb-10 shadow-md">
          <h1 className="text-3xl font-semibold">{pathInfo.title}</h1>
          <p className="mt-2 text-gray-300">
            Managed by {pathInfo.manager} | {videos.length} videos
          </p>

          {/* Progress Bar */}
          <div className="mt-5 w-full sm:w-1/2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition"
          >
            <div className="aspect-video mb-3 rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={video.url.replace("watch?v=", "embed/")}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>

            <h2 className="font-semibold text-lg text-gray-800 mb-1">
              {video.title}
            </h2>

            <p className="text-gray-600 text-sm mb-3">{video.description}</p>

            <p className="text-xs text-gray-400 mb-3">
              Duration: {video.duration}
            </p>

            {/* Completed Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-5 w-5 accent-blue-600"
                checked={completed.includes(index)}
                onChange={() => handleComplete(index)}
              />
              <span className="text-sm text-gray-700">Mark as Completed</span>
            </label>
          </div>
        ))}
      </div>

      {/* Completion Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-2xl text-center w-80 shadow-lg">
            <Check className="mx-auto text-green-600" size={45} />
            <h2 className="mt-3 text-xl font-bold text-gray-800">
              Congratulations!
            </h2>
            <p className="mt-2 text-gray-600">
              You have completed the {pathInfo?.title} learning path!
            </p>

            <button
              onClick={() => navigate("/task")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
            >
              View Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
