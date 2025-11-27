"use client";

import { useState } from "react";

export default function SearchResults({ results }) {
  const [revealed, setRevealed] = useState(new Set());

  if (!results || results.length === 0) return null;

  const grouped = results.reduce((acc, r) => {
    const dept = r.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([dept, items]) => (
        <div key={dept}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {dept} ({items.length})
          </h3>
          <div className="space-y-3">
            {items.map((r) => (
              <div key={r.email} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg text-sm">
                <div className="font-mono italic text-gray-700">
                  {revealed.has(r.email) ? r.email : `${r.email.split("@")[0].slice(0,4)}•••••@${r.email.split("@")[1]}`}
                  <span className="ml-3 text-gray-500">• {r.position}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => window.open(`https://google.com/search?q=${r.first_name}+${r.last_name}+site:linkedin.com`, "_blank")} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    Source
                  </button>
                  <button onClick={() => setRevealed(s => {
                    const n = new Set(s);
                    n.has(r.email) ? n.delete(r.email) : n.add(r.email);
                    return n;
                  })} className="text-xs font-medium text-blue-600">
                    {revealed.has(r.email) ? "Hide" : "Reveal"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
