"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SectionSkeleton from "../../../../components/ui/SectionSkeleton";
import SectionBoundary from "../../../../components/ui/SectionBoundary";
import { getRelatedProductsWithAxios } from "../../../../lib/productApi";
import { createClientAxios } from "../../../../api/config/clientAxios";
import api from "../../../../api";

const RelatedProductsSlider = dynamic(() => import("./RelatedProductsSlider"), {
  loading: () => <SectionSkeleton variant="default" height="h-96" />,
  ssr: true,
});

export default function SecondarySections({ productId, lang }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && relatedProducts.length === 0) {
          fetchRelatedProducts();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    const fetchRelatedProducts = async () => {
      setIsLoading(true);
      try {
        const axios = createClientAxios();
        const result = await getRelatedProductsWithAxios(axios, productId);
        
        if (!abortController.signal.aborted) {
          setRelatedProducts(result ?? []);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
        
        // Fallback to empty array when network fails
        if (!abortController.signal.aborted) {
          console.warn("Using empty fallback for related products due to network error");
          setRelatedProducts([]);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      abortController.abort();
    };
  }, [productId, isLoading, relatedProducts.length]);

  return (
    <div ref={sectionRef}>
      <SectionBoundary>
        <Suspense fallback={<SectionSkeleton variant="default" height="h-96" />}>
          <RelatedProductsSlider 
            products={relatedProducts} 
            isLoading={isLoading}
            lang={lang} 
          />
        </Suspense>
      </SectionBoundary>
    </div>
  );
}
