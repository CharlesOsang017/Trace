"use client";
import LoadingBtn from "@/components/helper/LoadingBtn";
import Loading from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MoveLeft, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const IssueDetails = () => {
  const router = useRouter();
  const { issueId } = useParams();
  const queryClient = useQueryClient();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignedTech, setAssignedTech] = useState("");

  // Fetch issue details
  const {
    data: issue,
    isPending,
    error,
  } = useQuery({
    queryKey: ["issueDetail", issueId], // Ensuring issueId is used in queryKey
    queryFn: async () =>
      await handleAuthRequest(async () => {
        const response = await axios.get(`${BASE_API_URL}/issues/${issueId}`, {
          withCredentials: true,
        });
        return response.data;
      }),
    onSuccess: (data) =>
      console.log("Issue details fetched successfully", data),
  });

  // console.log('issueDetail', issue?.assignedTo?._id);

  // Fetch technicians
  const { data: technicians } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () =>
      await handleAuthRequest(async () => {
        const response = await axios.get(`${BASE_API_URL}/users`, {
          withCredentials: true,
        });
        return response.data;
      }),
  });

  console.log();

  // Find selected technician
  const selectedTech = technicians?.find((t) => t._id === assignedTech);

  // Assign issue to technician (Ensuring correct req.body format)
  const { mutate: assignIssue, isPending: isAssigning } = useMutation({
    mutationFn: async () =>
      await handleAuthRequest(async () => {
        const response = await axios.post(
          `${BASE_API_URL}/issues/assign`,
          { issueId, technicianId: assignedTech }, // Using req.body
          { withCredentials: true }
        );
        return response.data;
      }),
    onSuccess: () => {
      toast.success("Issue assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      queryClient.invalidateQueries({ queryKey: ["issueDetail", issueId] }); // Ensure updated issue details
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Issue assignment failed");
    },
  });

  // Delete issue
  const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
    mutationFn: async () =>
      await handleAuthRequest(async () => {
        const response = await axios.delete(
          `${BASE_API_URL}/issues/delete/${issueId}`,
          { withCredentials: true }
        );
        return response.data;
      }),
    onSuccess: () => {
      toast.success("Issue deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      setIsDialogOpen(false);
      setTimeout(() => router.push("/issues"), 100);
    },
  });

  return (
    <>
      {isPending && <Loading />}
      {error && <p>Error: {error.message}</p>}
      {issue && (
        <div className="container mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Section: Issue Details */}
            <div className="md:col-span-2 p-6 rounded-lg">
              <div className="flex items-center gap-4">
                <MoveLeft
                  onClick={() => router.back()}
                  className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-ease duration-300"
                />
                <h1 className="text-2xl font-bold mb-2">{issue?.title}</h1>
              </div>
              <div className="flex gap-3 items-center">
                <div>
                  <p
                    className={`px-3 py-1 inline-block text-sm font-medium rounded-full ${
                      issue?.status === "open"
                        ? "bg-red-200 text-red-800"
                        : issue?.status === "in progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {issue?.status}
                  </p>
                </div>
                <div className="mb-2.5">
                  <p className="text-gray-600 mt-2 text-lg">
                    Opened on: {new Date(issue?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Card className="mt-10 py-3 px-2">
                <CardContent>
                  <p className="text-gray-700 mt-2 text-xl">
                    {issue?.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right Section: Assign Technician & Actions */}
            <div className="p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-3">
                {issue.assignedTo ? "Assigned to" : "Assign technician"}
              </h2>
              <div className="relative">
                {/* Technician Selection Dropdown */}
                {issue.assignedTo === null && (
                  <select
                    className="border p-2 w-full rounded-md mb-4"
                    value={assignedTech}
                    onChange={(e) => setAssignedTech(e.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {technicians?.map((tech) => (
                      <option key={tech._id} value={tech._id}>
                        {tech.name}
                      </option>
                    ))}
                  </select>
                )}

                {/* Display Selected Technician */}
                {issue.assignedTo && (
                  <div className="mt-2 mb-2 flex items-center gap-2 border p-2 rounded-md">
                    <img
                      src={issue.assignedTo.profileImg}
                      alt={issue.assignedTo.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{issue.assignedTo.name}</span>
                  </div>
                )}          

                {issue.assignedTo === null && selectedTech && (
                  <div className="mt-2 mb-2 flex items-center gap-2 border p-2 rounded-md">
                    <img
                      src={selectedTech.profileImg}
                      alt={selectedTech.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{selectedTech.name}</span>
                  </div>
                )}

                {/* Assign Button */}
                {!issue.assignedTo && (
                  <button onClick={() => assignIssue()} className="w-full">
                    <LoadingBtn
                      isLoading={isAssigning}
                      disabled={!assignedTech || isAssigning}
                      size="lg"
                      type="submit"
                      className="text-white px-4 py-2 rounded-md w-full mt-2 mb-3 disabled:bg-gray-300"
                    >
                      {isAssigning ? "Assigning..." : "Assign"}
                    </LoadingBtn>
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-col gap-y-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Link
                    href={`/issues/edit/${issue._id}`}
                    className="flex items-center gap-2"
                  >
                    <SquarePen size={18} /> Update
                  </Link>
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
                      Are you sure you want to delete this issue? This action
                      cannot be undone.
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <LoadingBtn
                        isLoading={isDeleting}
                        variant="destructive"
                        size="lg"
                        type="submit"
                        onClick={() => deleteIssue()}
                      >
                        Confirm Delete
                      </LoadingBtn>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IssueDetails;
