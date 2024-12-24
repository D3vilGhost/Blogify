import { FilePlus } from "lucide-react";
import { useState } from "react";
import useCreateBlog from "../hooks/useCreateBlog";
import useAuthContext from "../context/useAuthContext";
export default function CreateNewBlog() {
  // this Page is for creating new blogs
  // here change this variable to style all the input field design at once
  const input_style =
    "text-base px-4 md:w-2/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded  ";
  // authUser context required to pass author of blog
  const { authUser } = useAuthContext();
  // state variables to store data of form
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    content: "",
    // image:"",
    author: authUser.username,
  });
  // use of hook to create blog
  const { createBlog } = useCreateBlog();
  // this function is called when user clicks submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog(blogData);
  };
  // main component logic
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <FilePlus size={40} strokeWidth={2} />
        Create New Blog
      </div>
      <hr className="w-full border-2" />
      <div className="flex flex-col gap-3 m-2">
        <div className="text-xl font-medium">Title</div>
        {/* input field for title */}
        <textarea
          className={input_style}
          type="text"
          placeholder="Title for your blog."
          value={blogData.title}
          onChange={(e) => {
            setBlogData({ ...blogData, title: e.target.value });
          }}
        />
        <div className="text-xl font-medium">Summary</div>
        {/* input field for summary */}
        <textarea
          className={`${input_style} h-24`}
          type="text"
          placeholder="A visually appealing summary for each blog in the feed."
          value={blogData.summary}
          onChange={(e) => {
            setBlogData({ ...blogData, summary: e.target.value });
          }}
        />
        <div className="text-xl font-medium">Content</div>
        {/* input field for content */}
        <textarea
          className={`${input_style} h-48`}
          type="text"
          placeholder="Content for your blog represents the primary body of the blog post. "
          value={blogData.content}
          onChange={(e) => {
            setBlogData({ ...blogData, content: e.target.value });
          }}
        />
        {/* <div className="text-xl font-medium">Cover Image</div>
        <input
          className={input_style}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        /> */}
        <br />
        <div
          className="btn btn-ghost bg-neutral-400 md:w-1/4"
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
      <br />
    </div>
  );
}
