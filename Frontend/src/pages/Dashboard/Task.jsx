import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Task() {
  const { phaseId, projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchPhaseDetails = async () => {
      try {
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/phases/details/${phaseId}`,
        );
        const result = await res.json();

        if (result.projects && result.projects.length > 0) {
          const found = result.projects.find(
            (p) => p.id === parseInt(projectId),
          );
          if (found) {
            setProject(found);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (phaseId && projectId) fetchPhaseDetails();
  }, [phaseId, projectId]);

  const handleSubmit = async () => {
    if (!submissionUrl.trim()) return alert("Please provide your project link");
    if (!project) return;

    setLoading(true);

    try {
      await fetch(
        `https://career-counsellor-ha78.onrender.com/projects/submit/${project.id}?link=${encodeURIComponent(submissionUrl)}`,
        { method: "PUT" },
      );

      // Auto approve for MVP
      await fetch(
        `https://career-counsellor-ha78.onrender.com/projects/approve/${project.id}`,
        {
          method: "PUT",
        },
      );

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate(`/phase/${phaseId}`);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Error submitting task");
    } finally {
      setLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="p-6 h-full flex flex-col items-center justify-center bg-slate-50 bg-square-pattern font-mono text-sm tracking-widest text-slate-500 uppercase">
        <p>Loading Task Initialization...</p>
      </div>
    );
  }

  return (
    <div className="relative p-10 w-full min-h-full bg-slate-50 bg-square-pattern flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-sm border border-emerald-100 p-10 animate-fadeIn">
        {/* Task Header */}
        <div className="border-b-2 border-emerald-100 pb-4 mb-6">
          <p className="font-mono text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-2">
            Phase Task
          </p>
          <h1 className="text-3xl font-serif font-bold text-emerald-900">
            {project.title}
          </h1>
        </div>

        <p className="text-slate-600 mt-1 text-sm font-sans mb-8">
          Complete this task securely to validate your competencies and unlock
          subsequent phases.
        </p>

        {/* Task Description */}
        <div className="mt-6 p-6 border border-emerald-100 bg-emerald-50 rounded-xl mb-8">
          <h2 className="text-sm font-mono font-bold tracking-widest uppercase text-emerald-800 mb-3 border-b border-emerald-200 pb-2">
            Task Requirements
          </h2>

          <p className="text-slate-700 font-sans leading-relaxed text-sm mb-4">
            Follow the established blueprint to execute this project. Ensure
            your code is hosted in a public repository or deployed live for
            assessment.
          </p>

          <p className="text-slate-500 mt-2 font-sans text-sm flex items-center">
            Status:
            <span
              className={`ml-2 font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white border ${project.status === "approved" ? "border-emerald-500 text-emerald-700" : "border-slate-300 text-slate-500"}`}
            >
              {project.status === "approved" ? "Completed" : "Pending"}
            </span>
          </p>
        </div>

        {/* Submission Box */}
        {project.status !== "approved" ? (
          <div className="mt-6">
            <label className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500 mb-2 block">
              Submission URL (GitHub / Demo Link)
            </label>
            <input
              type="text"
              className="w-full p-4 border border-emerald-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-xl font-sans text-sm bg-white text-slate-800 transition-all placeholder:text-slate-400 shadow-sm"
              placeholder="https://github.com/..."
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              disabled={loading}
            />
          </div>
        ) : (
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <p className="text-emerald-700 font-mono text-sm tracking-widest uppercase font-bold">
              Task already completed.
            </p>
          </div>
        )}

        {/* Submit Button */}
        {project.status !== "approved" && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full md:w-auto"
            >
              {loading ? "Processing..." : "Submit Task for Verification"}
            </button>
          </div>
        )}
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed bottom-10 right-10 bg-white text-emerald-900 px-6 py-4 border border-emerald-200 rounded-xl shadow-2xl animate-slideUp z-50">
          <p className="font-serif text-lg font-bold flex items-center gap-2">
            <span className="text-emerald-500">✓</span> Submission Verified
          </p>
          <p className="text-xs font-mono text-emerald-600 mt-2 uppercase tracking-widest">
            Redirecting to Phase Operations...
          </p>
        </div>
      )}
    </div>
  );
}
