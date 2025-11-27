"use client";

import { useState } from "react";

export default function SearchResults({ results }: { results: any[] }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  if (!results.length === 0) return null;

  const grouped = results.reduce((acc, r) => {
    const dept = r.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(r);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([dept, items]) => (
        <div key={dept}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {dept} <span className="text-sm font-normal text-gray-500">({items.length})</span>
          </h3>
          <div className="space-y-3">
            {items.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-sm">
                <div className="flex-1 font-mono text-gray-700 text-sm italic">
                  {revealed.has(r.email) ? r.email : `${r.email.split('@')[0].slice(0,4)}•••••@${r.email.split('@')[1]}`}
                  <span className="ml-3 text-gray-500">• {r.position}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => window.open(`https://www.google.com/search?q=site:linkedin.com/in+${r.first_name}+${r.last_name}`, "_blank")} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                    Source
                  </button>
                  <button onClick={() => setRevealed(s => {
                    const n = new Set(s);
                    n.has(r.email) ? n.delete(r.email) : n.add(r.email);
                    return n;
                  })} className="text-xs font-medium text-blue-600 hover:text-blue-700">
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
