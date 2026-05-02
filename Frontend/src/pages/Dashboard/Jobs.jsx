import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { FiExternalLink, FiBriefcase, FiPercent } from "react-icons/fi";

export default function Jobs() {
  const { user } = useAuth();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/jobs/match/${user.user_id}`,
        );
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(
              "No matching jobs found. Complete more skills to unlock matches.",
            );
          }
          throw new Error("Failed to fetch jobs");
        }
        const data = await res.json();
        setJobData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.user_id) fetchJobs();
  }, [user]);

  return (
    <div className="relative p-10 max-w-7xl mx-auto min-h-full bg-slate-50 overflow-hidden rounded-xl">
      {/* Square SVG Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="squares"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <rect
                width="60"
                height="60"
                fill="none"
                stroke="#047857"
                strokeWidth="1"
              />
              <rect
                width="30"
                height="30"
                fill="none"
                stroke="#047857"
                strokeWidth="0.5"
                x="15"
                y="15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#squares)" />
        </svg>
      </div>

      <div className="relative z-10 border-b-2 border-emerald-100 pb-4 mb-8">
        <h1 className="text-4xl font-serif font-black tracking-tight text-emerald-900 flex items-center gap-3">
          <FiBriefcase className="text-emerald-700" />
          Job Recommendations
        </h1>
        <p className="font-mono text-xs tracking-widest text-emerald-700/70 uppercase mt-2">
          Curated opportunities based on your completed skills
        </p>
      </div>

      <div className="relative z-10">
        {loading && (
          <div className="text-emerald-800 font-mono text-sm tracking-widest uppercase">
            Analyzing skill profile and matching jobs...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-sm">
            <p className="text-red-700 font-mono text-sm uppercase tracking-widest">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && jobData && (
          <>
            <div className="mb-6 flex justify-between items-center bg-white border border-emerald-100 shadow-sm rounded-lg p-4">
              <span className="text-emerald-800 font-mono text-sm uppercase tracking-widest font-semibold">
                Total Matches Found: {jobData.total_matches}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobData.jobs.map((job) => (
                <div
                  key={job.job_id}
                  className="p-6 bg-white border border-emerald-100 rounded-xl transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:border-emerald-300 flex flex-col justify-between shadow-sm"
                >
                  {/* Confidence bar top */}
                  <div
                    className="absolute top-0 left-0 h-1.5 bg-emerald-500 transition-all duration-500 ease-in-out group-hover:bg-emerald-600"
                    style={{ width: `${job.confidence * 100}%` }}
                  />

                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase border border-emerald-200 px-2 py-1 bg-emerald-50 text-emerald-800 rounded">
                        {job.company_name}
                      </span>
                      <span className="font-mono text-[11px] font-semibold tracking-widest text-emerald-600 flex items-center gap-1 bg-emerald-50/50 px-2 py-1 rounded">
                        <FiPercent /> {job.confidence_pct} Match
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 group-hover:text-emerald-900 transition-colors">
                      {job.role}
                    </h3>

                    <div className="mb-4">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                        Required Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.job_skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono border border-slate-200 px-2 py-1 bg-slate-50 text-slate-600 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.job_skills.length > 4 && (
                          <span className="text-[10px] font-mono border border-slate-200 px-2 py-1 bg-slate-50 text-slate-500 rounded-md">
                            +{job.job_skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 border-2 border-emerald-600 text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300"
                  >
                    View Application <FiExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
