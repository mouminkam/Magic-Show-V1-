"use client";

import { useState } from "react";
import { Range } from "react-range";

const SIDEBAR_LIST_LIMIT = 5;

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  availablePriceRange,
  sizes,
  selectedSize,
  onSizeChange,
  colors,
  selectedColor,
  onColorChange,
  seasons,
  selectedSeason,
  onSeasonChange,
}) {
  const [sizeExpanded, setSizeExpanded] = useState(false);
  const [colorExpanded, setColorExpanded] = useState(false);
  const [seasonExpanded, setSeasonExpanded] = useState(false);

  // Normalize seasons: API returns [{ value, label }] or legacy string[]
  const seasonItems = Array.isArray(seasons)
    ? seasons.map((s) => (typeof s === "object" && s?.value != null ? s : { value: String(s), label: String(s) }))
    : [];

  // Ensure sizes and colors are strings (in case API returns objects)
  const safeSizes = Array.isArray(sizes) ? sizes.map((s) => (typeof s === "object" && s?.value != null ? s.value : String(s))) : [];
  const safeColors = Array.isArray(colors) ? colors.map((c) => (typeof c === "object" && (c?.label ?? c?.value) != null ? (c.label ?? c.value) : String(c))) : [];

  // Use availablePriceRange for slider min/max (dynamic from all products)
  // Use priceRange for current selected values (from URL searchParams)
  const rangeMin = availablePriceRange?.min || 0;
  const rangeMax = availablePriceRange?.max || 100;
  const values = [priceRange.min, priceRange.max];

  // Handle slider value change - convert array [min, max] to { min, max } object
  const handleChange = (newValues) => {
    if (Array.isArray(newValues) && newValues.length === 2) {
      onPriceRangeChange({ min: newValues[0], max: newValues[1] });
    }
  };

  return (
    <div className="space-y-8 pr-4">
      {/* Price Filter */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-4">
          Price
        </h3>
        <div className="space-y-4">
          <div className="py-2">
            <Range
              step={1}
              min={rangeMin}
              max={rangeMax}
              values={values}
              onChange={handleChange}
              renderTrack={({ props, children }) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className="h-1.5 w-full bg-gray-300 rounded-full relative"
                    style={{
                      ...restProps.style,
                    }}
                  >
                    {/* Active range fill */}
                    <div
                      className="absolute h-full bg-black rounded-full"
                      style={{
                        left: `${((values[0] - rangeMin) / (rangeMax - rangeMin)) * 100}%`,
                        width: `${((values[1] - values[0]) / (rangeMax - rangeMin)) * 100}%`,
                      }}
                    />
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props, isDragged }) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className={`h-4 w-4 rounded-full border-2 border-black bg-white shadow-lg transition-all duration-150 touch-manipulation ${
                      isDragged ? "scale-110 shadow-xl" : "hover:scale-105"
                    }`}
                    style={{
                      ...restProps.style,
                      outline: "none",
                    }}
                  >
                  </div>
                );
              }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-4">
          Size
        </h3>
        <div className="flex flex-col gap-4">
          {(sizeExpanded ? safeSizes : safeSizes.slice(0, SIDEBAR_LIST_LIMIT)).map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`py-2 text-sm font-medium rounded transition-all duration-200 w-full hover:bg-black hover:text-white ${
                selectedSize === size
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
          {safeSizes.length > SIDEBAR_LIST_LIMIT && (
            <button
              type="button"
              onClick={() => setSizeExpanded((prev) => !prev)}
              className="py-2 text-sm font-medium text-orange-500 rounded hover:text-orange-600 transition-colors w-full hover:bg-orange-500 hover:text-white"
            >
              {sizeExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>

      {/* Color Filter */}
      <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-4">
          Color
        </h3>
        <div className="flex flex-col gap-4">
          {(colorExpanded ? safeColors : safeColors.slice(0, SIDEBAR_LIST_LIMIT)).map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`py-2 text-sm font-medium rounded transition-all duration-200 w-full hover:bg-black hover:text-white ${
                selectedColor === color
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
          {safeColors.length > SIDEBAR_LIST_LIMIT && (
            <button
              type="button"
              onClick={() => setColorExpanded((prev) => !prev)}
              className="py-2 text-sm font-medium text-orange-500 rounded hover:text-orange-600 transition-colors  w-full hover:bg-orange-500 hover:text-white"
            >
              {colorExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>

      {/* Season Filter - seasons can be [{value, label}] or string[] */}
      <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-4">
          Season
        </h3>
        <div className="flex flex-col gap-4">
          {(seasonExpanded ? seasonItems : seasonItems.slice(0, SIDEBAR_LIST_LIMIT)).map((item) => (
            <button
              key={item.value}
              onClick={() => onSeasonChange(item.value)}
              className={`py-2 text-sm font-medium rounded transition-all duration-200 w-full hover:bg-black hover:text-white ${
                selectedSeason === item.value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {item.label}
            </button>
          ))}
          {seasonItems.length > SIDEBAR_LIST_LIMIT && (
            <button
              type="button"
              onClick={() => setSeasonExpanded((prev) => !prev)}
              className="py-2 text-sm font-medium text-orange-500 rounded hover:text-orange-600 transition-colors w-full hover:bg-orange-500 hover:text-white"
            >
              {seasonExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
