import { SquarePen } from "lucide-react";
import useEditBlog from "../hooks/useEditBlog";
export default function EditBlog() {
  // this page is for editing existing blogs
  // change this variable to style all the input field design at once
  const input_style =
    "text-base px-4 md:w-2/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded  ";
  // use of hook to edit blog
  const { editBlog } = useEditBlog();
  // this function is called when user clicks
  async function handleSubmit(event) {
    // to prevent default page refresh
    event.preventDefault();
    // collect the form data and pass it to hook
    const formData = new FormData(document.querySelector("form"));
    await editBlog(formData);
  }

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
          placeholder="Title for your blog."
        />
        <div className="text-xl font-medium">Summary</div>
        <textarea
          className={`${input_style} h-24`}
          type="text"
          name="summary"
          placeholder="A visually appealing summary for each blog in the feed."
        />
        <div className="text-xl font-medium">Content</div>
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
