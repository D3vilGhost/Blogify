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
import { useMemo } from "react";

export default function App() {
  const { authUser, setAuthUser } = useAuthContext();
  useMemo(() => {
    // fetch the username
    let authUserName = JSON.parse(localStorage.getItem("username")) || null;
    // if there is username in localstorage set it as object
    // setting it in this format is important as data is set so when
    // user signs in or logs in connecting with server
    if (authUserName) {
      setAuthUser({ username: authUserName });
    }
  }, [localStorage.getItem("username")]);

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
