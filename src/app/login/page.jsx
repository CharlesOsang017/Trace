"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Bug } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleAuthRequest } from "@/components/utils/apiRequest";
import { set } from "react-hook-form";
import LoadingBtn from "@/components/helper/LoadingBtn";
import { BASE_API_URL } from "@/server";

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: async (formData) => {
      return handleAuthRequest(async () => {
        const response = await axios.post(`${BASE_API_URL}/users/login`, formData, {
          withCredentials: true, // Ensure cookies are stored
        });
  
  
        return response;
      }, setIsLoading);
    },
    onSuccess: () => {
      toast.success("User logged in successfully");
      queryClient.invalidateQueries(["user"]); // Refresh user data
      router.push("/");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed.");
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="https://png.pngtree.com/png-vector/20241204/ourmid/pngtree-find-bugs-on-programming-computer-icon-png-image_14568602.png"
          alt=""
          className="w-full h-full object-cover bg-white"
        />
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 h-screen ">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <Bug size={50} /> <p className="text-3xl font-bold">Trace</p>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded-md mb-4"
            />

            <LoadingBtn
              isLoading={isPending}
              size="lg"
              type="submit"
              className="w-full mt-4"
            >
              Login now
            </LoadingBtn>
            {isError && <p className="text-red-500 mt-2">{error.message}</p>}
          </form>
          <small className="mt-4 block text-lg">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>{" "}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
