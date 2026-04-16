import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";

export default function Achievement() {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch(
          `https://career-counsellor-ha78.onrender.com/badges/${user.user_id}`,
        );
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
    <div className="p-10 max-w-7xl mx-auto h-full bg-[#0a0a0a]">
      <div className="border-b-2 border-neutral-800 pb-4 mb-8">
        <h1 className="text-4xl font-serif font-black tracking-tight text-white">
          Credentials & Badges
        </h1>
        <p className="font-mono text-xs tracking-widest text-gray-500 uppercase mt-2">
          Your validated operative skills and achievements
        </p>
      </div>

      {loading ? (
        <div className="text-center font-mono text-sm uppercase tracking-widest text-gray-500 py-20">
          Loading Credentials...
        </div>
      ) : (
        <div>
          {badges.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-[#444] text-center bg-black">
              <p className="font-serif text-xl font-bold text-gray-400 mb-2">
                No Credentials Acquired Yet
              </p>
              <p className="font-sans text-sm text-gray-500">
                Complete phase operations and validate your skills to earn
                credentials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="p-6 bg-black border border-neutral-800 flex flex-col items-center justify-center text-center hover:bg-black hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center border-2 border-neutral-800 rounded-full group-hover:border-white transition-colors duration-300 bg-black">
                    <img
                      src={badgeIconUrl}
                      alt="Badge Icon"
                      className="w-8 h-8 opacity-80"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-1 leading-tight group-hover:text-white text-white">
                    {badge.name}
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400 group-hover:text-gray-300 mt-2">
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
