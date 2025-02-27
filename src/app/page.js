"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LatestIssues from "@/components/latestIssues";
// import { Bar } from "react-chartjs-2";
import { Bar, BarChart, Tooltip, ResponsiveContainer, YAxis, XAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // Sample analytics data
  const analyticsData = [
    { status: "Open", count: 10 },
    { status: "In Progress", count: 5 },
    { status: "Closed", count: 15 },
  ];

  const { data: issuesList, isPending} = useQuery({
    queryKey: ["issuesL"],
    queryFn: async () => {
      const response = await fetch(`${BASE_API_URL}/issues`);
      const data = await response.json();
      return data;
    },
  })
  // Sample latest issues data
  const issues = [
    {
      id: 1,
      title: "Fix login bug",
      status: "Open",
      assignedTo: "https://i.pravatar.cc/160",
    },
    {
      id: 2,
      title: "Update UI for dashboard",
      status: "In Progress",
      assignedTo: "https://i.pravatar.cc/150",
    },
    {
      id: 3,
      title: "Improve API performance",
      status: "Closed",
      // assignedTo: "Charlie",
    },
    {
      id: 4,
      title: "Update UI for dashboard",
      status: "In Progress",
      assignedTo: "https://i.pravatar.cc/200",
    },
    {
      id: 5,
      title: "Improve API performance",
      status: "Closed",
      // assignedTo: "Charlie",
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
        <Card className="py-4">
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData} className="w-full">
                <YAxis dataKey="count" />
                <XAxis dataKey="status" />

                <Bar dataKey="count" />

                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
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
