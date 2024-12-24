import { Sun, Moon, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
export default function NavBar() {
  // This is the navbar component which is always sits at top of website

  // using uselocation hook to know on which ul currently we are on
  // this is futher used to alternate between logout button and profile button
  // based on wheter we are on profile or other part of site
  const location = useLocation();
  // this hook is used to change theme of site
  const { changeTheme } = useTheme();
  // using logout hook to logout user
  const { logout } = useLogout();
  // this function is called when user clicks on logout button
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  // state variable to hold theme
  // this logic is used here and not in hook bcs
  // we will need them to switch between sun and moon icon for theme
  const [lightTheme, setLightTheme] = useState("");
  const [darkTheme, setDarkTheme] = useState("");
  // to set theme of site when component mounts intially
  useEffect(() => {
    if (document.querySelector("html").getAttribute("data-theme") == "cmyk") {
      setLightTheme("");
      setDarkTheme("hidden");
    } else {
      setLightTheme("hidden");
      setDarkTheme("");
    }
  }, []);
  // to handle change in theme.
  // this function is called when user clicks on theme icons
  const handleTheme = () => {
    changeTheme();
    if (document.querySelector("html").getAttribute("data-theme") == "cmyk") {
      setLightTheme("");
      setDarkTheme("hidden");
    } else {
      setLightTheme("hidden");
      setDarkTheme("");
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <Link to="/home">
          <div className="btn btn-ghost text-xl">Blogify</div>
        </Link>
      </div>
      <div className="navbar-end gap-2">
        {/* Sun Icon */}
        <div
          id="light-mode"
          className={`btn btn-ghost btn-circle ${lightTheme}`}
          onClick={handleTheme}
        >
          <Sun size={32} strokeWidth={1.5} />
        </div>
        {/* Moon icon */}
        <div
          className={`btn btn-ghost btn-circle ${darkTheme}`}
          onClick={handleTheme}
        >
          <Moon size={32} strokeWidth={1.5} />
        </div>
        <div>
          {/* Profile icon  */}
          <Link
            to="/profile"
            className={`btn btn-ghost btn-circle ${
              location.pathname.startsWith("/profile") ? "hidden" : ""
            }`}
          >
            <User size={32} strokeWidth={1.5} />
          </Link>
          {/* Logout icon */}
          <div
            className={` btn btn-ghost btn-circle ${
              location.pathname.startsWith("/profile") ? "" : "hidden"
            }`}
            onClick={handleLogout}
          >
            <LogOut size={32} strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
