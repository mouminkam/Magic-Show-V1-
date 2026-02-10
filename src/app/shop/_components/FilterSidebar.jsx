"use client";

import { useState } from "react";
import { Range } from "react-range";

const SIDEBAR_LIST_LIMIT = 5;

export default function FilterSidebar({
  priceRange,
  onPriceRangeChange,
  availablePriceRange,
  isPending,
  isPriceDebouncing,
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

  const pct = (v) => {
    const denom = rangeMax - rangeMin;
    if (!Number.isFinite(denom) || denom <= 0) return 0;
    return ((v - rangeMin) / denom) * 100;
  };

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const handleMinInput = (raw) => {
    const parsed = raw === "" ? "" : Number(raw);
    if (parsed === "" || Number.isNaN(parsed)) return;
    const nextMin = clamp(parsed, rangeMin, priceRange.max);
    onPriceRangeChange({ min: nextMin, max: priceRange.max });
  };

  const handleMaxInput = (raw) => {
    const parsed = raw === "" ? "" : Number(raw);
    if (parsed === "" || Number.isNaN(parsed)) return;
    const nextMax = clamp(parsed, priceRange.min, rangeMax);
    onPriceRangeChange({ min: priceRange.min, max: nextMax });
  };

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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold uppercase tracking-wide text-gray-900">
            Price
          </h3>
          <div className="text-xs font-semibold text-gray-500 tracking-wide">
            USD
          </div>
        </div>

        <div
          className={`space-y-4 rounded-xl border border-gray-200 bg-white p-4 transition-all ${
            isPending || isPriceDebouncing ? "opacity-80" : "opacity-100"
          }`}
        >
          <div className="py-1">
            <Range
              step={1}
              min={rangeMin}
              max={rangeMax}
              values={values}
              onChange={handleChange}
              renderTrack={({ props, children }) => {
                const { key, ref, onMouseDown, onTouchStart, style, ...restProps } = props;
                return (
                  <div
                    key={key}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    className="w-full"
                    style={style}
                  >
                    <div
                      ref={ref}
                      {...restProps}
                      className="relative h-1.5 w-full rounded-full bg-gray-200"
                    >
                      <div
                        className="absolute inset-y-0 rounded-full bg-gray-900"
                        style={{
                          left: `${pct(values[0])}%`,
                          width: `${pct(values[1]) - pct(values[0])}%`,
                        }}
                      />
                      {children}
                    </div>
                  </div>
                );
              }}
              renderThumb={({ props, isDragged }) => {
                const { key, ...restProps } = props;
                return (
                  <div
                    key={key}
                    {...restProps}
                    className="flex items-center justify-center touch-manipulation"
                    style={{
                      ...restProps.style,
                      outline: "none",
                    }}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border border-gray-900 bg-white shadow-sm transition-all duration-150 ${
                        isDragged ? "scale-110" : "hover:shadow-md"
                      }`}
                    />
                  </div>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-600">Min</span>
              <input
                inputMode="numeric"
                value={String(priceRange.min)}
                onChange={(e) => handleMinInput(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-600">Max</span>
              <input
                inputMode="numeric"
                value={String(priceRange.max)}
                onChange={(e) => handleMaxInput(e.target.value)}
                className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-gray-900/10"
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 font-semibold">
            <span>${priceRange.min}</span>
            <span className={isPending || isPriceDebouncing ? "animate-pulse" : ""}>
              ${priceRange.max}
            </span>
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
