import { SquarePen } from "lucide-react";
import useEditBlog from "../hooks/useEditBlog";
import useGetBlog from "../hooks/useGetBlog";
import { useLocation } from "react-router";
import { useEffect } from "react";
export default function EditBlog() {
  // this page is for editing existing blogs
  // change this variable to style all the input field design at once
  const input_style =
    "text-base px-4 md:w-2/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded  ";
  // this hook is used to get blogId from url
  const location = useLocation();
  // use of hook to edit blog
  const { editBlog } = useEditBlog();
  // use of hook to set older data in fields
  const { getBlog } = useGetBlog();
  // this function is called when user clicks
  async function handleSubmit(event) {
    // to prevent default page refresh
    event.preventDefault();
    // collect the form data and pass it to hook
    const formData = new FormData(document.querySelector("form"));
    // setting the blogId in formData for use in backend
    // get the pathname and split by "/"
    // this gives ["blog","edit","blogId"]
    // .pop() returns last element which is blogId
    formData.append("blogId", location.pathname.split("/").pop());
    await editBlog(formData);
  }
  // this is so that when page component mounts, user's older date is also fetched
  useEffect(() => {
    async function currentBlogData() {
      let data = await getBlog(location.pathname.split("/").pop());
      return data;
    }
    currentBlogData().then((data) => {
      document.getElementsByName("title")[0].value = data.title;
      document.getElementsByName("summary")[0].value = data.summary;
      document.getElementsByName("content")[0].value = data.content;
    });
  });
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <SquarePen size={40} strokeWidth={2} />
        Edit Blog
      </div>
      <hr className="w-full border-2" />
      <form className="flex flex-col gap-3 m-2" onSubmit={handleSubmit}>
        <div className="text-xl font-medium">Title</div>
        <textarea
          className={input_style}
          type="text"
          name="title"
          placeholder="Loading Title..."
        />
        <div className="text-xl font-medium">Summary</div>
        <textarea
          className={`${input_style} h-24`}
          type="text"
          name="summary"
          placeholder="Loading Summary..."
        />
        <div className="text-xl font-medium">Content</div>
        <textarea
          className={`${input_style} h-48`}
          type="text"
          name="content"
          placeholder="Loading Content..."
        />
        <div className="text-xl font-medium">Cover Image</div>
        <input
          className={input_style}
          type="file"
          name="coverImage"
          accept="image/*"
        />
        <br />
        <div className="flex gap-3">
          <input
            type="submit"
            value="Update"
            className="btn btn-ghost bg-neutral-400 md:w-1/4"
          />
        </div>
      </form>
      <br />
    </div>
  );
}
