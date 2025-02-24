"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <label className="block text-lg font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <label className="block text-lg font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />

          <button className="w-full p-2 bg-blue-500 text-white rounded-md">
            Login
          </button>
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
