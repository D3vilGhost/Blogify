import MiniBlog from "./MiniBlog.jsx";
import useGetFeed from "../hooks/useGetFeed.js";
import { useEffect, useState } from "react";
export default function Feeds() {
  // This component is basically a container component of feed
  // many individual blogs are shown inside this container

  const { getFeed } = useGetFeed();
  const [feedItems, setFeedItems] = useState([]);
  useEffect(() => {
    async function fetchFeed() {
      setFeedItems(await getFeed());
    }
    fetchFeed();
  }, []);
  return (
    <div>
      {feedItems.map((blog) => (
        <div key={blog.blogId}>
          <MiniBlog
            image={"/02jpg.jpg"}
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
