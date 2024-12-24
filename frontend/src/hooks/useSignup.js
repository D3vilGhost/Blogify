import { toast } from "react-toastify";
import useAuthContext from "../context/useAuthContext.js";

export default function useSignup() {
  // this hook is for user signup
  const { setAuthUser } = useAuthContext();

  const signup = async ({ username, password }) => {
    // doing a constraint check on username and password
    const success = handleInputErrors({ username, password });
    if (!success) return;
    // if constraint aint satisfied return
    let toastId = toast.loading("Processing...");
    // set the loading toast

    try {
      // fetch the data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      // convert to json format
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("username", JSON.stringify(data.username));
      // if all set then store username in localstorage
      setAuthUser(data);
      // set the authUser context

      // update the loading to toast to sucess
      toast.update(toastId, {
        render: `Welcome ${username}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      // set the loading toast to error
      toast.update(toastId, {
        render: `Error in useSignup: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { signup };
}
function handleInputErrors({ username, password }) {
  // these are the constraints check on inputs.
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
