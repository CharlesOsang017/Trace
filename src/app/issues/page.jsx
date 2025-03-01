"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import Loading from "@/components/loader";

const Issues = () => {
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 5;

  const {
    data: issuesList = [],
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
        return response.data;
      }, setIsLoading);
    },
  });

  const filteredIssues = (issuesList || []).filter(
    (issue) => filter === "All" || issue.status === filter
  );

  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);
  const paginatedIssues = filteredIssues.slice(
    (currentPage - 1) * issuesPerPage,
    currentPage * issuesPerPage
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
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <Link href="/issues/new">
          <Button className="bg-purple-600 hover:bg-purple-800">
            New Issue
          </Button>
        </Link>
      </div>

      {/* Loading & Error States */}
      {isPending && <Loading />}
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
              {paginatedIssues.length > 0 ? (
                paginatedIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-100">
                    <td className="border p-3">{issue.title}</td>
                    <td
                      className={`border p-3 font-semibold ${
                        issue.status === "open"
                          ? "text-red-600"
                          : issue.status === "in progress"
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="px-4 py-2 border rounded-md">
                {currentPage} / {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Issues;
