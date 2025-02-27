"use client";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import TextareaAutosize from "react-textarea-autosize";

const NewIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="md:px-20 px-2.5 py-10 md:max-w-6xl w-full">
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
      <SimpleMDE
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
