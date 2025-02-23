import React from 'react'

const LatestIssues = ({issue}) => {
  return (
    <>
        <li
                key={issue.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h3 className="text-lg font-semibold">{issue.title}</h3>
                  <p className="text-sm text-gray-500">
                    Assigned to: {issue.assignedTo}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    issue.status === "Open"
                      ? "bg-red-200 text-red-800"
                      : issue.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {issue.status}
                </span>
              </li>
    </>
  )
}

export default LatestIssues