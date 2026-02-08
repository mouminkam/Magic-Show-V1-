"use client";

import { Component } from "react";
import PropTypes from "prop-types";
import * as Sentry from "@sentry/nextjs";
import { AlertCircle, RefreshCw } from "lucide-react";
import { getLanguageClient } from "../../lib/getLanguageClient";
import { t } from "../../locales/i18n/getTranslation";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: { componentStack: errorInfo?.componentStack } });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={this.handleReset}
          fallback={this.props.fallback}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallback({ error, onReset, fallback }) {
  const lang = getLanguageClient();

  if (fallback) {
    return fallback;
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t(lang, "something_went_wrong") || "Something went wrong"}
        </h2>
        <p className="text-gray-600 mb-6">
          {error?.message || t(lang, "an_error_occurred") || "An error occurred"}
        </p>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t(lang, "try_again") || "Try Again"}
        </button>
      </div>
    </div>
  );
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

ErrorFallback.propTypes = {
  error: PropTypes.object,
  onReset: PropTypes.func.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;



