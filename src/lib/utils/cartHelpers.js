/**
 * Calculate cart subtotal
 * @param {Array} items - Cart items
 * @returns {number} Subtotal
 */
export function calculateSubtotal(items) {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Calculate cart total with tax
 * @param {Array} items - Cart items
 * @param {number} taxRate - Tax rate (default 0.07 = 7%)
 * @returns {number} Total with tax
 */
export function calculateTotal(items, taxRate = 0.07) {
  const subtotal = calculateSubtotal(items);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}

/**
 * Calculate total number of items in cart
 * @param {Array} items - Cart items
 * @returns {number} Total item count
 */
export function calculateItemCount(items) {
  return items.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Format price with currency
 * @param {number} price - Price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price
 */
export function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}



