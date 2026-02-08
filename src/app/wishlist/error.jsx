"use client";

import Button from "../../components/Button";

export default function WishlistError({ error, reset }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <p className="text-gray-600 mb-4">
          {error?.message || "Something went wrong loading your wishlist."}
        </p>
        <Button variant="primary" size="md" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
