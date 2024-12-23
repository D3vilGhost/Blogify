import { toast } from "react-toastify";
export default function useGetProfile() {
  const getProfile = async () => {
    const toastId = toast.loading("Loading Profile...");
    try {
      const res = await fetch("/api/auth/profile");
      const profileData = await res.json();
      if (profileData.error) {
        throw new Error(profileData.error);
      }
      return profileData;
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };
  return { getProfile };
}
