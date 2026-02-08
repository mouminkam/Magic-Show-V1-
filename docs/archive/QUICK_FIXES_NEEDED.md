# ⚡ Quick Fixes Needed - الإصلاحات السريعة المطلوبة

## 🔴 يجب إصلاحها الآن (قبل الربط)

### 1. إنشاء `.env.example`
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=development
```

### 2. إنشاء `middleware.ts`
```typescript
// في root folder
export function middleware(request) {
  const token = request.cookies.get('auth-token');
  if (!token && request.nextUrl.pathname.startsWith('/cart')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/cart/:path*'],
};
```

### 3. إنشاء `src/app/error.jsx`
```jsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2>حدث خطأ!</h2>
        <button onClick={() => reset()}>حاول مرة أخرى</button>
      </div>
    </div>
  );
}
```

### 4. إنشاء `src/app/loading.jsx`
```jsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
    </div>
  );
}
```

### 5. إنشاء `src/app/not-found.jsx`
```jsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p>الصفحة غير موجودة</p>
        <a href="/">العودة للرئيسية</a>
      </div>
    </div>
  );
}
```

### 6. تحديث `next.config.ts`
```typescript
// إضافة CORS headers
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
      ],
    },
  ];
}

// إضافة CDN domains للصور
images: {
  remotePatterns: [
    { protocol: "https", hostname: "htmlbeans.com" },
    { protocol: "https", hostname: "cdn.yourdomain.com" },
    { protocol: "https", hostname: "api.yourdomain.com" },
  ],
}
```

### 7. إزالة Console.log
```bash
الملفات المتأثرة:
- src/app/shop/[id]/_components/ProductSection.jsx
- src/app/shop/_components/CategorySection.jsx
- src/app/shoping-cart/_components/ShoppingCartSection.jsx
- src/lib/getLanguageClient.js
- src/components/ui/ErrorBoundary.jsx
- src/lib/getLanguage.js

الحل: إزالة جميع console.log/error/warn
```

---

## ⚠️ مهم (بعد الربط الأولي)

### 8. SEO - Metadata API
```typescript
// استبدال PageSEO component بـ:
export const metadata = {
  title: 'Shop - Magic Show',
  description: 'Browse our products',
};
```

### 9. Sitemap & Robots
```bash
- إنشاء src/app/sitemap.ts
- إنشاء src/app/robots.ts
```

### 10. React Query
```bash
npm install @tanstack/react-query

- إضافة QueryProvider
- استخدام useQuery للـ API calls
```

---

## 📊 Summary

**Critical Files Missing:** 5 ملفات
**Critical Fixes:** 7 إصلاحات
**Time Needed:** 2-3 أيام

**الأولوية:** ابدأ بالـ Critical items (1-7) فوراً!

---

**For full details:** راجع `FRONTEND_REVIEW_REPORT.md`
