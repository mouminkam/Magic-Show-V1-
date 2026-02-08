# العناصر الناقصة لإكمال الإعداد - Magic Show Frontend

**تاريخ:** 4 فبراير 2026  
**بعد تنفيذ خطة التحسينات الإضافية**

---

## ما تم تنفيذه

| العنصر | الحالة | ملاحظة |
|--------|--------|--------|
| PropTypes | ✅ | مضافة لـ HeaderActions, HeaderCart, OptimizedImage, ErrorBoundary, Newsletter, WishlistButton |
| Unit Tests | ✅ | formatters, debounce, cartHelpers, authSchemas, ErrorBoundary |
| E2E Tests | ✅ | Playwright config + e2e/home.spec.js |
| Sentry | ✅ | instrumentation, error.jsx, ErrorBoundary, global-error |
| Vercel Analytics | ✅ | مدمج في layout |
| Google Analytics | ✅ | مكون جاهز - يعمل عند إضافة GA ID |
| PWA Manifest | ✅ | public/manifest.json |
| Newsletter API | ✅ | إصلاح: إضافة import api |

---

## ما تحتاج إضافته يدوياً

### 1. Sentry (تتبع الأخطاء)

**مطلوب للحصول على تقارير الأخطاء:**

1. إنشاء حساب في [sentry.io](https://sentry.io)
2. إنشاء مشروع Next.js
3. إضافة المتغيرات في `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=your-project-slug
```

4. (اختياري) لرفع Source Maps في CI:
```env
SENTRY_AUTH_TOKEN=your-auth-token
```

**بدون DSN:** التطبيق يعمل بشكل طبيعي، لكن الأخطاء لا تُرسل لـ Sentry.

---

### 2. Google Analytics 4

**مطلوب لتتبع الزيارات والأحداث:**

1. إنشاء property في [Google Analytics](https://analytics.google.com)
2. الحصول على Measurement ID (مثل `G-XXXXXXXXXX`)
3. إضافة في `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**بدون ID:** المكون لا يُحمّل، ولا تأثير على التطبيق.

---

### 3. Playwright (E2E)

**لتشغيل اختبارات E2E:**

```bash
npx playwright install
# أو للمتصفحات المحددة:
npx playwright install chromium
```

ثم:
```bash
npm run test:e2e
```

**ملاحظة:** إذا فشل التثبيت بسبب صلاحيات، شغّل الأمر من خارج الـ sandbox أو كـ Administrator.

---

### 4. PWA (اختياري - Service Worker)

إذا أردت إضافة Service Worker للعمل أفلين:

- تم تثبيت `@ducanh2912/next-pwa`
- يمكنك تفعيله في `next.config.ts` حسب [التوثيق](https://github.com/DuCanhGH/next-pwa)

حالياً: **manifest.json فقط** موجود — الموقع قابل للتثبيت على الأجهزة.

---

## ملف .env.example المحدث

أضف هذه المتغيرات لملف `.env.example`:

```env
# ===== API =====
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# ===== Sentry (اختياري) =====
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

# ===== Google Analytics (اختياري) =====
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

## CORS مع الباكند (Laravel)

عند نشر الفرونتند على دومين مختلف (مثلاً Vercel)، تأكد أن الباكند يسمح بالأصل (origin) في `config/cors.php`:

- عدّل `FRONTEND_URL` في `.env` الخاص بالباكند ليشمل رابط الفرونتند المنشور
- مثال: `FRONTEND_URL=https://your-frontend.vercel.app`

---

## تشغيل الاختبارات

```bash
# Unit Tests
npm run test

# Unit Tests مع Coverage
npm run test:coverage

# E2E Tests (يحتاج تشغيل npx playwright install أولاً)
npm run test:e2e
```

---

## التبعيات المثبتة

| الحزمة | الاستخدام |
|--------|-----------|
| prop-types | PropTypes للمكونات |
| @sentry/nextjs | تتبع الأخطاء |
| @vercel/analytics | تحليلات Vercel (تلقائي) |
| @testing-library/react | اختبارات Unit |
| @testing-library/jest-dom | matchers إضافية |
| @testing-library/user-event | محاكاة تفاعل المستخدم |
| @playwright/test | اختبارات E2E |
| @ducanh2912/next-pwa | PWA (اختياري - غير مفعّل) |
| jest | إطار Unit Tests |
| jest-environment-jsdom | بيئة Jest للمكونات |
