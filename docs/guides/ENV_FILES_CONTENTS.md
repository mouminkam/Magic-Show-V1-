# محتويات ملفات البيئة (Environment Files)

انسخ والصق المحتوى في كل ملف حسب الحاجة.

---

## 1. ملف `.env`

```
# يمكن تركه فارغاً - .env.local يغلب عليه
```

---

## 2. ملف `.env.example`

**(قالب للمطورين - يُرفع على Git)**

```
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Cache (optional) - seconds until frontend revalidates API data
NEXT_PUBLIC_CACHE_REVALIDATE=60

# On-demand revalidation - secret for Backend (must match Backend NEXTJS_REVALIDATION_SECRET)
REVALIDATION_SECRET=your-secret-key
```

---

## 3. ملف `.env.local`

**(للتطوير المحلي - لا يُرفع على Git)**

```
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cache (optional) - لتسريع ظهور التحديثات
NEXT_PUBLIC_CACHE_REVALIDATE=15

# On-demand revalidation - يجب أن يطابق NEXTJS_REVALIDATION_SECRET في الباك إند
REVALIDATION_SECRET=your-secret-key
```

---

## ملاحظات

| المتغير | الوصف |
|---------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | رابط الـ API (Laravel Backend) |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع (Next.js Frontend) |
| `NEXT_PUBLIC_CACHE_REVALIDATE` | اختياري - ثواني إعادة تحقق الكاش (مثلاً 15 = تحديث أسرع) |
| `REVALIDATION_SECRET` | سري لإبطال الكاش عند الطلب - يجب أن يطابق الباك إند |

**مسار الـ API:** تأكد أن Laravel يستخدم `/api/v1`. إذا كان `/api` فقط، غيّر إلى:
- `http://localhost:8000/api` (بدون v1)
