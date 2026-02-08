"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

export default function GuestOnly({ children, redirectTo = "/" }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}



