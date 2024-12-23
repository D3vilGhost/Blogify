import Footer from "./Footer";
import useGetBlog from "../hooks/useGetBlog";
import { Calendar, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
export default function ViewBlog() {
  const { getBlog } = useGetBlog();
  const [data, set] = useState({
    image: "",
    title: "",
    content: "",
    author: "",
    date: "",
  });
  // set(getBlog());
  return (
    <div className="flex flex-col gap-3 m-2">
      <div className="text-4xl font-bold w-full flex justify-center items-center">
        {data.title}
      </div>
      <div className="w-full flex justify-center items-center">
        <img src={data.image} alt="image" className="w-2/3" />
      </div>
      <div className="flex text-justify">{data.content}</div>
      <div className="w-full flex justify-end text-neutral-500">
        <div className="flex flex-col">
          <div className="flex">
            <Calendar size={32} strokeWidth={1.5} /> : {data.date}
          </div>
          <div className="flex">
            <NotebookPen size={32} strokeWidth={1.5} /> : @{data.author}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
