"use client";

import React, { useState } from "react";

const Issues = () => {
  const [filter, setFilter] = useState("All");

  // Sample issues data
  const issues = [
    { id: 1, title: "Fix Navbar Bug", status: "Open", createdAt: "2024-02-20" },
    {
      id: 2,
      title: "Improve Dashboard UI",
      status: "In Progress",
      createdAt: "2024-02-18",
    },
    {
      id: 3,
      title: "Database Migration",
      status: "Closed",
      createdAt: "2024-02-15",
    },
  ];

  // Filter issues based on selected status
  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((issue) => issue.status === filter);

  return (
    <div className="p-6">
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="text-lg font-semibold mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="border p-2 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Issues Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">Issue</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-100">
                <td className="border p-3">{issue.title}</td>
                <td
                  className={`border p-3 font-semibold ${
                    issue.status === "Open"
                      ? "text-red-600"
                      : issue.status === "In Progress"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {issue.status}
                </td>
                <td className="border p-3">{issue.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issues;
