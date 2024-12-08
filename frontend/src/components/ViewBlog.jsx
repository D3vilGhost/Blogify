import Footer from "./Footer";
import { Calendar, NotebookPen } from "lucide-react";
export default function ViewBlog({ title, image, content, date, author }) {
  return (
    <div className="flex flex-col gap-3 m-2">
      <div className="text-4xl font-bold w-full flex justify-center items-center">
        {title}
      </div>
      <div className="w-full flex justify-center items-center">
        <img src={image} alt="image" className="w-2/3" />
      </div>
      <div className="flex text-justify">{content}</div>
      <div className="w-full flex justify-end text-neutral-500">
        <div className="flex flex-col">
          <div className="flex">
            <Calendar size={32} strokeWidth={1.5} /> : {date}
          </div>
          <div className="flex">
            <NotebookPen size={32} strokeWidth={1.5} /> : @{author}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
