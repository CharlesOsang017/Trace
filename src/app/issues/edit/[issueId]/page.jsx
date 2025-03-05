"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import LoadingBtn from "@/components/helper/LoadingBtn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { toast } from "sonner";
import axios from "axios";

// Dynamically import SimpleMDE to prevent SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Ensure it's client-side only
  loading: () => <p>Loading editor...</p>, // Prevent chunk errors
});

const EditIssue = () => {
  const { issueId } = useParams(); // ✅ Fix useParams
  const router = useRouter();
  const queryClient = useQueryClient();

  // State for form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Fetch the issue data
  const { data: issue, isLoading } = useQuery({
    queryKey: ["issue", issueId],
    queryFn: async () => {
      const response = await axios.get(`${BASE_API_URL}/issues/${issueId}`, {
        withCredentials: true,
      });
      return response.data;
    },
    onError: () => {
      toast.error("Failed to load issue details");
    },
  });

  // Populate form data when issue data is fetched
  useEffect(() => {
    if (issue) {
      setFormData({
        title: issue.title || "",
        description: issue.description || "",
      });
    }
  }, [issue]);

  // Mutation for updating the issue
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return handleAuthRequest(async () => {
        const response = await axios.put(
          `${BASE_API_URL}/issues/update/${issueId}`,
          formData,
          {
            withCredentials: true,
          }
        );
        return response.data;
      });
    },
    onSuccess: () => {
      toast.success("Issue updated successfully");
      queryClient.invalidateQueries(["issue", issueId]);
      router.push("/issues");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Issue update failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading) return <p>Loading issue details...</p>;

  return (
    <div className="md:px-20 px-2.5 py-10 md:max-w-6xl w-full">
      <h1 className="text-2xl font-bold mb-4">Update Issue</h1>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <label className="block text-lg font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          name="title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded-md mb-8"
          placeholder="Enter issue title..."
          required
        />

        {/* Description Input */}
        <label className="block text-lg font-medium mb-2">Description</label>
        <SimpleMDE
          value={formData.description}
          name="description"
          onChange={(value) => setFormData({ ...formData, description: value })}
          className="w-full p-2 border rounded-md mb-4"
        />

        {/* Submit Button */}
        <LoadingBtn
          isLoading={isPending}
          size="lg"
          type="submit"
          className="w-full mt-4"
        >
          {isPending ? "Updating..." : "Update Issue"}
        </LoadingBtn>
      </form>
    </div>
  );
};

export default EditIssue;
