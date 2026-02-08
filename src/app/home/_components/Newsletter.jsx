"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { Mail, CheckCircle2 } from "lucide-react";
import useToastStore from "../../../store/toastStore";
import api from "../../../api";
import { getLanguageClient } from "../../../lib/getLanguageClient";
import { t } from "../../../locales/i18n/getTranslation";

/**
 * Newsletter Component
 * Email subscription form with validation
 * @param {Object} props - Component props
 * @param {Object} props.header - Section header data (optional)
 */
export default function Newsletter({ header = null }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { success, error: toastError } = useToastStore();

  const defaultHeader = {
    title: "Stay in the Loop",
    description: "Subscribe to our newsletter and be the first to know about new arrivals and exclusive offers",
  };

  const sectionHeader = header || defaultHeader;

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lang = getLanguageClient();

    // Validate email
    if (!email.trim()) {
      toastError(t(lang, "email_required") || "Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toastError(t(lang, "invalid_email") || "Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.newsletter.subscribe({ email: email.trim() });

      // Success
      setIsSuccess(true);
      success(t(lang, "newsletter_subscribed") || "Successfully subscribed to newsletter!");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      toastError(err?.message || t(lang, "newsletter_error") || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-black flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {sectionHeader.title}
          </h2>
          {sectionHeader.description && (
            <p className="text-gray-600 text-base md:text-lg mb-8">
              {sectionHeader.description}
            </p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900 placeholder-gray-500"
                disabled={isSubmitting || isSuccess}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Subscribed!
                </>
              ) : isSubmitting ? (
                "Subscribing..."
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

Newsletter.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

Newsletter.defaultProps = {
  header: null,
};

