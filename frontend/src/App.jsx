import NavBar from "./components/NavBar";
import MinBlog from "./components/MiniBlog";
import ViewBlog from "./components/ViewBlog";
import CreateNewBlog from "./components/CreateNewBlog";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup";
import EditBlog from "./components/EditBlog.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
export default function App() {
  let summary =
    "Lorem ipsumvdgjvchvdsjcve  cjxwvwbj/* xkbhxdxjhb,xjbd,jb */ dolor, sit amet consectetur adipisicing elit. Veniam, harum! Esse, beatae laboriosam! Veniam optio at similique natus hic mollitia ducimus, illum modi ea, est in quaerat, libero labore exercitationem!";
  return (
    <div className="md:w-3/4">
      <NavBar />
      {/* <ViewBlog
        title="Welcome to Blogify!"
        image="02jpg.jpg"
        content={summary}
        author="developer"
        date="01/12/24"
      /> */}
      {/* <CreateNewBlog /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <EditBlog /> */}
      <ProfilePage />
    </div>
  );
}
