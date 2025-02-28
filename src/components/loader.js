import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <Loader className="w-12 h-12 animate-spin" />
    </div>
  );
};

export default Loading;
