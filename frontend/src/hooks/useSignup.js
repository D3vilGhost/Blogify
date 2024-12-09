import { toast } from "react-toastify";
import { useAuthContext } from "../context/useAuthContext.js";

export default function useSignup() {
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, password }) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    let toastId = toast.loading("Processing...");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user-data", JSON.stringify(data));
      setAuthUser(data);

      toast.update(toastId, {
        render: `Welcome ${username}`,
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
  return { signup };
}
function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (username.includes(" ")) {
    toast.error("Username cannot have space in it!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
