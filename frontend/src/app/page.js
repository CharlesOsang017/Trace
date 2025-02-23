"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LatestIssues from "@/components/latestIssues";

export default function Home() {
  // Sample analytics data
  const analyticsData = [
    { status: "Open", count: 10 },
    { status: "In Progress", count: 5 },
    { status: "Closed", count: 15 },
  ];

  // Sample latest issues data
  const issues = [
    { id: 1, title: "Fix login bug", status: "Open", assignedTo: "Alice" },
    {
      id: 2,
      title: "Update UI for dashboard",
      status: "In Progress",
      assignedTo: "Bob",
    },
    {
      id: 3,
      title: "Improve API performance",
      status: "Closed",
      assignedTo: "Charlie",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
    <div className="flex flex-col gap-6 py-3">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analyticsData.map((data) => (
          <Card key={data.status} className="p-4">
            <CardHeader>
              <CardTitle className="text-xl ">{data.status} issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Section */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Issue Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-64"></CardContent>
      </Card>
    </div>

      {/* Latest Issues Section */}
      <Card className="">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Latest Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 tracking-tight">
            {issues.map((issue) => (
              <LatestIssues key={issue.id} issue={issue} />
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
