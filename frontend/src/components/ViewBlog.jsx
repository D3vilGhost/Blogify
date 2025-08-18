import Footer from "./Footer";
import useGetBlog from "../hooks/useGetBlog";
import { Calendar, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
export default function ViewBlog() {
  // this component shows a specific blog
  // useLocation hook is used to get the url and take blogId from it

  const location = useLocation();
  // hoook to fetch blog content
  const { getBlog } = useGetBlog();
  // state variable to fetch blog's details
  const [blogData, setBlogData] = useState({
    // image: "/02jpg.jpg",
    title: "Loading Your Blog...",
  });
  // useEffect is used to load blog details as soon as component mounts
  useEffect(() => {
    // use effect can't have async function as callback
    // thus created a seperate function and called it
    async function getBlogData() {
      // get the pathname and split by "/"
      // this gives ["blog","view","blogId"]
      // .pop() returns last element which is blogId
      const data=await getBlog(location.pathname.split("/").pop());
      if(data==null){
        window.location.href="/home";
      }
      else{
        setBlogData(data);
      }
    }
    getBlogData();
  }, []);
  return (
    // main component
    <div className="flex flex-col gap-3 m-2">
      <div className="text-4xl font-bold w-full flex justify-center items-center">
        {blogData.title}
      </div>
      <div className="w-full flex justify-center items-center">
        <img src={blogData.coverImage} alt="image" className="w-2/3" />
      </div>
      <div className="flex text-justify">{blogData.content}</div>
      <div className="w-full flex justify-end text-neutral-500">
        <div className="flex flex-col">
          <div className="flex">
            <Calendar size={32} strokeWidth={1.5} /> : {blogData.date}
          </div>
          <div className="flex">
            <NotebookPen size={32} strokeWidth={1.5} /> : @{blogData.author}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
