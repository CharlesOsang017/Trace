"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LatestIssues from "@/components/latestIssues";
import {
  Bar,
  BarChart,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import LoadingBtn from "@/components/helper/LoadingBtn";
import Loading from "@/components/loader";

export default function Home() {
  // State to hold analytics data
  const [analyticsData, setAnalyticsData] = useState([
    { status: "open", count: 0 },
    { status: "in progress", count: 0 },
    { status: "closed", count: 0 },
  ]);

  // Fetch issues from API
  const { data: issues, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: () =>
      handleAuthRequest(async () => {
        const response = await axios.get(`${BASE_API_URL}/issues`, {
          withCredentials: true,
        });
        return response.data;
      }),
  });

  // console.log("issues", issues);

  const { data: allIssues = [], isPending: allIssuesPending } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_API_URL}/issues/all`, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  console.log("issueList", allIssues);
  // Update analytics data when issues change
  useEffect(() => {
    if (allIssues && Array.isArray(allIssues)) {
      const openCount = allIssues.filter(
        (issue) => issue.status === "open"
      ).length;
      const inProgressCount = allIssues.filter(
        (issue) => issue.status === "in progress"
      ).length;
      const closedCount = allIssues.filter(
        (issue) => issue.status === "closed"
      ).length;

      setAnalyticsData([
        { status: "open", count: openCount },
        { status: "in progress", count: inProgressCount },
        { status: "closed", count: closedCount },
      ]);
    }
  }, [allIssues]);

  return (
    <>
      {isLoading && allIssuesPending ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col gap-6 py-3">
            {/* Status Count Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analyticsData.map((data) => (
                <Card key={data.status} className="p-4">
                  <CardHeader>
                    <CardTitle className="text-lg tracking-tighter">
                      {data.status} Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Analytics Bar Chart */}
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
          {/* {allIssuesPending && <Loading />} */}
          <Card className="">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Latest Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 tracking-tight">
                {Array.isArray(issues) ? (
                  issues.map((issue) => (
                    <LatestIssues
                      key={issue._id}
                      issue={issue}
                      isPending={isLoading}
                    />
                  ))
                ) : (
                  <p>No Latest issues found</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
