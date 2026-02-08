# Magic Show Frontend - التوثيق الشامل

**المشروع:** Magic Show E-Commerce Frontend  
**التقنية:** Next.js 16 + React 19  
**تاريخ التوثيق:** فبراير 2026

> **توثيق الباكند:** `Magic-Show Back-End/docs/BACKEND_COMPLETE_DOCUMENTATION.md`  
> **قائمة النواقص:** `PROJECT_MISSING_ITEMS_COMPLETE.md`

---

## جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [التقنيات والحزم](#التقنيات-والحزم)
3. [هيكل المشروع](#هيكل-المشروع)
4. [الصفحات والمسارات](#الصفحات-والمسارات)
5. [API والتكامل مع الباكند](#api-والتكامل-مع-الباكند)
6. [المكونات (Components)](#المكونات-components)
7. [إدارة الحالة (Stores)](#إدارة-الحالة-stores)
8. [Hooks](#hooks)
9. [الكاش وإعادة التحقق](#الكاش-وإعادة-التحقق)
10. [الترجمة (i18n)](#الترجمة-i18n)
11. [الإعدادات والمتغيرات](#الإعدادات-والمتغيرات)
12. [النواقص وأولويات التطوير](#النواقص-وأولويات-التطوير)

---

## نظرة عامة

### البنية المعمارية

المشروع يعتمد على **Next.js 16** مع App Router و **React 19**:

- **Server Components:** لجلب البيانات من API (createServerAxios + cachedServerApi)
- **Client Components:** للمكونات التفاعلية (use client)
- **التوجيه:** مسارات ديناميكية للـ blog و shop

### الميزات الرئيسية

| الميزة | الوصف |
|--------|-------|
| **التخزين المؤقت** | cachedServerApi مع unstable_cache + tags لإعادة التحقق عند الطلب |
| **الترجمة** | i18n (ar/en) عبر getLanguage، getTranslation، cookies |
| **المصادقة** | authStore + localStorage (auth-token، auth-user) |
| **السلة** | cartStore (localStorage) - غير مزامن مع API حالياً |
| **المفضلة** | wishlistStore + WishlistButton - مربوط بالـ API |

---

## التقنيات والحزم

### الحزم الأساسية

| الحزمة | الإصدار | الاستخدام |
|--------|---------|-----------|
| next | ^16.0.7 | إطار العمل |
| react | 19.2.0 | واجهة المستخدم |
| axios | ^1.7.9 | طلبات HTTP للـ API |
| zustand | ^5.0.2 | إدارة الحالة |
| framer-motion / motion | ^12.x | الرسوم المتحركة |
| lucide-react | ^0.546.0 | الأيقونات |
| tailwindcss | ^4 | التنسيق |
| swiper | ^11.1.14 | السلايدرز |
| react-hook-form | ^7.54.2 | النماذج |
| zod | ^3.24.1 | التحقق من المدخلات |

### حزم إضافية

| الحزمة | الاستخدام |
|--------|-----------|
| leaflet / react-leaflet | الخرائط (صفحة المتاجر) |
| lenis | التمرير السلس |
| gsap | الرسوم المتحركة |
| react-intersection-observer | الكشف عن العناصر |
| js-cookie | إدارة الكوكيز (اللغة) |

---

## هيكل المشروع

```
Magic-Show Front-End/
├── src/
│   ├── app/                    # App Router - الصفحات
│   │   ├── api/revalidate/     # On-demand revalidation
│   │   ├── about-us/
│   │   ├── blog/
│   │   ├── contact-us/
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── shop/
│   │   ├── shoping-cart/       # ملاحظة: خطأ إملائي (shopping)
│   │   ├── stores/
│   │   └── wishlist/
│   ├── api/                    # تكوين API
│   │   ├── config/
│   │   │   ├── axios.js        # Client-side axios
│   │   │   └── serverAxios.js  # Server-side axios
│   │   └── index.js            # دوال API (auth, cart, wishlist, products, orders)
│   ├── components/             # المكونات المشتركة
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── auth/
│   │   ├── ui/
│   │   └── WishlistButton/
│   ├── hooks/
│   ├── lib/                    # الأدوات المساعدة
│   ├── locales/                # ملفات الترجمة
│   └── store/                  # Zustand stores
├── public/
├── middleware.ts               # حماية المسارات
└── next.config.ts
```

---

## الصفحات والمسارات

| المسار | الصفحة | الحالة | ملاحظة |
|--------|--------|--------|--------|
| `/` | Home | ✅ | يجلب من home/* API |
| `/home` | Home (redirect) | ✅ | |
| `/about-us` | من نحن | ✅ | |
| `/blog` | المدونة | ✅ | |
| `/blog/[id]` | تفاصيل المقال | ✅ | |
| `/shop` | المتجر | ✅ | فلترة، تصنيفات |
| `/shop/[id]` | تفاصيل المنتج | ✅ | |
| `/contact-us` | اتصل بنا | ✅ | |
| `/stores` | المتاجر | ✅ | خريطة + قائمة |
| `/login` | تسجيل الدخول | ⚠️ | النموذج غير مربوط بالـ API |
| `/register` | التسجيل | ⚠️ | النموذج غير مربوط بالـ API |
| `/shoping-cart` | السلة | ⚠️ | localStorage فقط |
| `/wishlist` | المفضلة | ✅ | مربوط بالـ API |
| `/checkout` | الدفع | ❌ | غير موجود |
| `/profile` | الملف الشخصي | ❌ | غير موجود |
| `/forgot-password` | نسيت كلمة المرور | ❌ | غير موجود |

### المسارات المحمية (Middleware)

- `/cart`, `/checkout`, `/profile`, `/wishlist` — تتطلب تسجيل الدخول
- إعادة التوجيه إلى `/login?redirect=...` عند عدم وجود token

---

## API والتكامل مع الباكند

### تكوين Axios

| الملف | الاستخدام |
|-------|-----------|
| `api/config/axios.js` | Client-side: baseURL، token من localStorage، Accept-Language |
| `api/config/serverAxios.js` | Server-side: createServerAxios() مع لغة من cookies |

### دوال API (`api/index.js`)

| المجموعة | الدوال | الحالة |
|----------|--------|--------|
| **auth** | login, register, logout, getCurrentUser | ⚠️ getCurrentUser يستخدم /auth/me (Backend: /auth/user) |
| **products** | getAll, getById, getByCategory | ⚠️ getByCategory قد لا يطابق Backend |
| **cart** | getCart, addToCart, updateCartItem, removeFromCart, clearCart | ✅ جاهز - غير مستخدم |
| **wishlist** | getAll, add, remove, check | ✅ مستخدم |
| **orders** | getAll, getById, create | ✅ جاهز |

### تنسيق استجابة الباكند

```json
{
  "success": true,
  "data": {},
  "message": "optional",
  "meta": { "pagination": {} }
}
```

### فروقات مع الباكند

| Frontend | Backend | ملاحظة |
|----------|---------|--------|
| auth.getCurrentUser → /auth/me | Backend: GET /auth/user | تصحيح المسار |
| api يرجع customer | authStore يتوقع user | توحيد البنية |
| cart من localStorage | Cart API جاهز | ربط مطلوب |

---

## المكونات (Components)

### Header

| المكون | الوظيفة |
|--------|---------|
| HeaderActions | أيقونات: User، Wishlist، Cart، Language، Login |
| HeaderCart | عرض السلة مع العدد |
| HeaderSearch | بحث - غير مربوط بالـ API |
| HeaderNavigation | القائمة الرئيسية |
| HeaderMobileMenu | القائمة للموبايل |

### Footer

| المكون | الوظيفة |
|--------|---------|
| FooterBrand | الشعار والوصف |
| FooterContact | معلومات الاتصال |
| FooterInstagram | معرض إنستغرام |
| FooterBackToTop | زر العودة للأعلى |

### مكونات Auth

| المكون | الوظيفة |
|--------|---------|
| Protected | حماية المحتوى للمستخدمين المسجلين |
| GuestOnly | عرض المحتوى للزوار فقط |

### مكونات UI

| المكون | الوظيفة |
|--------|---------|
| OptimizedImage | صورة محسّنة مع Next/Image |
| ErrorBoundary | معالجة الأخطاء |
| LoadingSpinner | مؤشر التحميل |
| SectionSkeleton | هيكل تحميل للقسم |
| Toast | إشعارات |
| Map | خريطة Leaflet |

### WishlistButton

- يستخدم wishlistStore
- يظهر في: BestSellerCard، ProductCard، FeaturedProductCard، ProductSection، RelatedProductsSlider

---

## إدارة الحالة (Stores)

| Store | الوظيفة | التخزين |
|-------|---------|---------|
| **authStore** | user، token، isAuthenticated، login، logout | localStorage |
| **cartStore** | items، addItem، removeItem، updateQuantity، getTotal | localStorage |
| **wishlistStore** | items، add، remove، fetch من API | API + state |
| **toastStore** | success، error للإشعارات | state فقط |

---

## Hooks

| Hook | الوظيفة |
|------|---------|
| **useCart** | addToCart، removeFromCart، updateQuantity، getTotal، toggleCart |
| **useCategoryProducts** | جلب منتجات المتجر حسب الفئة |
| **useProductDetails** | جلب تفاصيل المنتج |
| **useApiCache** | كاش للطلبات (إن وجد) |

---

## الكاش وإعادة التحقق

### cachedServerApi (`lib/cachedServerApi.js`)

```javascript
cachedServerApi(keyParts, fn, revalidate, tags)
```

- **keyParts:** أجزاء مفتاح الكاش (مثل `['home', 'hero', lang]`)
- **fn:** دالة جلب البيانات
- **revalidate:** ثواني حتى إعادة التحقق (افتراضي من cacheConfig)
- **tags:** وسوم لإعادة التحقق عند الطلب (مثل `['home', 'shop']`)

### cacheConfig (`lib/cacheConfig.js`)

| المتغير | الوصف |
|---------|-------|
| CACHE_REVALIDATE | ثواني (dev: 15، prod: 60) |
| CACHE_ENABLED | تفعيل/تعطيل الكاش |

### On-Demand Revalidation

- **Route:** `POST /api/revalidate`
- **Body:** `{ secret, tags?, path? }`
- **يستدعيه:** Backend (FrontendRevalidationService) عند تحديث المحتوى

---

## الترجمة (i18n)

| الملف/الدالة | الوظيفة |
|---------------|---------|
| `locales/ar.json`, `en.json` | مفاتيح الترجمة |
| `lib/getLanguage.js` | جلب اللغة من cookies (Server) |
| `lib/getLanguageClient.js` | جلب اللغة (Client) |
| `locales/i18n/getTranslation.js` | `t(lang, key)` للترجمة |
| `i18n/config.js` | إعدادات i18n |

---

## الإعدادات والمتغيرات

### .env / .env.local

| المتغير | الوصف |
|---------|-------|
| NEXT_PUBLIC_API_BASE_URL | عنوان API (مثل http://localhost:8000/api/v1) |
| NEXT_PUBLIC_SITE_URL | عنوان الموقع |
| NEXT_PUBLIC_CACHE_REVALIDATE | ثواني إعادة التحقق |
| NEXT_PUBLIC_CACHE_ENABLED | تفعيل الكاش (true/false) |
| REVALIDATION_SECRET | سري لإعادة التحقق (يجب أن يطابق Backend) |

---

## النواقص وأولويات التطوير

### أولوية عالية جداً

1. **ربط Login و Register بالـ API** — إضافة onSubmit واستدعاء api.auth
2. **صفحة Checkout** — إنشاء وربط بـ POST /cart/checkout
3. **ربط السلة بالـ API** — مزامنة cartStore مع Backend
4. **تحديث Header** — Logout، dropdown للمستخدم

### أولوية عالية

5. ربط Newsletter بالـ API (POST /newsletter/subscribe)
6. صفحة Profile
7. صفحة Forgot Password
8. صفحة Order Confirmation
9. إصلاح مسار السلة (shoping-cart → shopping-cart أو توحيد)

### أولوية متوسطة

10. ربط HeaderSearch بـ API البحث
11. تطبيق الكوبون في السلة
12. توحيد بنية API (customer → user)

### مراجع سريعة

| الملف | الوظيفة |
|-------|---------|
| `src/api/index.js` | دوال API |
| `src/api/config/axios.js` | تكوين axios |
| `src/store/authStore.js` | حالة المصادقة |
| `src/store/cartStore.js` | حالة السلة |
| `src/store/wishlistStore.js` | حالة المفضلة |
| `src/lib/cachedServerApi.js` | كاش الخادم |
| `middleware.ts` | حماية المسارات |

---

**آخر تحديث:** فبراير 2026
