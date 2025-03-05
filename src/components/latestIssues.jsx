import Link from "next/link";
import React from "react";

const LatestIssues = ({ issue, isPending }) => {
  if (isPending) return <div>Loading...</div>;
  
  

  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div className="flex items-center gap-3 py-2">
        {/* Issue Details */}
        <div>
          <Link
            href={`/issues/${issue?._id}`}
            className="cursor-pointer hover:underline"
          >
            <h3 className="text-lg font-semibold mb-2">
              {issue?.title || "Untitled Issue"}
            </h3>
          </Link>
          {/* Status Badge */}
          <span
            className={`px-3 py-1.5 text-sm font-medium rounded-full ${
              issue?.status === "open"
                ? "bg-red-200 text-red-800"
                : issue?.status === "in progress"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {issue?.status || "Unknown Status"}
          </span>
        </div>
      </div>

      {/* Avatar */}
      {issue?.assignedTo?.profileImg && (
        <img
          src={issue.assignedTo.profileImg}
          alt="Technician Avatar"
          className="w-8 h-8 rounded-full mb-6"
        />
      )}
    </li>
  );
};

export default LatestIssues;
