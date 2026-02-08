"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function LoginSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = getLanguageClient();
  const login = useAuthStore((s) => s.login);
  const { error: toastError } = useToastStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toastError(t(lang, "errors.emailRequired"));
      return;
    }
    if (!password) {
      toastError(t(lang, "login.password") + " " + t(lang, "email_required"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.auth.login({ email: email.trim(), password });
      const data = response?.data ?? response;
      const user = data?.customer ?? data?.user;
      const token = data?.access_token;

      if (!user || !token) {
        toastError(t(lang, "something_went_wrong"));
        return;
      }

      login(user, token);

      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        err?.response?.data?.error ??
        err?.message ??
        t(lang, "errors.invalidCredentials");
      toastError(typeof message === "string" ? message : t(lang, "errors.invalidCredentials"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center -mt-15 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t(lang, "login.title")}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Welcome back to our JEWELRY world
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-3/4">
        <div className="bg-white py-8 px-4 sm:rounded-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t(lang, "login.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t(lang, "login.password")}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                {t(lang, "login.forgotPassword")}
              </Link>
            </div>

            <div className="flex justify-center mt-12">
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 flex justify-center items-center gap-2 py-4 px-2 border-2 border-orange-500 rounded-sm text-lg font-medium text-orange-500 bg-white hover:bg-orange-500 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t(lang, "login.submit")
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t(lang, "login.noAccount")}{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  {t(lang, "login.register")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
