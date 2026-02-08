"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Accordion Component
 * Reusable accordion component with smooth animations
 * Supports single or multiple expand modes
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of accordion items with { id, header, content }
 * @param {string|number} props.defaultExpanded - ID of default expanded item
 * @param {boolean} props.allowMultiple - Allow multiple items to be expanded (default: false)
 * @param {Function} props.onChange - Callback when expanded item changes: (expandedId) => void
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.itemClassName - Additional CSS classes for each item
 * @param {string} props.headerClassName - Additional CSS classes for headers
 * @param {string} props.contentClassName - Additional CSS classes for content
 */
export default function Accordion({
  items = [],
  defaultExpanded = null,
  allowMultiple = false,
  onChange = null,
  className = "",
  itemClassName = "",
  headerClassName = "",
  contentClassName = "",
}) {
  // State: single mode uses string/number, multiple mode uses Set
  const [expandedItems, setExpandedItems] = useState(() => {
    if (defaultExpanded !== null && defaultExpanded !== undefined) {
      return allowMultiple ? new Set([defaultExpanded]) : defaultExpanded;
    }
    return allowMultiple ? new Set() : null;
  });

  const isExpanded = useCallback(
    (id) => {
      if (allowMultiple) {
        return expandedItems instanceof Set && expandedItems.has(id);
      }
      return expandedItems === id;
    },
    [expandedItems, allowMultiple]
  );

  const handleToggle = useCallback(
    (id) => {
      if (allowMultiple) {
        const newSet = new Set(expandedItems);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        setExpandedItems(newSet);
        if (onChange) {
          onChange(Array.from(newSet));
        }
      } else {
        const newExpanded = expandedItems === id ? null : id;
        setExpandedItems(newExpanded);
        if (onChange) {
          onChange(newExpanded);
        }
      }
    },
    [expandedItems, allowMultiple, onChange]
  );

  if (!items || items.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const expanded = isExpanded(item.id);

        return (
          <div
            key={item.id}
            className={`border border-gray-200 rounded-lg overflow-hidden bg-white transition-shadow ${
              expanded ? "shadow-md" : "shadow-sm hover:shadow-md"
            } ${itemClassName}`}
          >
            {/* Header */}
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 ${
                expanded ? "bg-gray-50" : ""
              } ${headerClassName}`}
              aria-expanded={expanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex-1 pr-4">{item.header}</div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden"
                >
                  <div className={`p-4 pt-0 ${contentClassName}`}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}


