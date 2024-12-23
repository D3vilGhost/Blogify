import MiniBlog from "./MiniBlog.jsx";
import useGetFeed from "../hooks/useGetFeed.js";
import { useEffect } from "react";
import useFeedContext from "../context/useFeedContext.js";
export default function Feeds() {
  const { getFeed } = useGetFeed();
  const { feedItems } = useFeedContext();
  useEffect(() => {
    async function fetchFeed() {
      await getFeed();
    }
    fetchFeed();
  }, []);
  return (
    <div>
      {feedItems.map((blog) => (
        <div key={blog.blogId}>
          <MiniBlog
            image={blog.image}
            title={blog.title}
            summary={blog.summary}
            date={blog.date}
            blogId={blog.blogId}
          />
        </div>
      ))}
    </div>
  );
}