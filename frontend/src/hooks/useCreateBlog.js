import { toast } from "react-toastify";
import { useNavigate } from "react-router";
export default function useCreateBlog() {
  const navigate = useNavigate();
  // this hook is used when creating new blogs
  const createBlog = async (formData) => {
    // do a contraint check on formData
    const success = constraintCheckOnBlogData(formData);
    if (!success) return;
    // set the loading toast
    const toastId = toast.loading("Creating Blog...");
    try {
      // call api to create blog
      // no headers are set as data type is formData
      // it automatically set Content-Type to "multipart/form-data"
      const res = await fetch("/api/blog/create", {
        method: "POST",
        body: formData,
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

function constraintCheckOnBlogData(formData) {
  try {
    const blogData = Object.fromEntries(formData.entries());
    const keys = Object.keys(blogData);
    // Empty value check
    keys.forEach((key) => {
      if (key != "coverImage" && blogData[key] == "") {
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
    // File Availablity check
    if (!blogData.coverImage.name) {
      throw new Error("No Cover Image Available");
    }
    // fileType = Image check
    const fileName = blogData.coverImage.name;
    const fileExtension = fileName.substr(
      fileName.lastIndexOf("."),
      fileName.length
    );
    if (
      fileExtension != ".jpg" &&
      fileExtension != ".jpeg" &&
      fileExtension != ".png"
    ) {
      throw new Error("Upload Only PNG/JPG/JPEG files");
    }
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
}
