import { toast } from "react-toastify";
export default function useGetProfile() {
  // This Hook loads the user profile
  const getProfile = async () => {
    // set the loading toast
    const toastId = toast.loading("Loading Profile...");
    try {
      // fetch the profile data
      const res = await fetch("/api/auth/profile");
      // res contains all the blogs ever created by the authUser
      const profileData = await res.json();
      if (profileData.error) {
        throw new Error(profileData.error);
      }
      // return the received list of authUser created blogs
      toast.update(toastId, {
        render: `Profile loaded successfully!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return profileData;
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return { getProfile };
}
