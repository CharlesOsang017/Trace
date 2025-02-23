import React from "react";

const LatestIssues = ({ issue }) => {
  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div className="flex items-center gap-3 py-2">
        {/* Issue Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
          {/* Status Badge */}
          <span
            className={`px-3 py-1.5 text-sm font-medium rounded-full  ${
              issue.status === "Open"
                ? "bg-red-200 text-red-800"
                : issue.status === "In Progress"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {issue.status}
          </span>
        </div>
      </div>

      {/* Avatar */}
      {issue.assignedTo ? (
        <img
          src={issue.assignedTo}
          alt="avatar"
          className="w-8 h-8 rounded-full mb-6"
        />
      ) : (
        ""
      )}
    </li>
  );
};

export default LatestIssues;
