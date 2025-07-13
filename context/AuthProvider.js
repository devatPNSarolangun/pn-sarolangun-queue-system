"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/login"]; // routes that don’t need login

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }

    if (user && pathname === "/login") {
      router.push("/pidana"); // redirect logged in user
    }
  }, [pathname, router]);

  return <>{children}</>;
}
