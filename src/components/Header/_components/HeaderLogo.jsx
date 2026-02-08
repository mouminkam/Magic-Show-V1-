"use client";
import Link from "next/link";
import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="shrink-0 z-10">
      <Link
        href="/"
        className="text-xl md:text-2xl font-bold tracking-widest text-gray-900 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded"
        aria-label="Go to homepage"
      >
        <Image
          src="/images/logo.png"
          alt="Magic Show Logo"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
}

