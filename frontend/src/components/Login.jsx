import { SquareUserRound, Lock, LogIn } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";
export default function Login() {
  // This Page is Login Page
  // Style your input fields at once from here
  const input_style =
    " px-4 h-12 md:w-1/3 text-wrap placeholder:italic bg-transparent border-2 rounded";
  // state variables to hold form data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  // login hook use
  const { login } = useLogin();
  // this function is called when login button is clicked
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(loginData);
  };
  // main component logic
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
      {/* Input field for usernmae */}
      <input
        className={input_style}
        type="text"
        placeholder="Username"
        value={loginData.username}
        onChange={(e) => {
          setLoginData({ ...loginData, username: e.target.value });
        }}
      />
      <div className="text-xl font-medium flex gap-2">
        <Lock size={32} strokeWidth={1.5} />
        Password
      </div>
      {/* input field for password */}
      <input
        className={input_style}
        type="password"
        placeholder="Password"
        value={loginData.password}
        onChange={(e) => {
          setLoginData({ ...loginData, password: e.target.value });
        }}
      />
      <div
        className="btn btn-ghost bg-neutral-400 md:w-1/3"
        onClick={handleLogin}
      >
        Login
      </div>
      <div>
        Dont have an account?{" "}
        <Link to="/signup">
          <div className="underline font-bold inline-block"> SignUp</div>
        </Link>
      </div>
    </div>
  );
}
