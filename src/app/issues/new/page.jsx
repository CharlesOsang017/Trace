"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import LoadingBtn from "@/components/helper/LoadingBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { toast } from "sonner";
import axios from "axios";

// Dynamically import SimpleMDE to prevent SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false, // Ensure it's client-side only
  loading: () => <p>Loading editor...</p>, // Prevent chunk errors
});

const NewIssue = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return handleAuthRequest(async () => {
        const response = await axios.post(
          `${BASE_API_URL}/issues/create`,
          formData,
          {
            withCredentials: true,
          }
        );
        return response.data;
      }, setLoading);
    },
    onSuccess: () => {
      toast.success("Issue created successfully");
      queryClient.invalidateQueries("issues");
      router.push("/issues");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Issue creation failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    mutate(formData);
  };

  return (
    <div className="md:px-20 px-2.5 py-10 md:max-w-6xl w-full">
      <h1 className="text-2xl font-bold mb-4">New Issue</h1>

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
          {isPending ? "Creating..." : "Create Issue"}
        </LoadingBtn>
      </form>
    </div>
  );
};

export default NewIssue;
