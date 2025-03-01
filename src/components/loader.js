import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-24">
      <Loader className="w-14 h-14 animate-spin" />
    </div>
  );
};

export default Loading;
