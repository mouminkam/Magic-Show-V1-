"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import useCartStore from "../../store/cartStore";
import CheckoutForm from "./_components/CheckoutForm";
import OrderSummary from "./_components/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const items = useCartStore((s) => s.items);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated && items.length === 0) {
      router.push("/shoping-cart");
    }
  }, [isAuthenticated, items.length, router]);

  if (typeof window !== "undefined" && (!isAuthenticated || items.length === 0)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
