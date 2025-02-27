"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "../../../server";

const Issues = () => {
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: issuesList = [], // Default to empty array to prevent errors
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      return handleAuthRequest(async () => {
        const response = await axios.get(`${BASE_API_URL}/issues/all`, {
          withCredentials: true,
        });
        return response.data; // Ensure we return the data
      }, setIsLoading);
    },
  });

  console.log("issuesList", issuesList);

  const filteredIssues = (issuesList || []).filter(
    (issue) => filter === "All" || issue.status === filter
  );

  return (
    <div className="p-6 py-20">
      {/* Filter Dropdown & New Issue Button */}
      <div className="flex items-center justify-between mb-4">
        <div>
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

        <Link href="/issues/new">
          <Button className="bg-purple-600 hover:bg-purple-800">
            New Issue
          </Button>
        </Link>
      </div>

      {/* Loading & Error States */}
      {isPending && <p className="text-center py-4">Loading issues...</p>}
      {isError && (
        <p className="text-center py-4 text-red-600">
          Failed to load issues. {error?.message || "Try again later."}
        </p>
      )}

      {/* Issues Table */}
      {!isPending && !isError && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Issue</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
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
                    <td className="border p-3">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border p-3 text-center">
                    No issues found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Issues;
