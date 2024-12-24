import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function useCreateBlog() {
  const navigate = useNavigate();
  // this hook is used when creating new blogs

  const createBlog = async (blogData) => {
    // do a contraint check on blogData
    const success = constraintCheckOnBlogData(blogData);
    if (!success) return;
    // set the loading toast
    const toastId = toast.loading("Creating Blog...");
    try {
      // call api to create blog
      const res = await fetch("/api/blog/create", {
        method: "POST",
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
        render: `Blog created successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      //  redirect to view blog
      return navigate(`/blog/view/${data.blogId}`);
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: `Error in useCreateBlog: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { createBlog };
}

function constraintCheckOnBlogData(blogData) {
  try {
    const keys = Object.keys(blogData);
    // Empty value check
    keys.forEach((key) => {
      if (blogData[key] == "") {
        throw new Error("Fill details in all the fields.");
      }
    });
    // Title check
    if (blogData.title.length > 50) {
      throw new Error("Title is too long.");
    }
    // Summary Check
    if (blogData.summary.length > 100) {
      throw new Error("Summary is too long.");
    }
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}
