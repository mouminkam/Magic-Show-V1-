# API Quick Reference - Magic Show E-Commerce

**Base URL:** `https://api.yourdomain.com/api/v1`

---

## 🔐 Authentication (4 endpoints)

```
POST   /auth/login              - User login
POST   /auth/register           - User registration
POST   /auth/logout             - User logout (Auth required)
GET    /auth/me                 - Get current user (Auth required)
```

---

## 🏠 Home Page (11 endpoints)

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

---

## 🛍️ Shop (4 endpoints)

```
GET    /shop/banner                      - Shop page banner
GET    /shop/products                    - Products with filters & pagination
       Query params: page, limit, category, size, color, season, minPrice, maxPrice
GET    /shop/categories                  - All categories
GET    /shop/filters                     - Available filters (sizes, colors, seasons, priceRange)
```

---

## 📦 Product Details (2 endpoints)

```
GET    /shop/products/{id}               - Product details
GET    /shop/products/{id}/related       - Related products
```

---

## 📝 Blog (5 endpoints)

```
GET    /blog/banner                      - Blog page banner
GET    /blog/posts?page=1                - Blog posts with pagination
GET    /blog/posts/{id}                  - Post details
GET    /blog/posts/{id}/comments         - Post comments
POST   /blog/posts/{id}/comments         - Add comment
```

---

## 👥 About Us (4 endpoints)

```
GET    /about/team-members               - Team members
GET    /about/testimonials               - Customer testimonials
GET    /about/description                - Company description
GET    /about/stats                      - Company statistics
```

---

## 📍 Stores (2 endpoints)

```
GET    /stores/banner                    - Stores page banner
GET    /stores                           - All store locations
```

---

## 📧 Contact (4 endpoints)

```
GET    /contact/hero                     - Contact page banner
GET    /contact/map                      - Map URL
GET    /contact/details                  - Contact information
POST   /contact/send-message             - Send contact message
```

---

## 🛒 Cart (7 endpoints - All require Auth)

```
GET    /cart                             - Get cart items
POST   /cart                             - Add item to cart
PUT    /cart/{itemId}                    - Update cart item quantity
DELETE /cart/{itemId}                    - Remove cart item
DELETE /cart                             - Clear cart
POST   /cart/validate-coupon             - Validate coupon code
POST   /cart/checkout                    - Checkout
```

---

## 📊 Summary

- **Total Endpoints:** 43
- **Public Endpoints:** 32
- **Protected Endpoints:** 11 (Auth required)
- **GET Requests:** 35
- **POST Requests:** 6
- **PUT Requests:** 1
- **DELETE Requests:** 2

---

## 🔑 Common Headers

All requests must include:
```http
Accept-Language: ar|en
Content-Type: application/json
```

Protected endpoints also require:
```http
Authorization: Bearer {token}
```

---

## 📝 Notes

1. **Language Support:** All endpoints support Arabic (ar) and English (en) via `Accept-Language` header
2. **Pagination:** Use `page` and `limit` query parameters
3. **Filtering:** Shop products support multiple filters (category, size, color, season, price range)
4. **Authentication:** JWT token-based authentication
5. **Image URLs:** All image paths should be absolute URLs

---

**For detailed request/response examples, see:** `BACKEND_API_COMPLETE_SPEC.md`
