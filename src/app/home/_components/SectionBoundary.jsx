"use client";

import ErrorBoundary from "../../../components/ui/ErrorBoundary";

export default function SectionBoundary({ children, fallback = null }) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
