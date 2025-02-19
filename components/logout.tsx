import { useRouter } from "next/navigation";
import axios from "@/axios";
import { signOut } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";

export default function Logout() {
  const router = useRouter();
  const { email, clearUser } = useUserStore();

  const handleLogout = () => {
    if (email) {
      logout();
      clearUser();
    } else {
      signOut();
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };
  return <div onClick={handleLogout}>Logout</div>;
}
