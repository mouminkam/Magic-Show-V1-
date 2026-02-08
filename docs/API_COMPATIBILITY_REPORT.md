# تقرير التوافق بين الفرونتند والباكند

**تاريخ:** فبراير 2026

## 1. إعداد Base URL

الباكند يستخدم المسار: `/api/v1/...`

**مطلوب في `.env.local`:**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

إذا لم يُضبط، الـ axios يستخدم `/api` كافتراضي — وهذا **لن يعمل** مع Laravel إلا إذا كان هناك proxy.

---

## 2. جدول التوافق - Endpoints

| الفرونتند (api/index.js) | الباكند (routes/api.php) | الحالة |
|--------------------------|--------------------------|--------|
| `POST /auth/login` | `POST /auth/login` | ✅ |
| `POST /auth/register` | `POST /auth/register` | ✅ |
| `POST /auth/logout` | `POST /auth/logout` | ✅ (يحتاج token) |
| `GET /auth/user` | `GET /auth/user` | ✅ (يحتاج token) |
| `PUT /auth/profile` | `PUT /auth/profile` | ✅ (يحتاج token) |
| `POST /auth/forgot-password` | `POST /auth/forgot-password` | ✅ |
| `POST /auth/reset-password` | `POST /auth/reset-password` | ✅ |
| `GET /products` | `GET /products` | ✅ |
| `GET /products/:id` | `GET /products/:id` | ✅ |
| `GET /cart` | `GET /cart` | ✅ |
| `POST /cart` | `POST /cart` | ✅ (product_id, quantity) |
| `PUT /cart/:itemId` | `PUT /cart/:itemId` | ✅ |
| `DELETE /cart/:itemId` | `DELETE /cart/:itemId` | ✅ |
| `DELETE /cart` | `DELETE /cart` | ✅ |
| `POST /cart/validate-coupon` | `POST /cart/validate-coupon` | ✅ (coupon_code) |
| `POST /cart/checkout` | `POST /cart/checkout` | ✅ (يحتاج token) |
| `POST /newsletter/subscribe` | `POST /newsletter/subscribe` | ✅ (email) |
| `POST /newsletter/unsubscribe` | `POST /newsletter/unsubscribe` | ✅ (email) |
| `GET /orders` | `GET /orders` | ✅ (يحتاج token) |
| `GET /orders/:id` | `GET /orders/:id` | ✅ (يحتاج token) |
| `GET /wishlist` | `GET /wishlist` | ✅ (يحتاج token) |
| `POST /wishlist` | `POST /wishlist` | ✅ (product_id) |
| `DELETE /wishlist/:productId` | `DELETE /wishlist/:productId` | ✅ |

---

## 3. تنسيق الطلبات والاستجابات

### Auth Login
- **Request:** `{ email, password }`
- **Response:** `{ success, data: { customer, access_token, token_type } }`
- **الفرونتند:** يقرأ `data.customer` و `data.access_token` ✅

### Auth Register
- **Request:** `{ first_name, last_name, email, phone, password, password_confirmation }`
- **Response:** `{ success, data: { customer, access_token } }`
- **الفرونتند:** يرسل الحقول الصحيحة ✅

### Cart Add
- **Request:** `{ product_id, quantity, size?, color? }`
- **الفرونتند:** يرسل `product_id` ✅

### Cart Validate Coupon
- **Request:** `{ coupon_code }`
- **الفرونتند:** يرسل `{ code }` ويُحوَّل إلى `coupon_code` ✅

### Checkout
- **Request:** `{ items: [{ id, quantity, price }], shipping_address, payment_method, coupon_code? }`
- **payment_method:** `cash` | `bank_transfer` | `card` | `paypal` | `stripe`
- **الفرونتند:** يرسل التنسيق الصحيح ✅

### Newsletter Subscribe
- **Request:** `{ email }`
- **الفرونتند:** يرسل `{ email }` ✅

---

## 4. نقاط تحتاج انتباه

1. **Accept-Language:** الفرونتند يضيفه عبر axios interceptor (من cookies) — الباكند يتوقعه.
2. **Token:** يُحفظ في `localStorage` كـ `auth-token` ويُرسل كـ `Authorization: Bearer {token}`.
3. **الـ middleware** يحمي `/cart`, `/checkout`, `/profile`, `/wishlist` — لكن الـ token يُقرأ من cookies في الـ middleware، والفرونتند يحفظه في localStorage. قد تحتاج مزامنة إذا أردت حماية من جهة السيرفر.
4. **Products search:** الباكند يقبل `?search=query` — الفرونتند يمرره عبر `params` ✅.

---

## 5. تشغيل اختبار الـ APIs

```bash
# تأكد أن الباكند يعمل على http://localhost:8000
npm run test:api
```

أو مع URL مخصص:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1 npm run test:api
```
