import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PhaseDetails() {
  const { phaseId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  const [loading, setLoading] = useState(false);

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

  // 🚀 SUBMIT PROJECT
  const submitProject = async (projectId) => {
    setLoading(true);

    await fetch(
      `http://127.0.0.1:8000/projects/submit/${projectId}?link=${projectLink}`,
      { method: "PUT" },
    );

    // 🔥 OPTIONAL AUTO APPROVE (for MVP)
    await fetch(`http://127.0.0.1:8000/projects/approve/${projectId}`, {
      method: "PUT",
    });

    setLoading(false);

    alert("Project Submitted & Approved ✅");

    fetchDetails();
  };

  if (!data) return <p>Loading...</p>;

  const isCompleted = data.phase.status === "completed";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{data.phase.title}</h1>

      {/* 🎥 VIDEOS */}
      <h2 className="text-lg font-semibold mb-2">📺 Learn</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.resources.map((video, i) => {
          const videoId = getVideoId(video.url);

          return (
            <div key={i} className="border p-3 rounded">
              <img
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt="thumbnail"
                className="w-full rounded"
              />

              <h3 className="mt-2 font-semibold">{video.title}</h3>

              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                Watch Video
              </a>
            </div>
          );
        })}
      </div>

      {/* ✅ SKILLS */}
      <h2 className="text-lg font-semibold mt-6">✅ Skills</h2>

      {data.skills.map((skill) => (
        <div key={skill.id} className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={skill.status === "completed"}
            onChange={() => completeSkill(skill.id)}
          />

          <span
            className={
              skill.status === "completed" ? "line-through text-gray-400" : ""
            }
          >
            {skill.name}
          </span>
        </div>
      ))}

      {/* 💻 PROJECT */}
      <h2 className="text-lg font-semibold mt-6">💻 Project</h2>

      {data.projects.map((proj) => (
        <div key={proj.id} className="border p-3 rounded mt-2">
          <h3>{proj.title}</h3>

          {proj.status !== "approved" ? (
            <>
              <input
                placeholder="Paste GitHub link"
                className="border p-2 w-full mt-2"
                onChange={(e) => setProjectLink(e.target.value)}
              />

              <button
                onClick={() => submitProject(proj.id)}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
              >
                {loading ? "Submitting..." : "Submit Project"}
              </button>
            </>
          ) : (
            <p className="text-green-600 font-semibold mt-2">
              Project Approved ✅
            </p>
          )}
        </div>
      ))}

      {/* 🎉 COMPLETION MESSAGE */}
      {isCompleted && (
        <div className="mt-6 p-4 bg-green-100 rounded text-center">
          <h2 className="text-xl font-bold text-green-700">
            🎉 Phase Completed!
          </h2>

          <button
            onClick={() => navigate("/roadmap")}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Go Back to Roadmap
          </button>
        </div>
      )}
    </div>
  );
}
