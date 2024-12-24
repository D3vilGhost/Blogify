import { toast } from "react-toastify";
import useAuthContext from "../context/useAuthContext.js";

export default function useLogout() {
  // this hook is for logging out user
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    // set loading toast
    let toastId = toast.loading("Processing...");
    // ask the server to expire the cookies and remove token
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      // remove username from localstorage
      localStorage.removeItem("username");
      // set authUser Context to null
      setAuthUser(null);

      // update the loading toast to success
      toast.update(toastId, {
        render: `Logged Out Successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // update the loading toast to error
      toast.update(toastId, {
        render: `Error in useLogout: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { logout };
}
