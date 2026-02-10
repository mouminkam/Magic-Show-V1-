"use client";
import { useEffect, useRef } from "react";

export default function MobileFilterDrawer({ children, open, onRequestClose }) {
  const drawerRef = useRef(null);

  // Prevent scroll on mount
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close drawer when click outside the drawer content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        typeof onRequestClose === "function"
      ) {
        onRequestClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onRequestClose]);

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close filter drawer"
      ></div>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed max-h-[100dh] z-40 inset-y-0 left-0 w-full max-w-full sm:max-w-xs bg-white rounded-r-none sm:rounded-r-xl shadow-lg transition-transform duration-300 ease-in-out p-6 overflow-y-auto will-change-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}






