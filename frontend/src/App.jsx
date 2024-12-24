import { Routes, Route, Navigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import ViewBlog from "./components/ViewBlog";
import CreateNewBlog from "./components/CreateNewBlog";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup";
import EditBlog from "./components/EditBlog.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import Feeds from "./components/Feeds.jsx";

import useAuthContext from "./context/useAuthContext.js";

export default function App() {
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <div className="md:w-3/4">
      <NavBar />
      <Routes>
        <Route path="/home" element={<Feeds />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/profile" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/profile" /> : <Signup />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route path="/blog/view/:blogId" element={<ViewBlog />} />
        <Route path="/blog/edit/:blogId" element={<EditBlog />} />
        <Route
          path="/blog/create"
          element={authUser ? <CreateNewBlog /> : <Navigate to="/login" />}
        />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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
    </div>
  );
}
