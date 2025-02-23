import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
