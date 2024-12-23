export default function useGetBlog() {
  const getBlog = async () => {
    return {
      image: "/02jpg.jpg",
      title: "Welcome to Blogify",
      content: "hey yoo  guyz",
      author: "01/12/24",
      date: "123",
    };
  };
  return { getBlog };
}
