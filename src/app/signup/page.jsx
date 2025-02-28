"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import LoadingBtn from "@/components/helper/LoadingBtn";
import { BASE_API_URL } from "@/server";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${BASE_API_URL}/users/register`,
        formData,
        { withCredentials: true }
      );
      return response.data; // Ensure the response is returned
    },
    onSuccess: () => {
      toast.success("User registered successfully");
      router.push("/login"); // Redirect to login page
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex md:h-screen items-center">
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="https://png.pngtree.com/png-vector/20241204/ourmid/pngtree-find-bugs-on-programming-computer-icon-png-image_14568602.png"
          alt="Bug illustration"
          className="w-full h-full object-cover bg-white"
        />
      </div>
      <div className="md:w-1/2 w-full flex mt-4 p-8 h-screen">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <Bug size={50} /> <p className="text-3xl font-bold">Trace</p>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-4"
            />

            <LoadingBtn
              isLoading={isLoading}
              size="lg"
              type="submit"
              className="w-full mt-4"
            >
              Register now
            </LoadingBtn>

            {isError && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>

          <small className="mt-4 block text-lg">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
