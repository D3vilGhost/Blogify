import { FilePlus } from "lucide-react";
import useCreateBlog from "../hooks/useCreateBlog";
export default function CreateNewBlog() {
  // this Page is for creating new blogs
  // here change this variable to style all the input field design at once
  const input_style =
    "px-4 md:w-2/3 text-wrap placeholder:italic bg-transparent border-2 rounded  ";
  // use of hook to create blog
  const { createBlog } = useCreateBlog();
  // this function is called when user clicks submit button
  async function handleSubmit(event) {
    // to prevent deafult page refresh
    event.preventDefault();
    // collect the form data and pass it to hook
    const formData = new FormData(document.querySelector("form"));
    await createBlog(formData);
  }
  // main component logic
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <FilePlus size={40} strokeWidth={2} />
        Create New Blog
      </div>
      <hr className="w-full border-2" />
      <form className="flex flex-col gap-3 m-2" onSubmit={handleSubmit}>
        <div className="text-xl font-medium">Title</div>
        {/* input field for title */}
        <textarea
          className={input_style}
          type="text"
          name="title"
          placeholder="Title for your blog."
        />
        <div className="text-xl font-medium">Summary</div>
        {/* input field for summary */}
        <textarea
          className={`${input_style} h-24`}
          type="text"
          name="summary"
          placeholder="A visually appealing summary for each blog in the feed."
        />
        <div className="text-xl font-medium">Content</div>
        {/* input field for content */}
        <textarea
          className={`${input_style} h-48`}
          type="text"
          name="content"
          placeholder="Content for your blog represents the primary body of the blog post. "
        />
        <div className="text-xl font-medium">Cover Image</div>
        <input
          className={input_style}
          type="file"
          name="coverImage"
          accept="image/*"
        />
        <br />
        <input
          type="submit"
          value="Submit"
          className="btn btn-ghost bg-neutral-400 md:w-1/4"
        />
      </form>
      <br />
    </div>
  );
}
