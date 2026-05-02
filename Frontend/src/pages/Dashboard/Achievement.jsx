import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

export default function Achievement() {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/badges/${user.user_id}`);
        const data = await res.json();
        setBadges(data);
      } catch (err) {
        console.error("Error fetching badges:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.user_id) fetchBadges();
  }, [user]);

  // Use a generic placeholder icon for badges since we have no images in db
  const badgeIconUrl = "https://cdn-icons-png.flaticon.com/512/616/616490.png";

  return (
    <div className="relative p-10 max-w-7xl mx-auto min-h-full bg-slate-50 overflow-hidden bg-square-pattern">
      <div className="relative z-10 border-b-2 border-emerald-100 pb-4 mb-8">
        <h1 className="text-4xl font-serif font-black tracking-tight text-emerald-900">
          Credentials & Badges
        </h1>
        <p className="font-mono text-xs tracking-widest text-emerald-700/70 uppercase mt-2">
          Your validated operative skills and achievements
        </p>
      </div>

      {loading ? (
        <div className="relative z-10 text-center font-mono text-sm uppercase tracking-widest text-slate-500 py-20">
          Loading Credentials...
        </div>
      ) : (
        <div className="relative z-10">
          {badges.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-emerald-200 text-center bg-white rounded-xl shadow-sm">
              <p className="font-serif text-xl font-bold text-emerald-800 mb-2">
                No Credentials Acquired Yet
              </p>
              <p className="font-sans text-sm text-slate-500">
                Complete phase operations and validate your skills to earn
                credentials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-emerald-100 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group rounded-xl shadow-sm"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center border-2 border-emerald-100 rounded-full group-hover:border-emerald-500 transition-colors duration-300 bg-emerald-50">
                    <img
                      src={badgeIconUrl}
                      alt="Badge Icon"
                      className="w-8 h-8 opacity-80 filter drop-shadow-sm brightness-0 invert"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(35%) sepia(50%) saturate(700%) hue-rotate(120deg) brightness(90%) contrast(90%)",
                      }}
                    />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-1 leading-tight text-slate-800 group-hover:text-emerald-900">
                    {badge.name}
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mt-2">
                    {new Date(badge.earned_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
