import { AtSign, Lock, LogOut, SquarePlus } from "lucide-react";
import React, { useState } from "react";
import ProfileMiniBlog from "./ProfileMiniBlog";
import Footer from "./Footer";

export default function ProfilePage({ author = "developer" }) {
  let a =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta amet aperiam molestias culpa! Dignissimos atque illo amet totam tempora cum dolores debitis, distinctio esse alias tempore, expedita obcaecati odio iusto.";
  return (
    <div>
      {/* developer name and create new blog */}
      <div className="navbar">
        <div className="navbar-start ">
          <div className="text-3xl flex gap-2 items-center font-bold">
            <AtSign size={40} strokeWidth={2} />
            <i>{author}</i>
          </div>
        </div>
        <div className="navbar-end gap-2">
          <div className="btn text-lg font-medium gap-2 bg-green-500 hover:bg-green-400">
            <SquarePlus /> <div className="hidden sm:block">Create Blog</div>
          </div>
        </div>
      </div>
      <hr className="w-full border-2" />
      <div className="my-2 mx-4 text-2xl flex gap-2 items-center font-bold">
        Your Blogs
      </div>
      <div className="flex flex-col gap-3 m-2">
        <ProfileMiniBlog title="cyvubjnk" summary={a} />
        <ProfileMiniBlog title="cyvubjnk" summary={a} />
        <ProfileMiniBlog title="cyvubjnk" summary={a} />
      </div>
      <br />
    </div>
  );
}
