---
name: ""
overview: ""
todos: []
isProject: false
---

# خطة تنفيذ التحسينات الإضافية - Magic Show Frontend

**التاريخ:** 4 فبراير 2026  
**الهدف:** تنفيذ العناصر المتبقية من قسم "تحسينات أخرى" في PROJECT_MISSING_ITEMS_COMPLETE.md

---

## 🚀 ابدأ من هنا

**أسرع نقطة بداية:** المرحلة 1 (PropTypes) + المرحلة 4 (Sentry)

- PropTypes: لا تحتاج خدمات خارجية، تحسّن الكود فوراً
- Sentry: حساب مجاني، إعداد سريع (~15 دقيقة)

**الأمر الأول للتنفيذ:**

```bash
npm install prop-types
npm install @sentry/nextjs
```

---

## العناصر المستهدفة


| #   | العنصر                  | الأولوية | الجهد | التبعيات    |
| --- | ----------------------- | -------- | ----- | ----------- |
| 1   | PropTypes               | عالية    | متوسط | لا يوجد     |
| 2   | Unit Tests              | عالية    | كبير  | Jest جاهز   |
| 3   | E2E Tests               | متوسطة   | كبير  | Playwright  |
| 4   | Sentry / Error Tracking | عالية    | صغير  | حساب Sentry |
| 5   | Google Analytics        | متوسطة   | صغير  | حساب GA     |
| 6   | PWA                     | منخفضة   | متوسط | لا يوجد     |


---

## المرحلة 1: PropTypes

**الهدف:** إضافة PropTypes لجميع المكونات لتحسين صيانة الكود واكتشاف الأخطاء مبكراً.

### الخطوات

1. **تثبيت الحزمة**
  ```bash
   npm install prop-types
  ```
2. **ترتيب المكونات حسب الأولوية**
  - **أولوية عالية:** `HeaderActions`, `CheckoutForm`, `LoginSection`, `RegisterSection`, `ProductCard`, `ShoppingCartSection`
  - **أولوية متوسطة:** `Footer`, `Header`, `ProductSection`, `BlogPost`, `Newsletter`
  - **أولوية منخفضة:** باقي المكونات
3. **قالب PropTypes نموذجي**
  ```jsx
   import PropTypes from 'prop-types';

   ComponentName.propTypes = {
     title: PropTypes.string.isRequired,
     items: PropTypes.arrayOf(PropTypes.shape({
       id: PropTypes.number.isRequired,
       name: PropTypes.string.isRequired,
     })),
     onSelect: PropTypes.func,
   };

   ComponentName.defaultProps = {
     items: [],
     onSelect: () => {},
   };
  ```
4. **الملفات المستهدفة (أول 15 مكون)**
  - `src/components/Header/_components/HeaderActions.jsx`
  - `src/components/Header/_components/HeaderSearch.jsx`
  - `src/app/checkout/_components/CheckoutForm.jsx`
  - `src/app/checkout/_components/OrderSummary.jsx`
  - `src/app/login/_components/LoginSection.jsx`
  - `src/app/register/_components/RegisterSection.jsx`
  - `src/app/shop/_components/ProductCard.jsx`
  - `src/app/shoping-cart/_components/ShoppingCartSection.jsx`
  - `src/app/home/_components/ProductCard.jsx`
  - `src/app/home/_components/Newsletter.jsx`
  - `src/components/ui/ErrorBoundary.jsx`
  - `src/components/ui/OptimizedImage.jsx`
  - `src/components/WishlistButton/WishlistButton.jsx`
  - `src/app/profile/_components/ProfileSection.jsx`
  - `src/app/contact-us/_components/ContactForm.jsx`

---

## المرحلة 2: Unit Tests

**الهدف:** إضافة اختبارات Unit للمنطق الحرج والمكونات الأساسية.

**الحالة الحالية:** Jest مضبوط (`jest.config.js`, `jest.setup.js`) — لا توجد ملفات اختبار.

### الخطوات

1. **تثبيت مكتبات مساعدة (إن لزم)**
  ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
  ```
2. **هيكل ملفات الاختبار**
  ```
   src/
   ├── lib/
   │   └── utils/
   │       ├── formatters.js
   │       └── formatters.test.js
   ├── store/
   │   ├── cartStore.js
   │   └── __tests__/
   │       └── cartStore.test.js
   └── components/
       └── ui/
           ├── ErrorBoundary.jsx
           └── __tests__/
               └── ErrorBoundary.test.jsx
  ```
3. **أولوية الاختبارات**
  - **أولاً:** `src/lib/utils/formatters.js`, `src/lib/utils/debounce.js`, `src/lib/validations/authSchemas.js`
  - **ثانياً:** `cartStore`, `authStore`, `wishlistStore`
  - **ثالثاً:** مكونات UI: `ErrorBoundary`, `LoadingSpinner`, `Button`
  - **رابعاً:** مكونات الصفحات: `ProductCard`, `CheckoutForm` (مع mock للـ API)
4. **أمثلة اختبارات**
  - اختبار `formatters.formatPrice` مع قيم مختلفة
  - اختبار `authSchemas` (Zod) مع بيانات صحيحة/خاطئة
  - اختبار `cartStore` add/remove/clear
  - اختبار `ErrorBoundary` يعرض fallback عند الخطأ
5. **تشغيل الاختبارات**
  ```bash
   npm run test
   npm run test:coverage
  ```

---

## المرحلة 3: E2E Tests

**الهدف:** اختبار تدفقات المستخدم الكاملة (تسجيل، شراء، إلخ).

### الخطوات

1. **تثبيت Playwright**
  ```bash
   npm init playwright@latest
   # أو
   npm install --save-dev @playwright/test
   npx playwright install
  ```
2. **إنشاء `playwright.config.ts**`
  - baseURL: `http://localhost:3000`
  - projects: chromium, firefox, webkit (اختياري)
3. **سيناريوهات E2E المقترحة**
  - **Auth:** تسجيل دخول → التحقق من ظهور الاسم في Header
  - **Shop:** فتح المتجر → فلترة → إضافة للسلة
  - **Checkout:** سلة → checkout → تأكيد (مع mock للـ API أو بيئة اختبار)
  - **Search:** كتابة في البحث → ظهور نتائج
  - **Wishlist:** إضافة للمفضلة → فتح صفحة المفضلة
4. **هيكل الملفات**
  ```
   e2e/
   ├── auth.spec.js
   ├── shop.spec.js
   ├── checkout.spec.js
   └── fixtures/
       └── test-user.js
  ```
5. **إضافة script في package.json**
  ```json
   "test:e2e": "playwright test",
   "test:e2e:ui": "playwright test --ui"
  ```

---

## المرحلة 4: Sentry / Error Tracking

**الهدف:** تتبع الأخطاء في الإنتاج وإرسالها لـ Sentry.

### الخطوات

1. **إنشاء حساب Sentry** (sentry.io) والحصول على DSN
2. **تثبيت الحزمة**
  ```bash
   npx @sentry/wizard@latest -i nextjs
  ```
   أو يدوياً:
3. **إعداد Sentry**
  - إنشاء `sentry.client.config.js` و `sentry.server.config.js` و `sentry.edge.config.js`
  - إضافة `SENTRY_DSN` في `.env.local`
  - تعديل `next.config.ts` لـ `withSentryConfig`
4. **ربط ErrorBoundary و error.jsx**
  - استبدال التعليق `// Log to error reporting service` باستدعاء `Sentry.captureException(error)`
5. **الملفات المتأثرة**
  - `src/app/error.jsx`
  - `src/components/ui/ErrorBoundary.jsx`
  - `next.config.ts`
  - `layout.jsx` (إن استخدمت Sentry للمراقبة التلقائية)

---

## المرحلة 5: Google Analytics

**الهدف:** تتبع الزيارات والصفحات والأحداث (مثل إضافة للسلة، شراء).

### الخيارات

**أ) Vercel Analytics** (أبسط إذا كان الاستضافة على Vercel)

```bash
npm install @vercel/analytics
```

```jsx
// layout.jsx
import { Analytics } from '@vercel/analytics/react';
// في الـ return: <Analytics />
```

**ب) Google Analytics 4 (GA4)**

- إنشاء property في GA4
- إضافة `NEXT_PUBLIC_GA_MEASUREMENT_ID` في `.env`
- استخدام `next/script` مع gtag أو مكتبة مثل `react-ga4`

### الخطوات الموصى بها (GA4)

1. إضافة Script في `layout.jsx`:
  ```jsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');`}
   </Script>
  ```
2. إنشاء `src/lib/analytics.js` لـ `pageview` و `event`
3. استدعاء `pageview` عند تغيير الصفحة (مثلاً في middleware أو useEffect)

---

## المرحلة 6: PWA

**الهدف:** جعل الموقع يعمل كتطبيق ويب تقدمي (قابل للتثبيت، يعمل أفلين).

### الخطوات

1. **إنشاء `public/manifest.json**`
  ```json
   {
     "name": "Magic Show - Jewelry",
     "short_name": "Magic Show",
     "description": "Jewelry E-commerce Website",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#000000",
     "icons": [
       {
         "src": "/images/logo.png",
         "sizes": "192x192",
         "type": "image/png"
       }
     ]
   }
  ```
2. **ربط manifest في layout.jsx**
  ```jsx
   <link rel="manifest" href="/manifest.json" />
  ```
3. **إضافة Service Worker (اختياري)**
  - استخدام `next-pwa` أو `@ducanh2912/next-pwa`
  - تعديل `next.config.ts` لتفعيل PWA
4. **إضافة meta tags للـ PWA**
  - `apple-touch-icon`, `theme-color`, إلخ.

---

## ترتيب التنفيذ المقترح


| الأسبوع | المهام                                         |
| ------- | ---------------------------------------------- |
| 1       | المرحلة 1 (PropTypes) + المرحلة 4 (Sentry)     |
| 2       | المرحلة 2 (Unit Tests) — الجزء الأول           |
| 3       | المرحلة 2 (Unit Tests) — إكمال                 |
| 4       | المرحلة 5 (Google Analytics) + المرحلة 3 (E2E) |
| 5       | المرحلة 6 (PWA)                                |


---

## ملاحظات

- **TypeScript:** غير مدرج — المشروع JavaScript. يمكن ترحيل تدريجي لاحقاً.
- **بيئة الاختبار:** E2E تحتاج Backend يعمل أو mock كامل.
- **Sentry:** يحتاج حساب مجاني أو مدفوع.
- **GA:** يحتاج حساب Google Analytics.
- **PWA:** يمكن البدء بـ manifest فقط دون Service Worker للبساطة.

---

## مراجع

- [PropTypes - React](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)
- [Jest - Next.js](https://nextjs.org/docs/app/building-your-application/testing/jest)
- [Playwright - Next.js](https://nextjs.org/docs/app/building-your-application/testing/playwright)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Next.js PWA](https://github.com/DuCanhGH/next-pwa)

