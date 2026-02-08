# AI Prompt for Backend Development - Magic Show E-Commerce

استخدم هذا الملف كـ prompt للـ AI/IDE لإنشاء الـ Backend APIs.

---

## 📋 Task Description

أنشئ Backend APIs كاملة لمشروع Magic Show E-Commerce بناءً على المواصفات التالية.

---

## 🎯 Requirements

### Base Configuration
```
Base URL: /api/v1
Language Support: Arabic (ar), English (en) via Accept-Language header
Authentication: JWT Token-based
Database: Your choice (MongoDB, PostgreSQL, MySQL, etc.)
```

### Response Format
```json
Success:
{
  "success": true,
  "data": {},
  "message": "optional",
  "meta": { "pagination": {} }
}

Error:
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

---

## 📊 APIs to Implement (43 Endpoints)

### 🔐 Authentication (4 endpoints)
```
POST   /auth/login              - Login with email/password, return JWT token
POST   /auth/register           - Register new user
POST   /auth/logout             - Logout (invalidate token)
GET    /auth/me                 - Get current user info (protected)
```

### 🏠 Home Page (11 endpoints)
```
GET    /home/hero                        - Hero section data
GET    /home/about-us                    - About section banner
GET    /home/featured-products           - Featured & on-sale products
GET    /home/blog-section                - Blog section banner
GET    /home/latest-blog                 - Latest blog posts
GET    /home/why-choose-us               - Why choose us features
GET    /categories?featured=true         - Featured categories
GET    /products?sort=newest&limit=6     - New arrivals
GET    /products?sort=bestseller&limit=6 - Best sellers
GET    /products?onSale=true&limit=6     - Special offers
GET    /reviews?featured=true&limit=6    - Customer reviews
```

### 🛍️ Shop (4 endpoints)
```
GET    /shop/banner              - Shop page banner
GET    /shop/products            - Products with filters & pagination
       Filters: page, limit, category, size, color, season, minPrice, maxPrice
       CRITICAL: Apply filters BEFORE pagination
GET    /shop/categories          - All categories list
GET    /shop/filters             - Available filters (sizes, colors, seasons, priceRange)
```

### 📦 Product Details (2 endpoints)
```
GET    /shop/products/{id}         - Product details
GET    /shop/products/{id}/related - Related products (6 items)
```

### 📝 Blog (5 endpoints)
```
GET    /blog/banner                - Blog page banner
GET    /blog/posts?page=1          - Blog posts with pagination
GET    /blog/posts/{id}            - Post details
GET    /blog/posts/{id}/comments   - Post comments
POST   /blog/posts/{id}/comments   - Add comment
```

### 👥 About Us (4 endpoints)
```
GET    /about/team-members    - Team members list
GET    /about/testimonials    - Customer testimonials
GET    /about/description     - Company description
GET    /about/stats           - Company statistics
```

### 📍 Stores (2 endpoints)
```
GET    /stores/banner    - Stores page banner
GET    /stores           - All store locations with maps
```

### 📧 Contact (4 endpoints)
```
GET    /contact/hero         - Contact page banner
GET    /contact/map          - Map URL
GET    /contact/details      - Contact information
POST   /contact/send-message - Send contact message
```

### 🛒 Cart (7 endpoints - All Protected)
```
GET    /cart                  - Get cart items
POST   /cart                  - Add item to cart
PUT    /cart/{itemId}         - Update cart item quantity
DELETE /cart/{itemId}         - Remove cart item
DELETE /cart                  - Clear cart
POST   /cart/validate-coupon  - Validate coupon code
POST   /cart/checkout         - Checkout
```

---

## ⚠️ Critical Implementation Rules

### 1. Language Support (MANDATORY)
```
- ALL endpoints MUST support Accept-Language header
- Supported languages: ar (Arabic), en (English)
- Return all text content in requested language
- Default to 'en' if header not provided
```

### 2. Filtering Logic for /shop/products (CRITICAL)
```
Order of operations:
1. Apply category filter (if provided)
2. Apply price range filter (minPrice, maxPrice)
3. Apply size filter
4. Apply color filter
5. Apply season filter
6. Count totalItems (AFTER filtering)
7. Calculate totalPages = Math.ceil(totalItems / limit)
8. Apply pagination: skip = (page - 1) * limit
9. Return paginated results

Example SQL:
SELECT * FROM products
WHERE category LIKE '%Sneakers%'
  AND price >= 30 AND price <= 40
  AND size = '40'
  AND color = 'Brown'
  AND season = 'Summer'
ORDER BY id
LIMIT 6 OFFSET 0;
```

### 3. Price Range Calculation (DYNAMIC)
```
In /shop/filters endpoint:
- Calculate min/max prices from database
- SQL: SELECT MIN(price), MAX(price) FROM products
- Return dynamic values, not hardcoded
```

### 4. Image URLs (ABSOLUTE)
```
✅ Correct: "https://cdn.yourdomain.com/images/product1.jpg"
❌ Wrong: "/images/product1.jpg"
```

### 5. Authentication
```
- Use JWT tokens
- Token in header: Authorization: Bearer {token}
- Token expiry: 24 hours (configurable)
- Protected endpoints: /auth/me, /auth/logout, all /cart endpoints
```

### 6. Pagination Format
```json
{
  "pagination": {
    "currentPage": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```

---

## 📝 Sample Data Structures

### Product
```json
{
  "id": 1,
  "name": "Sport Brown Sneakers",
  "category": "Shoes, Sneakers",
  "price": 35,
  "originalPrice": 40,
  "discount": 12.5,
  "image": "https://cdn.domain.com/images/img20.jpg",
  "images": ["url1", "url2"],
  "sizes": ["36", "37", "38", "39", "40"],
  "colors": ["Brown", "Black"],
  "seasons": ["Summer", "Spring"],
  "description": "Product description",
  "code": "PROD-001",
  "rating": 4.5
}
```

### User
```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+963123456789",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Cart Item
```json
{
  "id": 1,
  "productId": 1,
  "name": "Product Name",
  "price": 100,
  "quantity": 2,
  "image": "https://cdn.domain.com/images/img01.jpg",
  "size": "M",
  "color": "Blue"
}
```

---

## 🚀 Implementation Steps

### Phase 1: Setup
1. Initialize project (Node.js/Express, NestJS, Laravel, Django, etc.)
2. Setup database
3. Configure JWT authentication
4. Setup i18n (internationalization)
5. Create base response handlers

### Phase 2: Core Features
1. Implement Authentication endpoints (4)
2. Implement Shop endpoints (4)
3. Implement Product Details endpoints (2)
4. Implement Cart endpoints (7)

### Phase 3: Content
1. Implement Home Page endpoints (11)
2. Implement Blog endpoints (5)
3. Implement About Us endpoints (4)

### Phase 4: Additional
1. Implement Stores endpoints (2)
2. Implement Contact endpoints (4)
3. Testing & optimization

---

## 📚 Full Documentation

For complete details with examples, see:
- **BACKEND_API_COMPLETE_SPEC.md** - Full specification with Request/Response examples
- **API_QUICK_REFERENCE.md** - Quick reference guide
- **api-endpoints.json** - JSON format for Postman import

---

## ✅ Checklist

Before considering the implementation complete, ensure:

- [ ] All 43 endpoints implemented
- [ ] Accept-Language header supported in all endpoints
- [ ] JWT authentication working for protected endpoints
- [ ] Filtering logic correct in /shop/products (filters before pagination)
- [ ] Price range calculated dynamically in /shop/filters
- [ ] Image URLs are absolute
- [ ] Pagination working correctly
- [ ] Error handling consistent across all endpoints
- [ ] All responses follow the standard format
- [ ] Database properly indexed for performance
- [ ] API tested with Postman/Insomnia

---

## 🎯 Success Criteria

The implementation is successful when:
1. All 43 endpoints return correct data
2. Frontend can connect and fetch data successfully
3. Authentication flow works (login, register, protected routes)
4. Shop filters and pagination work correctly
5. All endpoints support Arabic and English languages
6. Response times are acceptable (< 500ms for complex queries)

---

**Use this prompt with the full specification files for complete implementation.**
