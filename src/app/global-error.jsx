"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              {error?.message || "An unexpected error occurred"}
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
