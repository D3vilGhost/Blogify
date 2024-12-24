import { toast } from "react-toastify";
import useFeedContext from "../context/useFeedContext.js";
export default function useGetFeed() {
  // this hook is used to get the feeds
  const { setFeedItems } = useFeedContext();
  const getFeed = async () => {
    const toastId = toast.loading("Loading Latest Blogs...");
    try {
      // fetch the feeds
      const res = await fetch("/api/blog/feed");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // set feed data in feedItems context
      setFeedItems(data);
      // update the loading toast in case of no failue
      toast.update(toastId, {
        render: `Feed Loaded successfully`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      // setFeedItems([
      //   {
      //     image: "02jpg.jpg",
      //     title: "Welcome to Blogify",
      //     summary: "hey yoo  guyz",
      //     date: "01/12/24",
      //     blogId: "123",
      //   },
      //   {
      //     image: "02jpg.jpg",
      //     title: "Welcome to Blogify",
      //     summary:
      //       "hey yoo dhwbdhbhdb gjvdwjhqv jdvhjwqhjv dhjbwjqh dhjwqvdj hjwdbwhjq guyz",
      //     date: "01/12/24",
      //     blogId: "124",
      //   },
      // ]);
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: `Error in useGetFeed: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { getFeed };
}
