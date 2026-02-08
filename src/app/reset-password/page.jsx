"use client";

import { Suspense } from "react";
import Link from "next/link";
import ResetPasswordForm from "./_components/ResetPasswordForm";

function ResetPasswordContent() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ResetPasswordForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
