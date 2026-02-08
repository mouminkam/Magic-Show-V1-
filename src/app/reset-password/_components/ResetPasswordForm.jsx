"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = getLanguageClient();
  const { success: toastSuccess, error: toastError } = useToastStore();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !email) {
      toastError("Invalid or expired reset link. Please request a new one.");
      return;
    }
    if (password.length < 8) {
      toastError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toastError(t(lang, "errors.passwordMismatch"));
      return;
    }

    setIsLoading(true);
    try {
      await api.auth.resetPassword({
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      toastSuccess("Password reset successfully!");
      router.push("/login?reset=success");
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error?.message ?? err?.message;
      toastError(typeof msg === "string" ? msg : t(lang, "something_went_wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Invalid Reset Link</h2>
        <p className="mt-2 text-gray-600">
          This link is invalid or expired. Please request a new password reset.
        </p>
        <Link
          href="/forgot-password"
          className="mt-4 inline-block text-orange-500 hover:text-orange-600 font-medium"
        >
          Request new link
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {t(lang, "resetPassword.title")}
      </h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {t(lang, "resetPassword.newPassword")}
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            {t(lang, "resetPassword.confirmPassword")}
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border-2 border-orange-500 rounded-sm font-medium text-orange-500 bg-white hover:bg-orange-500 hover:text-white disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            t(lang, "resetPassword.submit")
          )}
        </button>
      </form>
    </>
  );
}
