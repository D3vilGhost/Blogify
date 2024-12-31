import { AtSign, SquarePlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ProfileMiniBlog from "./ProfileMiniBlog";
import useGetProfile from "../hooks/useGetProfile";
import useAuthContext from "../context/useAuthContext";
export default function ProfilePage() {
  // this is the profile page where user's profile is shown
  // authUser Context is required to know the user for greeting him
  const { authUser } = useAuthContext();
  // use of profile hook which will fetch all user created blogs
  const { getProfile } = useGetProfile();
  // state variables are used to store the hook's fetched results
  // result fetched is a list of objects where each object is a blog's info
  const [profileData, setProfileData] = useState([]);
  // useEffect is used to fetch data as soon as component mounts
  useEffect(() => {
    // since useEffect can't have a async callback function
    // a seperate async function  was created and called
    async function getBlogs() {
      // callling hook and setting data in state variable
      setProfileData(await getProfile());
    }
    getBlogs();
  }, []);
  return (
    <div>
      <div className="navbar">
        <div className="navbar-start ">
          <div className="text-3xl flex gap-2 items-center font-bold">
            <AtSign size={40} strokeWidth={2} />
            {/* @ user via authuser */}
            <i>{authUser.username}</i>
          </div>
        </div>
        {/* CReate new blog button */}
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
      {/* container div for list of user created blogs */}
      <div className="flex flex-col gap-3 m-2">
        {/* if there are blogs then map them to ProfileMiniBlog else show no blogs*/}
        {profileData.length != 0 ? (
          profileData.map((blog) => (
            <div key={blog.blogId}>
              <ProfileMiniBlog
                title={blog.title}
                summary={blog.summary}
                blogId={blog.blogId}
              />
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
