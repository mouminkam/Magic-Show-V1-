"use client";

import { Suspense } from "react";
import SectionSkeleton from "../../../components/ui/SectionSkeleton";
import SectionBoundary from "../../../components/ui/SectionBoundary";
import ShopControls from "./ShopControls";

export default function TopControls({ lang }) {
  return (
    <SectionBoundary>
      <Suspense fallback={<SectionSkeleton variant="default" height="h-20" />}>
        <ShopControls categories={[]} filters={{}} lang={lang} variant="top" />
      </Suspense>
    </SectionBoundary>
  );
}
