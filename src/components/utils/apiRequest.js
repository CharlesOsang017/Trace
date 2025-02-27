import { toast } from "sonner";

export const handleAuthRequest = async (requestCallback, setLoading) => {
  if (setLoading) setLoading(true);
  try {
    const response = await requestCallback();
    return response;
  } catch (error) {
    const axiosError = error;
    console.log(error);
    if (axiosError?.response?.data?.message) {
      console.log(axiosError.response.data.message);
      toast.error(axiosError?.response?.data?.message);
    } 
  } finally {
    if (setLoading) setLoading(false);
  }
};
