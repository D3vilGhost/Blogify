import { Sun, Moon, User, LogOut } from "lucide-react";
export default function NavBar() {
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="btn btn-ghost text-xl">Blogify</div>
      </div>
      <div className="navbar-end gap-2">
        <div className="btn btn-ghost btn-circle">
          <Sun size={32} strokeWidth={1.5} id="light-mode" className="hidden" />
          <Moon size={32} strokeWidth={1.5} id="dark-mode" />
        </div>
        <div className="btn btn-ghost btn-circle" id="profileButton">
          <User size={32} strokeWidth={1.5} />
          <LogOut size={32} strokeWidth={1.5} className="hidden" />
        </div>
      </div>
    </div>
  );
}
