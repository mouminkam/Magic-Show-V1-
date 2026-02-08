"use client";

import { useState } from "react";
import Button from "../../../components/Button";
import axiosInstance from "../../../api/config/axios";

/**
 * ContactForm Component
 * Submits contact form to API
 * @param {Object} props - Component props
 * @param {string} props.companyEmail - Company email from contact details (for display only)
 */
export default function ContactForm({ companyEmail = "" }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      };

      const res = await axiosInstance.post("/contact/send-message", payload);
      const data = res?.data;

      if (data?.success) {
        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setError(data?.error?.message || "Something went wrong.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        err.response?.data?.error?.details ||
        (typeof err.response?.data?.error === "string" ? err.response.data.error : null) ||
        err.message ||
        "Failed to send message. Please try again.";
      setError(Array.isArray(msg) ? msg.join(" ") : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-normal text-gray-600 uppercase tracking-widest mb-8">
        LEAVE A MESSAGE
      </h3>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
          Message sent successfully. We will get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300"
              required
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300"
            required
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone (optional)"
            className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300"
            disabled={loading}
          />
        </div>

        <div>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300"
            required
            disabled={loading}
          />
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your message"
            rows={4}
            className="w-full px-0 py-3 border-0 border-b border-gray-400 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors duration-300 resize-none"
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            size="md"
            disabled={loading}
          >
            {loading ? "Sending..." : "send message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
