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
        const res = await fetch(`http://127.0.0.1:8000/phases/details/${phaseId}`);
        const result = await res.json();
        
        if (result.projects && result.projects.length > 0) {
          const found = result.projects.find(p => p.id === parseInt(projectId));
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
        `http://127.0.0.1:8000/projects/submit/${project.id}?link=${encodeURIComponent(submissionUrl)}`,
        { method: "PUT" }
      );

      // Auto approve for MVP
      await fetch(`http://127.0.0.1:8000/projects/approve/${project.id}`, {
        method: "PUT",
      });

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
      <div className="p-6 h-full flex flex-col items-center justify-center bg-black font-mono text-sm tracking-widest text-gray-500 uppercase">
        <p>Loading Task Initialization...</p>
      </div>
    );
  }

  return (
    <div className="p-10 w-full h-full bg-[#0a0a0a] flex items-center justify-center">
      <div className="max-w-3xl w-full bg-black rounded-none shadow-sm border border-neutral-800 p-10 animate-fadeIn">
        {/* Task Header */}
        <div className="border-b-2 border-neutral-800 pb-4 mb-6">
          <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Phase Task</p>
          <h1 className="text-3xl font-serif font-bold text-white">
            {project.title}
          </h1>
        </div>
        
        <p className="text-gray-400 mt-1 text-sm font-sans mb-8">
          Complete this task securely to validate your competencies and unlock subsequent phases.
        </p>

        {/* Task Description */}
        <div className="mt-6 p-6 border border-[#333] bg-[#111] mb-8">
          <h2 className="text-sm font-mono tracking-widest uppercase text-white mb-3 border-b border-[#333] pb-2">Task Requirements</h2>
          
          <p className="text-white font-sans leading-relaxed text-sm mb-4">
            Follow the established blueprint to execute this project. Ensure your code is hosted in a public repository or deployed live for assessment.
          </p>

          <p className="text-gray-400 mt-2 font-sans text-sm">
            Status: 
            <span className={`ml-2 font-mono text-[11px] uppercase tracking-wider px-2 py-1 bg-[#1a1a1a] border ${project.status === 'approved' ? 'border-green-600 text-white' : 'border-[#444] text-white'}`}>
              {project.status === "approved" ? "Completed" : "Pending"}
            </span>
          </p>
        </div>

        {/* Submission Box */}
        {project.status !== "approved" ? (
          <div className="mt-6">
            <label className="text-xs font-mono tracking-widest uppercase text-white mb-2 block">
              Submission URL (GitHub / Demo Link)
            </label>
            <input
              type="text"
              className="w-full p-4 border border-neutral-800 outline-none focus:ring-1 focus:ring-black font-sans text-sm bg-black text-white transition-all"
              placeholder="https://github.com/..."
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              disabled={loading}
            />
          </div>
        ) : (
          <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#444] text-center">
            <p className="text-white font-mono text-sm tracking-widest uppercase">Task already completed.</p>
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
        <div className="fixed bottom-10 right-10 bg-black text-white px-6 py-4 border border-gray-700 shadow-2xl animate-slideUp z-50">
          <p className="font-serif text-lg font-bold">Submission Verified</p>
          <p className="text-xs font-mono text-gray-400 mt-2 uppercase tracking-widest">
            Redirecting to Phase Operations...
          </p>
        </div>
      )}
    </div>
  );
}
