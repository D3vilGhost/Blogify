import { FilePlus } from "lucide-react";
import { useState } from "react";
export default function CreateNewBlog() {
  const [blogData, setBlogData] = useState({
    title: "",
    summary: "",
    content: "",
    coverImage: "",
  });
  const handleImageUpload = (e) => {
    // handle coverImage url here
    alert(e.target.value);
  };
  const handleSubmit = (e) => {
    // validate data here
    alert("hi");
  };
  const input_style =
    "text-base px-4 md:w-2/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded  ";
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <FilePlus size={40} strokeWidth={2} />
        Create New Blog
      </div>
      <hr className="w-full border-2" />
      <div className="flex flex-col gap-3 m-2">
        <div className="text-xl font-medium">Title</div>
        <textarea
          className={input_style}
          type="text"
          placeholder="Title for your blog."
          value={blogData.title}
          onChange={(e) => {
            setBlogData({ title: e.target.value });
          }}
        />
        <div className="text-xl font-medium">Summary</div>
        <textarea
          className={`${input_style} h-24`}
          type="text"
          placeholder="A visually appealing summary for each blog in the feed."
          value={blogData.summary}
          onChange={(e) => {
            setBlogData({ summary: e.target.value });
          }}
        />
        <div className="text-xl font-medium">Content</div>
        <textarea
          className={`${input_style} h-48`}
          type="text"
          placeholder="Content for your blog represents the primary body of the blog post. "
          value={blogData.content}
          onChange={(e) => {
            setBlogData({ content: e.target.value });
          }}
        />
        <div className="text-xl font-medium">Cover Image</div>
        <input
          className={input_style}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
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
