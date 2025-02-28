import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loading;
