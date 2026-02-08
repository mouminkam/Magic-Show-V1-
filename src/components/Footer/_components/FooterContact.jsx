"use client";
import { MapPin, Mail, Phone, Printer } from "lucide-react";

export default function FooterContact() {
  return (
    <div className="text-gray-900">
      <h3 className="text-2xl font-normal mb-6 uppercase tracking-wide">
        CONTACT US
      </h3>
      <ul className="space-y-4">
        <li className="flex items-start">
          <MapPin className="w-5 h-5 mr-4 mt-1 shrink-0 text-gray-900" />
          <span className="text-gray-700">Limited: 222-UTC, EU.</span>
        </li>
        <li className="flex items-start">
          <Mail className="w-5 h-5 mr-4 mt-1 shrink-0 text-gray-900" />
          <a
            href="mailto:Support@emttheme.com"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Support@emttheme.com
          </a>
        </li>
        <li className="flex items-start">
          <Phone className="w-5 h-5 mr-4 mt-1 shrink-0 text-gray-900" />
          <a
            href="tel:0002131234567"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            (00) -213 1234567
          </a>
        </li>
        <li className="flex items-start">
          <Printer className="w-5 h-5 mr-4 mt-1 shrink-0 text-gray-900" />
          <a
            href="tel:0002131879017"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            (00) -213 1879017
          </a>
        </li>
      </ul>
    </div>
  );
}

