"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { SquarePenIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const IssueDetails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample issue data
  const issue = {
    id: 1,
    title: "Fix Navbar Bug",
    status: "Open",
    createdAt: "2024-02-20",
    description:
      "The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices. The navigation bar is not responsive on mobile devices ",
  };

  // Sample technicians list
  const technicians = ["John Doe", "Jane Smith", "Alice Johnson", "Mike Brown"];

  const [assignedTech, setAssignedTech] = useState("");

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Section: Issue Details */}
        <div className="md:col-span-2 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">{issue.title}</h1>
          <div className="flex gap-3 items-center">
            <div>
              <p
                className={`px-3 py-1 inline-block text-sm font-medium rounded-full ${
                  issue.status === "Open"
                    ? "bg-red-200 text-red-800"
                    : "bg-green-200 text-green-800"
                }`}
              >
                {issue.status}
              </p>
            </div>
            <div className="mb-2.5">
              <p className="text-gray-600 mt-2 text-lg">
                Opened on: {issue.createdAt}
              </p>
            </div>
          </div>

          <Card className="mt-10 py-3 px-2">
            <CardContent>
              <p className="text-gray-700 mt-2 text-xl">{issue.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Assign Technician & Actions */}
        <div className="p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Assign</h2>
          <select
            className="border p-2 w-full rounded-md mb-4"
            value={assignedTech}
            onChange={(e) => setAssignedTech(e.target.value)}
          >
            <option value=""></option>
            {technicians.map((tech, index) => (
              <option key={index} value={tech}>
                {tech}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-y-4">
            <Button variant="outline" className="flex items-center gap-2">
              <SquarePen size={18} /> Update
            </Button>

            {/* Delete Button with Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 size={18} /> Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this issue? This action cannot
                  be undone.
                </DialogDescription>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => console.log("Issue deleted")}
                  >
                    Confirm Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
