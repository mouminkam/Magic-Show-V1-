"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useAuthStore from "../../../store/authStore";
import api from "../../../api";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId;
  const lang = getLanguageClient();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push("/login?redirect=/order-confirmation/" + orderId);
      return;
    }
    if (!orderId) return;

    let cancelled = false;
    api.orders
      .getById(orderId)
      .then((response) => {
        if (cancelled) return;
        const data = response?.data ?? response;
        setOrder(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.response?.data?.message ?? err?.message ?? "Failed to load order");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [orderId, isAuthenticated, router]);

  if (typeof window !== "undefined" && !isAuthenticated) return null;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t(lang, "something_went_wrong")}
          </h2>
          <p className="text-gray-600 mb-6">{error || "Order not found"}</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            {t(lang, "back_to_shop")}
          </Link>
        </div>
      </div>
    );
  }

  const shippingAddress =
    typeof order.shipping_address === "string"
      ? JSON.parse(order.shipping_address || "{}")
      : order.shipping_address ?? {};
  const items = order.items ?? [];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank you for your order!</h1>
          <p className="text-gray-600">
            Order #{order.order_number ?? order.id}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
          <div className="space-y-4">
            {items.map((item, i) => {
              const img =
                item.product?.featured_image ??
                item.product?.data?.featured_image ??
                item.product?.images?.[0] ??
                item.image ??
                "/images/img20.jpg";
              return (
              <div key={item.id ?? i} className="flex gap-4">
                <div className="w-16 h-16 relative bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                  <Image
                    src={typeof img === "string" ? img : img?.url ?? "/images/img20.jpg"}
                    alt={item.product_name ?? item.name ?? "Product"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.product_name ?? item.name ?? "Product"}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ${(item.unit_price ?? item.price ?? 0).toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold">
                  ${((item.unit_price ?? item.price ?? 0) * item.quantity).toFixed(2)}
                </div>
              </div>
            );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${(order.subtotal ?? 0).toFixed(2)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${(order.discount_amount ?? 0).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${(order.tax_amount ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>${(order.total_amount ?? 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
          <p className="text-gray-600">
            {shippingAddress.first_name} {shippingAddress.last_name}
            <br />
            {shippingAddress.address}
            <br />
            {shippingAddress.city}, {shippingAddress.country}
            <br />
            {shippingAddress.phone}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-block text-center px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium"
          >
            Continue Shopping
          </Link>
          <Link
            href="/profile"
            className="inline-block text-center px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium"
          >
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
