"use client";

import Link from "next/link";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ForgotPasswordForm />
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
