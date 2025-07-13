"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };
  return (
    <div
      className="text-lg font-semibold text-red-800 cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}
