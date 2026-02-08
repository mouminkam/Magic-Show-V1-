"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function RegisterSection() {
  const router = useRouter();
  const lang = getLanguageClient();
  const login = useAuthStore((s) => s.login);
  const { success: toastSuccess, error: toastError } = useToastStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) {
      toastError(t(lang, "register.firstName") + " " + t(lang, "email_required"));
      return;
    }
    if (!formData.lastName.trim()) {
      toastError(t(lang, "register.lastName") + " " + t(lang, "email_required"));
      return;
    }
    if (!formData.email.trim()) {
      toastError(t(lang, "errors.emailRequired"));
      return;
    }
    if (!formData.phone.trim()) {
      toastError(t(lang, "register.phone") + " " + t(lang, "email_required"));
      return;
    }
    if (formData.password.length < 8) {
      toastError(t(lang, "login.password") + " " + "must be at least 8 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toastError(t(lang, "errors.passwordMismatch"));
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };

      const response = await api.auth.register(payload);
      const data = response?.data ?? response;
      const user = data?.customer ?? data?.user;
      const token = data?.access_token;

      if (user && token) {
        login(user, token);
        toastSuccess(t(lang, "register.title") + " - " + "Success!");
        router.push("/");
      } else {
        router.push("/login");
      }
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error?.message ?? err?.message;
      const errors = err?.response?.data?.errors;
      let message = typeof msg === "string" ? msg : t(lang, "something_went_wrong");
      if (errors && typeof errors === "object") {
        const firstKey = Object.keys(errors)[0];
        message = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : errors[firstKey];
      }
      toastError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center -mt-15 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t(lang, "register.title")}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join Us and discover a world of magical wear
        </p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-3/4">
        <div className="bg-white py-8 px-4 sm:rounded-sm sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  {t(lang, "register.firstName")}
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  {t(lang, "register.lastName")}
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t(lang, "login.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t(lang, "register.phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t(lang, "login.password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
              />
              <p className="mt-2 text-sm text-gray-500">
                Use 8+ characters, upper/lower case, numbers, and symbols
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t(lang, "resetPassword.confirmPassword")}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500 disabled:opacity-60"
              />
            </div>

            <div className="flex justify-center mt-20">
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 flex justify-center items-center gap-2 py-4 px-2 border-2 border-orange-500 rounded-sm text-lg font-medium text-orange-500 bg-white hover:bg-orange-500 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t(lang, "register.submit")
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t(lang, "register.haveAccount")}{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  {t(lang, "register.login")}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
