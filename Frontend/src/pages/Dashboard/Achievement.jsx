import React from "react";

const favoriteBadges = [
  {
    id: 1,
    title: "Web Dev Bootcamp",
    date: "Jan 5, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg",
  },
  {
    id: 2,
    title: "React Mastery",
    date: "Feb 10, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    id: 3,
    title: "Node.js Developer",
    date: "Mar 12, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  },
];

const allBadges = [
  {
    id: 4,
    title: "Frontend Specialist",
    date: "Apr 20, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg",
  },
  {
    id: 5,
    title: "Backend Engineer",
    date: "May 15, 2025",
    img: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
  },
  {
    id: 6,
    title: "Database Pro",
    date: "Jun 1, 2025",
    img: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
  },
  {
    id: 7,
    title: "Git & GitHub Expert",
    date: "Jul 10, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
  },
  {
    id: 8,
    title: "UI/UX Enthusiast",
    date: "Aug 25, 2025",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
];

export default function Achievement() {
  return (
    <div className="h-full bg-white px-8 py-10">
      {/* Favorite Badges Section */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Favorite Badges</h1>
        <div className="flex flex-wrap gap-6">
          {favoriteBadges.map((badge) => (
            <div
              key={badge.id}
              className="w-36 flex flex-col items-center bg-white border rounded-xl shadow-sm hover:shadow-md transition p-3"
            >
              <img
                src={badge.img}
                alt={badge.title}
                className="w-20 h-20 object-contain rounded-full mb-2"
              />
              <p className="text-sm font-medium text-center">{badge.title}</p>
              <p className="text-xs text-gray-500 mt-1">{badge.date}</p>
            </div>
          ))}

          {/* Add badge placeholders */}
          <div className="w-36 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
            + Add a badge
          </div>
          <div className="w-36 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
            + Add a badge
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-gray-300" />

      {/* All Badges Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Badges</h2>
          <button className="text-sm text-blue-600 font-medium hover:underline">
            Sort by ↑↓
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {allBadges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center bg-white border rounded-xl shadow-sm hover:shadow-md transition p-3"
            >
              <img
                src={badge.img}
                alt={badge.title}
                className="w-20 h-20 object-contain rounded-full mb-2"
              />
              <p className="text-sm font-medium text-center">{badge.title}</p>
              <p className="text-xs text-gray-500 mt-1">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
