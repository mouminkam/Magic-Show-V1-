# Backend API Complete Specification

**Project:** Magic Show E-Commerce
**Version:** 1.0
**Base URL:** `https://api.yourdomain.com/api/v1`

---

## 📋 Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Authentication APIs](#authentication-apis)
3. [Home Page APIs](#home-page-apis)
4. [Shop APIs](#shop-apis)
5. [Product Details APIs](#product-details-apis)
6. [Blog APIs](#blog-apis)
7. [About Us APIs](#about-us-apis)
8. [Stores APIs](#stores-apis)
9. [Contact APIs](#contact-apis)
10. [Cart APIs](#cart-apis)
11. [Quick Reference](#quick-reference)

---

## 🔧 General Guidelines

### Base URL
```
https://api.yourdomain.com/api/v1
```

### Common Headers
```http
Accept-Language: ar|en        # Required for all requests
Content-Type: application/json
Authorization: Bearer {token}  # Required for protected routes
```

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "optional",
  "meta": { "pagination": {} }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

### Pagination Format
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

## 🔐 Authentication APIs

### 1. POST `/auth/login`
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### 2. POST `/auth/register`
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "phone": "+963123456789",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}

Response: Same as login
```

### 3. POST `/auth/logout`
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. GET `/auth/me`
```http
GET /api/v1/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

---

## 🏠 Home Page APIs

### 1. GET `/home/hero`
```http
GET /api/v1/home/hero
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "badge": "EST. 2024",
    "title": "ELEGANT",
    "subtitle": "JEWELRY",
    "description": "Crafted with precision...",
    "ctaPrimary": "Shop Now",
    "ctaPrimaryLink": "/shop",
    "ctaSecondary": "View Collection",
    "ctaSecondaryLink": "/shop",
    "stats": [
      { "value": "100+", "label": "Designs" },
      { "value": "100%", "label": "Quality Guaranteed" }
    ],
    "image": "/images/img27.png",
    "socialLinks": [
      { "name": "facebook", "label": "Facebook", "icon": "Facebook", "href": "#" }
    ]
  }
}
```

### 2. GET `/home/about-us`
```http
GET /api/v1/home/about-us
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "ABOUT US",
    "backgroundImage": "/images/img04.jpg",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 3. GET `/home/featured-products`
```http
GET /api/v1/home/featured-products
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "featuredHeader": {
      "title": "FEATURED PRODUCTS",
      "subtitle": "MAGIC SHOE STILETTO",
      "description": "...",
      "buttonText": "See more",
      "buttonLink": "#"
    },
    "onSaleHeader": { /* same structure */ },
    "featuredProducts": [
      {
        "image": "/images/img25.png",
        "alt": "Featured Product",
        "name": "Classic Heel Collection",
        "originalPrice": "299.99",
        "discountedPrice": "199.99",
        "width": 600,
        "height": 800,
        "colSpan": "md:col-span-2",
        "rowSpan": "xl:row-span-2"
      }
    ],
    "onSaleProducts": [ /* same structure */ ]
  }
}
```

### 4. GET `/home/blog-section`
```http
GET /api/v1/home/blog-section
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "backgroundImage": "/images/img31.jpg",
    "title": "BLOGS",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 5. GET `/home/latest-blog`
```http
GET /api/v1/home/latest-blog
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "Latest Blog",
    "description": "There are many variations...",
    "posts": [
      {
        "id": 1,
        "title": "Lorem ipsum dolor...",
        "image": "/images/img20.jpg",
        "date": "27, Jun 2030",
        "author": "Oaklee Odom"
      }
    ]
  }
}
```

### 6. GET `/categories?featured=true`
```http
GET /api/v1/categories?featured=true
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "name": "Heels",
      "image": "/images/img25.png",
      "slug": "heels"
    }
  ]
}
```

### 7. GET `/products?sort=newest&limit=6`
```http
GET /api/v1/products?sort=newest&limit=6
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "header": {
      "title": "New Arrivals",
      "subtitle": "Latest Collection",
      "description": "Be the first to discover...",
      "buttonText": "View All",
      "buttonLink": "/shop?sort=newest"
    },
    "products": [
      {
        "id": 1,
        "name": "Elegant Stiletto Heel",
        "image": "/images/img25.png",
        "price": 249.99,
        "originalPrice": 299.99,
        "category": "Heels"
      }
    ]
  }
}
```

### 8. GET `/products?sort=bestseller&limit=6`
```http
GET /api/v1/products?sort=bestseller&limit=6
Accept-Language: ar

Response: Same structure as above with "Best Sellers" header
```

### 9. GET `/products?onSale=true&limit=6`
```http
GET /api/v1/products?onSale=true&limit=6
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "header": { /* same as above */ },
    "products": [
      {
        "id": 9,
        "name": "Classic Heel Collection",
        "image": "/images/img26.png",
        "price": 199.99,
        "originalPrice": 299.99,
        "category": "Heels",
        "discount": 33
      }
    ]
  }
}
```

### 10. GET `/home/why-choose-us`
```http
GET /api/v1/home/why-choose-us
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "icon": "Truck",
      "title": "Free Shipping",
      "description": "Free shipping on orders over $100"
    },
    {
      "icon": "Shield",
      "title": "Quality Guaranteed",
      "description": "100% authentic products with warranty"
    },
    {
      "icon": "RotateCcw",
      "title": "Easy Returns",
      "description": "30-day return policy, hassle-free"
    },
    {
      "icon": "HeadphonesIcon",
      "title": "24/7 Support",
      "description": "Round-the-clock customer service"
    }
  ]
}
```

### 11. GET `/reviews?featured=true&limit=6`
```http
GET /api/v1/reviews?featured=true&limit=6
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "text": "Absolutely love my new heels!",
      "comment": "Absolutely love my new heels!",
      "image": "/images/img25.png",
      "productImage": "/images/img25.png",
      "rating": 5,
      "date": "2 weeks ago"
    }
  ]
}
```

---

## 🛍️ Shop APIs

### 1. GET `/shop/banner`
```http
GET /api/v1/shop/banner
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "SHOP",
    "backgroundImage": "/images/img04.jpg",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 2. GET `/shop/products`
**CRITICAL: Apply filters BEFORE pagination**

```http
GET /api/v1/shop/products?page=1&limit=6&category=Sneakers&size=40&color=Brown&season=Summer&minPrice=30&maxPrice=40
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "name": "Sport Brown Sneakers",
        "category": "Shoes, Sneakers",
        "price": 35,
        "originalPrice": null,
        "discount": null,
        "image": "/images/img20.jpg",
        "sizes": ["36", "37", "38", "39", "40"],
        "colors": ["Brown"],
        "seasons": ["Summer", "Spring"]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "limit": 6,
      "totalItems": 12,
      "totalPages": 2
    }
  }
}
```

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 6)
- `category`: string (optional)
- `size`: string (optional)
- `color`: string (optional)
- `season`: string (optional)
- `minPrice`: number (optional)
- `maxPrice`: number (optional)

### 3. GET `/shop/categories`
```http
GET /api/v1/shop/categories
Accept-Language: ar

Response:
{
  "success": true,
  "data": ["All", "Collection", "Heels", "Flats", "Boots", "Sandals", "Sneakers", "Bags"]
}
```

### 4. GET `/shop/filters`
```http
GET /api/v1/shop/filters
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "sizes": ["36", "37", "38", "39", "40", "41"],
    "colors": ["White", "Blue", "Green", "Silver"],
    "seasons": ["Summer", "Spring", "Autumn", "Winter"],
    "priceRange": {
      "min": 35,
      "max": 45
    }
  }
}
```

---

## 📦 Product Details APIs

### 1. GET `/shop/products/{productId}`
```http
GET /api/v1/shop/products/1
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "id": "1",
    "name": "KENNETH JAY LANE",
    "description": "Gold-plated necklace",
    "price": 160.0,
    "originalPrice": 320.0,
    "discount": 50,
    "code": "698309",
    "images": [
      "/images/img20.jpg",
      "/images/img04.jpg"
    ],
    "sizes": ["s", "m", "l", "xl"],
    "colors": ["gold"],
    "descriptionText": "Pharetra, erat sed fermentum...",
    "rating": 4,
    "bannerData": {
      "title": "Product Detail",
      "backgroundImage": "/images/img04.jpg",
      "leftBadge": "SALE OF 50%",
      "rightBadge": "TRENDS FOR 2024"
    }
  }
}
```

### 2. GET `/shop/products/{productId}/related`
```http
GET /api/v1/shop/products/1/related
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Goldtone Bib",
      "price": 200,
      "likes": 45,
      "image": "/images/img04.jpg"
    }
  ]
}
```

---

## 📝 Blog APIs

### 1. GET `/blog/banner`
```http
GET /api/v1/blog/banner
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "backgroundImage": "/images/img31.jpg",
    "title": "BLOGS",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 2. GET `/blog/posts`
```http
GET /api/v1/blog/posts?page=1
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Lorem ipsum dolor...",
        "excerpt": "Short description...",
        "image": "/images/img20.jpg",
        "date": "27, Jun 2030"
      }
    ],
    "currentPage": 1,
    "totalPages": 5
  }
}
```

### 3. GET `/blog/posts/{postId}`
```http
GET /api/v1/blog/posts/1
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Simply Tips for Beauty",
    "content": "<p>HTML content here...</p>",
    "image": "/images/img24.jpg",
    "date": "FEBRUARY 3, 2016"
  }
}
```

### 4. GET `/blog/posts/{postId}/comments`
```http
GET /api/v1/blog/posts/1/comments
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "author": "John Doe",
      "comment": "Great post!",
      "date": "2024-01-15"
    }
  ]
}
```

### 5. POST `/blog/posts/{postId}/comments`
```http
POST /api/v1/blog/posts/1/comments
Content-Type: application/json
Accept-Language: ar

{
  "author": "John Doe",
  "email": "john@example.com",
  "comment": "Great post!"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "author": "John Doe",
    "comment": "Great post!",
    "date": "2024-01-15"
  }
}
```

---

## 👥 About Us APIs

### 1. GET `/about/team-members`
```http
GET /api/v1/about/team-members
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "name": "Christine Jensen",
      "role": "Art Director",
      "image": "/images/img08.jpg"
    }
  ]
}
```

### 2. GET `/about/testimonials`
```http
GET /api/v1/about/testimonials
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "name": "Press Spaceba",
      "image": "/images/img09.jpg",
      "text": "Pharetra, erat sed fermentum..."
    }
  ]
}
```

### 3. GET `/about/description`
```http
GET /api/v1/about/description
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "LOVE JEWELRY",
    "description": "Pharetra, erat sed fermentum...",
    "image": "/images/img20.jpg",
    "features": [
      "Pharetra, erat sed fermentum feugiat.",
      "Spendisse in orci enim pharetra."
    ],
    "buttonText": "Read more"
  }
}
```

### 4. GET `/about/stats`
```http
GET /api/v1/about/stats
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "icon": "Users",
      "title": "SUBSCRIBERS",
      "value": 198.9,
      "suffix": "k"
    },
    {
      "icon": "Instagram",
      "title": "INSTAGRAM FOLLOWERS",
      "value": 201.5,
      "suffix": "k"
    },
    {
      "icon": "ShoppingBag",
      "title": "PIECES SOLD",
      "value": 23.741,
      "suffix": "k"
    }
  ]
}
```

---

## 📍 Stores APIs

### 1. GET `/stores/banner`
```http
GET /api/v1/stores/banner
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "WHERE TO FIND US",
    "backgroundImage": "/images/img04.jpg",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 2. GET `/stores`
```http
GET /api/v1/stores
Accept-Language: ar

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "JEWELRY BOUTIQUE",
      "manager": "Store Manager",
      "address": "Syria, Damascus",
      "phone": "+963 123 456 789",
      "email": "support@jewelry.com",
      "hours": "9:00 AM – 7:00 PM",
      "lat": 33.5104,
      "lng": 36.1893,
      "mapUrl": "https://www.google.com/maps/embed?pb=..."
    }
  ]
}
```

---

## 📧 Contact APIs

### 1. GET `/contact/hero`
```http
GET /api/v1/contact/hero
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "CONTACT US",
    "backgroundImage": "/images/img04.jpg",
    "leftBadge": "SALE OF 50%",
    "rightBadge": "TRENDS FOR 2024"
  }
}
```

### 2. GET `/contact/map`
```http
GET /api/v1/contact/map
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "mapUrl": "https://www.google.com/maps/embed?pb=..."
  }
}
```

### 3. GET `/contact/details`
```http
GET /api/v1/contact/details
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "title": "CONTACT INFO",
    "address": "Syria, Damascus",
    "email": "support@jewelry.com",
    "phone": "+963 123 456 789",
    "fax": "+963 123 456 789",
    "aboutTitle": "ABOUT US",
    "aboutText": "We are a leading jewelry company..."
  }
}
```

### 4. POST `/contact/send-message`
```http
POST /api/v1/contact/send-message
Content-Type: application/json
Accept-Language: ar

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}

Response:
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## 🛒 Cart APIs

### 1. GET `/cart`
```http
GET /api/v1/cart
Authorization: Bearer {token}
Accept-Language: ar

Response:
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "Product Name",
        "price": 100,
        "quantity": 2,
        "image": "/images/img01.jpg",
        "size": "M",
        "color": "Blue"
      }
    ],
    "total": 200
  }
}
```

### 2. POST `/cart`
```http
POST /api/v1/cart
Authorization: Bearer {token}
Content-Type: application/json
Accept-Language: ar

{
  "productId": 1,
  "quantity": 2,
  "size": "M",
  "color": "Blue"
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "productId": 1,
    "quantity": 2
  }
}
```

### 3. PUT `/cart/{itemId}`
```http
PUT /api/v1/cart/1
Authorization: Bearer {token}
Content-Type: application/json
Accept-Language: ar

{
  "quantity": 3
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "quantity": 3
  }
}
```

### 4. DELETE `/cart/{itemId}`
```http
DELETE /api/v1/cart/1
Authorization: Bearer {token}
Accept-Language: ar

Response:
{
  "success": true,
  "message": "Item removed from cart"
}
```

### 5. DELETE `/cart`
```http
DELETE /api/v1/cart
Authorization: Bearer {token}
Accept-Language: ar

Response:
{
  "success": true,
  "message": "Cart cleared"
}
```

### 6. POST `/cart/validate-coupon`
```http
POST /api/v1/cart/validate-coupon
Authorization: Bearer {token}
Content-Type: application/json
Accept-Language: ar

{
  "couponCode": "SUMMER2024"
}

Response:
{
  "success": true,
  "data": {
    "valid": true,
    "discount": 20,
    "message": "Coupon applied successfully"
  }
}
```

### 7. POST `/cart/checkout`
```http
POST /api/v1/cart/checkout
Authorization: Bearer {token}
Content-Type: application/json
Accept-Language: ar

{
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price": 100
    }
  ],
  "couponCode": "SUMMER2024",
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "Damascus",
    "country": "Syria",
    "phone": "+963123456789"
  },
  "paymentMethod": "credit_card"
}

Response:
{
  "success": true,
  "data": {
    "orderId": "ORD-123456",
    "total": 180,
    "message": "Order placed successfully"
  }
}
```

---

## 📚 Quick Reference

### All Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| **Authentication** |
| POST | `/auth/login` | No | User login |
| POST | `/auth/register` | No | User registration |
| POST | `/auth/logout` | Yes | User logout |
| GET | `/auth/me` | Yes | Get current user |
| **Home Page** |
| GET | `/home/hero` | No | Hero section data |
| GET | `/home/about-us` | No | About section banner |
| GET | `/home/featured-products` | No | Featured & on-sale products |
| GET | `/home/blog-section` | No | Blog section banner |
| GET | `/home/latest-blog` | No | Latest blog posts |
| GET | `/categories?featured=true` | No | Featured categories |
| GET | `/products?sort=newest&limit=6` | No | New arrivals |
| GET | `/products?sort=bestseller&limit=6` | No | Best sellers |
| GET | `/products?onSale=true&limit=6` | No | Special offers |
| GET | `/home/why-choose-us` | No | Why choose us features |
| GET | `/reviews?featured=true&limit=6` | No | Customer reviews |
| **Shop** |
| GET | `/shop/banner` | No | Shop page banner |
| GET | `/shop/products` | No | Products with filters & pagination |
| GET | `/shop/categories` | No | All categories |
| GET | `/shop/filters` | No | Available filters |
| **Product Details** |
| GET | `/shop/products/{id}` | No | Product details |
| GET | `/shop/products/{id}/related` | No | Related products |
| **Blog** |
| GET | `/blog/banner` | No | Blog page banner |
| GET | `/blog/posts` | No | Blog posts with pagination |
| GET | `/blog/posts/{id}` | No | Post details |
| GET | `/blog/posts/{id}/comments` | No | Post comments |
| POST | `/blog/posts/{id}/comments` | No | Add comment |
| **About Us** |
| GET | `/about/team-members` | No | Team members |
| GET | `/about/testimonials` | No | Customer testimonials |
| GET | `/about/description` | No | Company description |
| GET | `/about/stats` | No | Company statistics |
| **Stores** |
| GET | `/stores/banner` | No | Stores page banner |
| GET | `/stores` | No | All store locations |
| **Contact** |
| GET | `/contact/hero` | No | Contact page banner |
| GET | `/contact/map` | No | Map URL |
| GET | `/contact/details` | No | Contact information |
| POST | `/contact/send-message` | No | Send contact message |
| **Cart** |
| GET | `/cart` | Yes | Get cart items |
| POST | `/cart` | Yes | Add item to cart |
| PUT | `/cart/{itemId}` | Yes | Update cart item |
| DELETE | `/cart/{itemId}` | Yes | Remove cart item |
| DELETE | `/cart` | Yes | Clear cart |
| POST | `/cart/validate-coupon` | Yes | Validate coupon |
| POST | `/cart/checkout` | Yes | Checkout |

---

## 🎯 Implementation Notes

### Critical Rules

1. **Language Support**: All endpoints MUST support `Accept-Language` header (ar, en)
2. **Pagination**: Apply filters BEFORE pagination in `/shop/products`
3. **Authentication**: Use JWT tokens in `Authorization: Bearer {token}` header
4. **Error Handling**: Return consistent error format with proper HTTP status codes
5. **Image URLs**: Return absolute URLs for all images
6. **Price Range**: Calculate dynamically from database in `/shop/filters`

### Filter Logic for `/shop/products`

```
1. Apply category filter (if provided)
2. Apply price range filter (if provided)
3. Apply size filter (if provided)
4. Apply color filter (if provided)
5. Apply season filter (if provided)
6. Count totalItems (after filtering)
7. Calculate totalPages = Math.ceil(totalItems / limit)
8. Apply pagination (skip = (page - 1) * limit)
9. Return paginated results
```

### Response Time Targets

- Simple GET requests: < 200ms
- Complex queries with filters: < 500ms
- POST/PUT/DELETE: < 300ms

---

**End of Specification**
