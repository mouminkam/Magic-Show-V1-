"use client";

import Image from "next/image";
import useCartStore from "../../../store/cartStore";

export default function OrderSummary() {
  const items = useCartStore((s) => s.items);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 relative flex-shrink-0 bg-gray-200 rounded">
              <Image
                src={item.image || "/images/img20.jpg"}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ${item.price?.toFixed(2) ?? "0.00"}
              </p>
            </div>
            <div className="font-semibold text-gray-900">
              ${((item.price ?? 0) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (7%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 text-lg pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
