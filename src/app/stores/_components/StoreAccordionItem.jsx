"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

/**
 * StoreAccordionItem Component
 * Displays store details inside accordion content
 * 
 * @param {Object} props - Component props
 * @param {Object} props.store - Store object with details
 */
export default function StoreAccordionItem({ store }) {
  if (!store) return null;

  return (
    <div className="space-y-4">
      {/* Manager */}
      {store.manager && (
        <div>
          <p className="text-lg font-semibold text-gray-900">{store.manager}</p>
        </div>
      )}

      {/* Store Details */}
      <div className="space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 mb-1 text-sm">Address</p>
            <p className="text-gray-600 text-sm leading-relaxed">{store.address}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 mb-1 text-sm">Phone</p>
            <Link
              href={`tel:${store.phone}`}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm"
            >
              {store.phone}
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 mb-1 text-sm">Email</p>
            <Link
              href={`mailto:${store.email}`}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm break-all"
            >
              {store.email}
            </Link>
          </div>
        </div>

        {/* Opening Hours */}
        {store.hours && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 mb-1 text-sm">Opening Hours</p>
              <p className="text-gray-600 text-sm">{store.hours}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


