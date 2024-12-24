import { toast } from "react-toastify";
import useAuthContext from "../context/useAuthContext.js";

export default function useLogin() {
  // this hook is used for logging user in
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    // do a contraint check on username and password
    const success = handleInputErrors(username, password);
    if (!success) return;
    // set the loading toast
    const toastId = toast.loading("Processing...");

    try {
      // fetch the login details
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      // convert response to json format
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // set username in local storage
      localStorage.setItem("username", JSON.stringify(data.username));
      // set authUser Context
      setAuthUser(data);
      // update loading toast to success
      toast.update(toastId, {
        render: `Welcome ${username}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // update loading toast to error
      toast.update(toastId, {
        render: `Error in useLogin: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { login };
}

function handleInputErrors(username, password) {
  // constraint check
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (username.includes(" ")) {
    toast.error("Username cannot have space in it!");
    return false;
  }

  return true;
}
