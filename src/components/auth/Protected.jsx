"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLanguageClient } from "../../lib/getLanguageClient";
import useAuthStore from "../../store/authStore";
import { t } from "../../locales/i18n/getTranslation";

export default function Protected({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const lang = getLanguageClient();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t(lang, "please_login") || "Please login to continue"}
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}



