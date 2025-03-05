import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <Loader className="w-8 h-8 animate-spin" />
      <span className="ml-2 text-sm font-semibold leading-none tracking-tight">
        Loading...
      </span>
    </div>
  );
};

export default Loading;
