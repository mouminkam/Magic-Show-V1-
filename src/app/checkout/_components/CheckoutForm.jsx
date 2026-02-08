"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "../../../api";
import useCartStore from "../../../store/cartStore";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

export default function CheckoutForm() {
  const router = useRouter();
  const lang = getLanguageClient();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const { success: toastSuccess, error: toastError } = useToastStore();

  const [formData, setFormData] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    address: "",
    city: "",
    country: "",
    phone: user?.phone ?? "",
    payment_method: "cash",
    coupon_code: "",
    acceptTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toastError("Please accept the terms and conditions");
      return;
    }
    if (!formData.address?.trim() || !formData.city?.trim() || !formData.country?.trim()) {
      toastError("Please fill in all shipping address fields");
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          id: item.productId ?? item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping_address: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          phone: formData.phone,
        },
        payment_method: formData.payment_method,
        coupon_code: formData.coupon_code?.trim() || null,
      };

      const response = await api.cart.checkout(orderData);
      const data = response?.data ?? response;
      const orderId = data?.order_id;

      clearCart();
      toastSuccess("Order placed successfully!");
      router.push(`/order-confirmation/${orderId}`);
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data?.error?.message ?? err?.message;
      toastError(typeof msg === "string" ? msg : t(lang, "something_went_wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t(lang, "checkout.shippingAddress")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.firstName")}
            </label>
            <input
              name="first_name"
              type="text"
              required
              value={formData.first_name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t(lang, "profile.lastName")}
            </label>
            <input
              name="last_name"
              type="text"
              required
              value={formData.last_name}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              name="country"
              type="text"
              required
              value={formData.country}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            {t(lang, "profile.phone")}
          </label>
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1 block w-full border border-gray-300 rounded-sm py-2 px-3"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t(lang, "checkout.paymentMethod")}
        </h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment_method"
              value="cash"
              checked={formData.payment_method === "cash"}
              onChange={handleChange}
              disabled={isLoading}
            />
            {t(lang, "checkout.cash")}
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment_method"
              value="bank_transfer"
              checked={formData.payment_method === "bank_transfer"}
              onChange={handleChange}
              disabled={isLoading}
            />
            {t(lang, "checkout.bankTransfer")}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code (optional)</label>
        <input
          name="coupon_code"
          type="text"
          value={formData.coupon_code}
          onChange={handleChange}
          disabled={isLoading}
          className="block w-full border border-gray-300 rounded-sm py-2 px-3"
          placeholder="Enter coupon code"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            disabled={isLoading}
          />
          I accept the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-orange-500 text-white rounded-sm font-medium hover:bg-orange-600 disabled:opacity-60"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        {t(lang, "checkout.placeOrder")}
      </button>
    </form>
  );
}
