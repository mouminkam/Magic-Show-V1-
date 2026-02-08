"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Accordion from "../../../components/ui/Accordion";
import StoreAccordionItem from "./StoreAccordionItem";

// Dynamic import for Map component (client-side only)
const Map = dynamic(() => import("../../../components/ui/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

/**
 * StoresListSection Component
 * Displays a list of stores with accordion pattern and map view
 * @param {Object} props - Component props
 * @param {Array} props.stores - Array of store objects
 */
export default function StoresListSection({ stores = [] }) {
  const [selectedStoreId, setSelectedStoreId] = useState(
    stores[0]?.id || null
  );

  if (!stores || stores.length === 0) return null;

  // Prepare markers for map (ensure lat/lng are numbers to avoid NaN in Leaflet; skip stores with no coordinates)
  const mapMarkers = useMemo(
    () =>
      stores
        .filter((store) => store.lat != null && store.lng != null)
        .map((store) => {
          const lat = Number(store.lat);
          const lng = Number(store.lng);
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
          return {
            id: store.id,
            lat,
            lng,
            title: store.name,
            address: store.address,
          };
        })
        .filter(Boolean),
    [stores]
  );

  // Prepare accordion items
  const accordionItems = useMemo(
    () =>
      stores.map((store) => ({
        id: store.id,
        header: (
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {store.name}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{store.address}</span>
            </p>
          </div>
        ),
        content: <StoreAccordionItem store={store} />,
      })),
    [stores]
  );

  // Handle accordion change
  const handleAccordionChange = (expandedId) => {
    setSelectedStoreId(expandedId);
  };

  // Handle marker click
  const handleMarkerClick = (markerId) => {
    setSelectedStoreId(markerId);
  };

  return (
    <section id="stores" className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Stores
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit us at one of our locations. We're here to help you find the
            perfect piece.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Stores Accordion List */}
          <div className="lg:col-span-1 flex flex-col">
            <Accordion
              items={accordionItems}
              defaultExpanded={stores[0]?.id || null}
              allowMultiple={false}
              onChange={handleAccordionChange}
            />
          </div>

          {/* Map with all markers */}
          <div className="lg:col-span-2 flex-1 min-h-[400px] lg:min-h-[600px]">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              {mapMarkers.length > 0 ? (
                <Map
                  markers={mapMarkers}
                  height="100%"
                  selectedMarkerId={selectedStoreId}
                  onMarkerClick={handleMarkerClick}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">No map data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

