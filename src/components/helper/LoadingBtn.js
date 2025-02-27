import { Loader } from "lucide-react";
import { Button } from "../ui/button";

const LoadingBtn = ({ children, isLoading, ...props }) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader className="animate-spin mr-2" />}
      {children}
    </Button>
  );
};

export default LoadingBtn;
