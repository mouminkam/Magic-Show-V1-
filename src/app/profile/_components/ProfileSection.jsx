"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function ProfileSection() {
  const lang = getLanguageClient();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { success: toastSuccess, error: toastError } = useToastStore();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.auth.updateProfile(formData);
      const data = response?.data ?? response;
      const updatedUser = data?.customer ?? data ?? user;
      setUser(updatedUser);
      setIsEditing(false);
      toastSuccess(t(lang, "profile.save") + " - Success!");
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error?.message ?? err?.message;
      toastError(typeof msg === "string" ? msg : t(lang, "something_went_wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t(lang, "profile.title")}
        </h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-orange-500 border border-orange-500 rounded-sm hover:bg-orange-50"
          >
            {t(lang, "profile.edit")}
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.firstName")}
            </label>
            <input
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.lastName")}
            </label>
            <input
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.email")}
            </label>
            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className="mt-1 block w-full border border-gray-300 rounded-sm shadow-sm py-2 px-3 bg-gray-50 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.phone")}
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-600 rounded-sm shadow-sm py-2 px-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {t(lang, "profile.save")}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">{t(lang, "profile.firstName")}</p>
            <p className="font-medium">{user.first_name || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t(lang, "profile.lastName")}</p>
            <p className="font-medium">{user.last_name || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t(lang, "profile.email")}</p>
            <p className="font-medium">{user.email || "—"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t(lang, "profile.phone")}</p>
            <p className="font-medium">{user.phone || "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
