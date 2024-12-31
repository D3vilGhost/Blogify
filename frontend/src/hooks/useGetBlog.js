import { toast } from "react-toastify";
export default function useGetBlog() {
  const getBlog = async (blogId) => {
    // set the loading toast
    const toastId = toast.loading("Loading Blog...");
    try {
      // call api to create blog
      const res = await fetch(`/api/blog/${blogId}`);
      // convert the response receive in json format
      const blogData = await res.json();
      if (blogData.error) {
        throw new Error(blogData.error);
      }
      // dismiss the loading toast in case of no failue
      toast.dismiss(toastId);
      // return data to be rendered
      return blogData;
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { getBlog };
}
