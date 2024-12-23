import { toast } from "react-toastify";
import useFeedContext from "../context/useFeedContext.js";
export default function useGetFeed() {
  const { setFeedItems } = useFeedContext();
  const getFeed = async () => {
    try {
      // const res = await fetch("/api/blog/feed");
      // const data = await res.json();
      // if (data.error) {
      //   throw new Error(data.error);
      // }
      // setFeedItems(data)
      setFeedItems([
        {
          image: "02jpg.jpg",
          title: "Welcome to Blogify",
          summary: "hey yoo  guyz",
          date: "01/12/24",
          blogId: "123",
        },
        {
          image: "02jpg.jpg",
          title: "Welcome to Blogify",
          summary:
            "hey yoo dhwbdhbhdb gjvdwjhqv jdvhjwqhjv dhjbwjqh dhjwqvdj hjwdbwhjq guyz",
          date: "01/12/24",
          blogId: "124",
        },
      ]);
    } catch (error) {
      toast.error(`Cannont Load Feeds: ${error.message}`);
    }
  };
  return { getFeed };
}
