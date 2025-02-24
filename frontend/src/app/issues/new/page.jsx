"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";

const NewIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="px-20 py-10 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">New Issue</h1>

      <label className="block text-lg font-medium mb-2">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded-md mb-8"
        placeholder="Enter issue title..."
      />

      <label className="block text-lg font-medium mb-2">Description</label>
      <TextareaAutosize
        minRows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter issue description..."
      />
    </div>
  );
};

export default NewIssue;
