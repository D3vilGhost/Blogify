import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function useEditBlog() {
  const navigate = useNavigate();
  // this hook is used when Editing existing blogs

  const editBlog = async (blogData) => {
    // do a contraint check on blogData
    const success = constraintCheckOnBlogData(blogData);
    if (!success) return;
    // set the loading toast
    const toastId = toast.loading("Updating Blog...");
    try {
      // call api to create blog
      const res = await fetch("/api/blog/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      // convert the response receive in json format
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // update the loading toast in case of no failue
      toast.update(toastId, {
        render: `Blog Updated successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      //  redirect to view blog
      return navigate(`/blog/view/${data.blogId}`);
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: `Error in useEditBlog: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { editBlog };
}

function constraintCheckOnBlogData(blogData) {
  const keys = Object.keys(blogData);
  // Empty value check
  keys.forEach((key) => {
    if (blogData[key] == "") {
      toast.error("Details Missing in some fields.");
      return false;
    }
  });
  // Title check
  if (blogData.title.length > 50) {
    toast.error("Title size too long");
    return false;
  }
  // Summary Check
  if (blogData.summary.length > 150) {
    toast.error("Summary size too long");
    return false;
  }

  return true;
}
