import { formatDate, formatNumber, truncateText, capitalize } from './formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats Date object', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toMatch(/January 15, 2024/);
    });

    it('formats date string', () => {
      expect(formatDate('2024-06-20')).toMatch(/June 20, 2024/);
    });

    it('accepts locale parameter', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'ar-EG');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatNumber', () => {
    it('formats number with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('handles zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'Hello World This Is Long';
      expect(truncateText(text, 10)).toBe('Hello Worl...');
    });

    it('returns full text when shorter than length', () => {
      const text = 'Hi';
      expect(truncateText(text, 10)).toBe('Hi');
    });

    it('uses custom suffix', () => {
      const text = 'Hello World';
      expect(truncateText(text, 5, '…')).toBe('Hello…');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });
});
