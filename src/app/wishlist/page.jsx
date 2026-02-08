"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "../../components/ui/ErrorBoundary";
import SectionSkeleton from "../../components/ui/SectionSkeleton";

const WishlistSection = dynamic(
  () => import("./_components/WishlistSection"),
  {
    loading: () => <SectionSkeleton variant="default" height="h-screen" />,
    ssr: false,
  }
);

export default function WishlistPage() {
  return (
    <div className="bg-white min-h-screen">
      <ErrorBoundary>
        <Suspense
          fallback={
            <SectionSkeleton variant="default" height="h-screen" />
          }
        >
          <WishlistSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
