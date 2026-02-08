"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function ForgotPasswordForm() {
  const lang = getLanguageClient();
  const { success: toastSuccess, error: toastError } = useToastStore();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toastError(t(lang, "errors.emailRequired"));
      return;
    }

    setIsLoading(true);
    try {
      await api.auth.forgotPassword({ email: email.trim() });
      setSent(true);
      toastSuccess(t(lang, "forgotPassword.successMessage"));
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error?.message ?? err?.message;
      toastError(typeof msg === "string" ? msg : t(lang, "something_went_wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t(lang, "forgotPassword.successMessage")}
        </h2>
        <p className="mt-2 text-gray-600">
          Check your email for the reset link.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {t(lang, "forgotPassword.title")}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Enter your email and we&apos;ll send you a reset link.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {t(lang, "login.email")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            t(lang, "forgotPassword.submit")
          )}
        </button>
      </form>
    </>
  );
}
