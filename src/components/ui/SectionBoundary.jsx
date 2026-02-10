"use client";

import ErrorBoundary from "./ErrorBoundary";

export default function SectionBoundary({ children, fallback = null }) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
