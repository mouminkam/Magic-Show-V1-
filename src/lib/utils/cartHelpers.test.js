import {
  calculateSubtotal,
  calculateTotal,
  calculateItemCount,
  formatPrice,
} from './cartHelpers';

describe('cartHelpers', () => {
  const sampleItems = [
    { id: 1, price: 10, quantity: 2 },
    { id: 2, price: 5, quantity: 3 },
  ];

  describe('calculateSubtotal', () => {
    it('calculates subtotal correctly', () => {
      expect(calculateSubtotal(sampleItems)).toBe(35); // 10*2 + 5*3
    });

    it('returns 0 for empty array', () => {
      expect(calculateSubtotal([])).toBe(0);
    });
  });

  describe('calculateTotal', () => {
    it('calculates total with default tax', () => {
      const total = calculateTotal(sampleItems);
      expect(total).toBeCloseTo(35 * 1.07, 2);
    });

    it('uses custom tax rate', () => {
      const total = calculateTotal(sampleItems, 0.1);
      expect(total).toBe(38.5);
    });
  });

  describe('calculateItemCount', () => {
    it('counts total items', () => {
      expect(calculateItemCount(sampleItems)).toBe(5);
    });

    it('returns 0 for empty array', () => {
      expect(calculateItemCount([])).toBe(0);
    });
  });

  describe('formatPrice', () => {
    it('formats USD by default', () => {
      const result = formatPrice(99.99);
      expect(result).toMatch(/\$|99\.99|99,99/);
    });

    it('accepts currency parameter', () => {
      const result = formatPrice(100, 'EUR');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
