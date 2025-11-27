"use client";

import Image from "next/image";
import { useState } from "react";
import CompanySearch from "@/components/CompanySearch";
import SearchResults from "@/components/SearchResults";

const mockCompanies: any = {
  "coca-cola.com": { name: "The Coca-Cola Company", logo: "/coca-cola.png", founded: "1892", location: "Atlanta, Georgia", size: "10,001+ employees", industry: "Food & Beverages", narrative: "Fizzing since 1886. Secret formula in a vault. Polar bears love it." },
  "fordmodels.com": { name: "Ford Models", logo: "/fordmodels.png", founded: "1946", location: "New York, NY", size: "51–200 employees", industry: "Modeling", narrative: "Discovered supermodels before the word existed." },
  "unitedtalent.com": { name: "United Talent Agency", logo: "/uta.png", founded: "1991", location: "Beverly Hills, CA", size: "1,001–5,000 employees", industry: "Entertainment", narrative: "They rep the people who play make-believe for a living." },
  "wilhelmina.com": { name: "Wilhelmina Models", logo: "/wilhelmina.png", founded: "1967", location: "New York, NY", size: "201–500 employees", industry: "Fashion", narrative: "Home of the original supermodels." },
  "nfl.com": { name: "National Football League", logo: "/nfl.png", founded: "1920", location: "New York, NY", size: "1,001–5,000 employees", industry: "Sports", narrative: "Where grown men chase a ball for billions on Sundays." },
};

const mockResults = [
  { first_name: "John", last_name: "Smith", email: "john.smith@coca-cola.com", position: "VP Marketing", department: "Marketing" },
  { first_name: "Sarah", last_name: "Connor", email: "sarah.connor@coca-cola.com", position: "Director of Sales", department: "Sales" },
  { first_name: "Mike", last_name: "Chen", email: "mike.chen@coca-cola.com", position: "Head of Design", department: "Creative" },
];

export default function Home() {
  const [company, setCompany] = useState<any>(null);

  const handleTestSearch = (domain: string) => {
    setCompany(mockCompanies[domain] || mockCompanies["coca-cola.com"]);
  };

  return (
    <main className="min-h-screen px-8 py-12 max-w-screen-2xl mx-auto">
      <div className="flex items-start justify-between mb-12">
        <Image src="/novahunt-logo.svg" alt="NovaHunt" width={280} height={80} className="select-none" priority />
        <div className="flex items-center gap-8 text-sm font-medium">
          <a href="/" className="hover:underline underline-offset-4">Home</a>
          <a href="/plans" className="hover:underline underline-offset-4">Plans</a>
          <a href="/about" className="hover:underline underline-offset-4">About</a>
          <a href="/signin" className="hover:underline underline-offset-4">Sign In</a>
          <a href="/signup" className="hover:underline underline-offset-4 textnova-500 font-semibold">Sign Up</a>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-96">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Find business emails</h3>
            <CompanySearch />
          </div>
        </div>

        <div className="flex-1 max-w-5xl">
          {company ? (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-8 py-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-900">{company.name}</h2>
                  <Image src={company.logo} alt={company.name} width={140} height={140} className="rounded-xl shadow-md -mt-20 translate-y-8" />
                </div>
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium text-gray-600">Founded</span><p className="font-semibold">{company.founded}</p></div>
                    <div><span className="font-medium text-gray-600">Location</span><p className="font-semibold">{company.location}</p></div>
                    <div><span className="font-medium text-gray-600">Employees</span><p className="font-semibold">{company.size}</p></div>
                    <div><span className="font-medium text-gray-600">Industry</span><p className="font-semibold">{company.industry}</p></div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                    <p className="text-gray-700 leading-relaxed italic">{company.narrative}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Take it for a test ride?</p>
                    <div className="flex flex-wrap gap-3">
                      {["coca-cola.com","fordmodels.com","unitedtalent.com","wilhelmina.com","nfl.com"].map(d=>(
                        <button key={d} onClick={()=>handleTestSearch(d)} className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition">
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 -mx-8">
                <SearchResults results={mockResults} />
              </div>
            </div>
          ) : (
            <div className="text-center py-32 text-xl text-gray-500">Click any test domain →</div>
          )}
        </div>
      </div>
    </main>
  );
}
