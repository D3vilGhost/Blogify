import { Routes, Route, Navigate } from "react-router";
import NavBar from "./components/NavBar";
import ViewBlog from "./components/ViewBlog";
import CreateNewBlog from "./components/CreateNewBlog";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup";
import EditBlog from "./components/EditBlog.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import MiniBlog from "./components/MiniBlog";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="md:w-3/4">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        limit={0}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition:Bounce
        stacked={true}
      />
      <NavBar />
      <Routes>
        <Route path="/home" element={<MiniBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/blog/view/:blogId" element={<ViewBlog />} />
        <Route path="/blog/edit/:blogId" element={<EditBlog />} />
        <Route path="/blog/create" element={<CreateNewBlog />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}
