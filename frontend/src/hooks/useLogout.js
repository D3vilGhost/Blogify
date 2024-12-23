import { toast } from "react-toastify";
import useAuthContext from "../context/useAuthContext.js";

export default function useLogout() {
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    let toastId = toast.loading("Processing...");
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("username");

      setAuthUser(null);

      toast.update(toastId, {
        render: `Logged Out Successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { logout };
}
