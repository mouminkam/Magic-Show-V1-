"use client";

import Link from "next/link";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function OrderConfirmationError({ error, reset }) {
  const lang = getLanguageClient();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {t(lang, "something_went_wrong")}
        </h2>
        <p className="text-gray-600 mb-8">
          {error?.message || t(lang, "an_error_occurred")}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            {t(lang, "try_again")}
          </button>
          <Link
            href="/shop"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            {t(lang, "back_to_shop")}
          </Link>
        </div>
      </div>
    </div>
  );
}
