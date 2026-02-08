import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './authSchemas';

describe('authSchemas', () => {
  describe('loginSchema', () => {
    it('accepts valid login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'invalid',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('rejects short password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '12345',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('registerSchema', () => {
    it('accepts valid register data', () => {
      const result = registerSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects mismatched passwords', () => {
      const result = registerSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('accepts valid email', () => {
      const result = forgotPasswordSchema.safeParse({
        email: 'user@example.com',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('resetPasswordSchema', () => {
    it('accepts valid reset data', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects mismatched passwords', () => {
      const result = resetPasswordSchema.safeParse({
        password: 'newpass123',
        confirmPassword: 'different',
      });
      expect(result.success).toBe(false);
    });
  });
});
