import { SquareUserRound, Lock, UserRoundPlus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";
export default function Signup() {
  // This Component is Signup Page
  // Design you both input styles at once from this variable
  const input_style =
    "text-base px-4 h-12 md:w-1/3 text-wrap text-neutral-800 placeholder:text-neutral-700 placeholder:italic bg-transparent border-2 rounded";
  // state variables to hold data of form
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
  });
  // using signup hook
  const { signup } = useSignup();
  // this function is called when submit button is clicked
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(signupData);
  };
  // main component logic
  return (
    <div className="flex flex-col w-full gap-3 m-2">
      <div className="text-4xl flex items-center gap-2 font-bold">
        <UserRoundPlus size={40} strokeWidth={2} />
        SignUp
      </div>
      <hr className="w-full border-2" />
      <div className="text-xl font-medium flex gap-2">
        <SquareUserRound size={32} strokeWidth={1.5} /> Username
      </div>
      {/* input for username */}
      <input
        className={input_style}
        type="text"
        placeholder="Username"
        value={signupData.username}
        onChange={(e) => {
          setSignupData({ ...signupData, username: e.target.value });
        }}
      />
      <div className="text-xl font-medium flex gap-2">
        <Lock size={32} strokeWidth={1.5} />
        Password
      </div>
      {/* Input for password */}
      <input
        className={input_style}
        type="password"
        placeholder="Password"
        value={signupData.password}
        onChange={(e) => {
          setSignupData({ ...signupData, password: e.target.value });
        }}
      />
      <div
        className="btn btn-ghost bg-neutral-400 md:w-1/3"
        onClick={handleSignup}
      >
        SignUp
      </div>

      <div>
        Already have an account?{" "}
        <Link to="/login">
          <div className="underline font-bold inline-block"> Login</div>
        </Link>
      </div>
    </div>
  );
}
