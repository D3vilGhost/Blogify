import { SquareUserRound, Lock, LogIn } from "lucide-react";
import React, { useState } from "react";
export default function Login() {
  const input_style =
    "text-base px-4 h-12 md:w-1/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded  ";
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e) => {};
  return (
    <div className="flex flex-col w-full gap-3 m-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <LogIn size={40} strokeWidth={2} />
        Login
      </div>
      <hr className="w-full border-2" />
      <div className="text-xl font-medium flex gap-2">
        <SquareUserRound size={32} strokeWidth={1.5} /> Username
      </div>
      <input
        className={input_style}
        type="text"
        placeholder="Username"
        value={loginData.username}
        onChange={(e) => {
          setLoginData({ username: e.target.value });
        }}
      />
      <div className="text-xl font-medium flex gap-2">
        <Lock size={32} strokeWidth={1.5} />
        Password
      </div>
      <input
        className={input_style}
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => {
          setLoginData({ password: e.target.value });
        }}
      />
      <div
        className="btn btn-ghost bg-neutral-400 md:w-1/3"
        onClick={handleLogin}
      >
        Login
      </div>
      <div>Dont have an account? SignUp</div>
    </div>
  );
}
