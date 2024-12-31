import { toast } from "react-toastify";
export default function useGetFeed() {
  const getFeed = async () => {
    const toastId = toast.loading("Loading Available Blogs...");
    try {
      // fetch the feeds
      const res = await fetch("/api/blog/feed");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // update the loading toast in case of no failue and return data;
      toast.dismiss(toastId);
      return data;
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: `Error in useGetFeed: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { getFeed };
}
