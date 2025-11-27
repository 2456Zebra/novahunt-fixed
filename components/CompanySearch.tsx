"use client";

export default function CompanySearch() {
  return (
    <input
      type="text"
      placeholder="Enter company domain (e.g. coca-cola.com)"
      className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const domain = (e.target as HTMLInputElement).value.trim();
          if (domain) {
            window.location.href = `/?domain=${domain}`;
          }
        }
      }}
    />
  );
}
