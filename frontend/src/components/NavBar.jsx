import { Sun, Moon, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
export default function NavBar() {
  const location = useLocation();
  const { changeTheme } = useTheme();
  const { logout } = useLogout();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const [lightTheme, setLightTheme] = useState("");
  const [darkTheme, setDarkTheme] = useState("");

  // to set theme when component mounts
  useEffect(() => {
    if (document.querySelector("html").getAttribute("data-theme") == "cmyk") {
      setLightTheme("");
      setDarkTheme("hidden");
    } else {
      setLightTheme("hidden");
      setDarkTheme("");
    }
  }, []);
  // to handle change in theme
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
        <div
          id="light-mode"
          className={`btn btn-ghost btn-circle ${lightTheme}`}
          onClick={handleTheme}
        >
          <Sun size={32} strokeWidth={1.5} />
        </div>
        <div
          className={`btn btn-ghost btn-circle ${darkTheme}`}
          onClick={handleTheme}
        >
          <Moon size={32} strokeWidth={1.5} />
        </div>
        <div>
          <Link
            to="/profile"
            className={`btn btn-ghost btn-circle ${
              location.pathname.startsWith("/profile") ? "hidden" : ""
            }`}
          >
            <User size={32} strokeWidth={1.5} />
          </Link>
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
