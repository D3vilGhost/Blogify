import { AtSign, SquarePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ProfileMiniBlog from "./ProfileMiniBlog";
import useGetProfile from "../hooks/useGetProfile";
import useAuthContext from "../context/useAuthContext";
export default function ProfilePage({ author = "developer" }) {
  const { getProfile } = useGetProfile();
  const [profileData, setProfileData] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    async function getBlogs() {
      setProfileData(await getProfile());
    }
    getBlogs();
  }, []);
  return (
    <div>
      {/* developer name and create new blog */}
      <div className="navbar">
        <div className="navbar-start ">
          <div className="text-3xl flex gap-2 items-center font-bold">
            <AtSign size={40} strokeWidth={2} />
            <i>{authUser?.username}</i>
          </div>
        </div>
        <div className="navbar-end gap-2">
          <Link to="/blog/create">
            <div className="btn text-lg font-medium gap-2 bg-green-500 hover:bg-green-400">
              <SquarePlus /> <div className="hidden sm:block">Create Blog</div>
            </div>
          </Link>
        </div>
      </div>
      <hr className="w-full border-2" />
      <div className="my-2 mx-4 text-2xl flex gap-2 items-center font-bold">
        Your Blogs
      </div>
      <div className="flex flex-col gap-3 m-2">
        {profileData.length != 0 ? (
          profileData.map((blog) => (
            <div key={blog.blogId}>
              <ProfileMiniBlog title={blog.title} summary={blog.summary} />
            </div>
          ))
        ) : (
          <div className="text-md text-neutral-600 text-center p-4">
            You have Posted No Blogs.
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
