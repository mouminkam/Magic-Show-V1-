# API Documentation - Magic Show E-Commerce

هذا المجلد يحتوي على التوثيق الكامل لجميع الـ APIs المطلوبة لمشروع Magic Show E-Commerce.

---

## 📁 الملفات المتوفرة

### 1. `BACKEND_API_COMPLETE_SPEC.md` ⭐ (الملف الرئيسي)

**الوصف:** التوثيق الكامل والشامل لجميع الـ APIs

**يحتوي على:**
- شرح تفصيلي لكل endpoint (43 endpoint)
- أمثلة كاملة للـ Request/Response
- جميع الـ Headers المطلوبة
- Query Parameters والفلاتر
- متطلبات الـ Authentication
- قواعد الـ Pagination والـ Filtering
- جدول مرجعي سريع لجميع الـ endpoints

**متى تستخدمه:**
- عند تطوير الـ Backend APIs
- عند الحاجة لفهم تفاصيل أي endpoint
- كمرجع كامل للمطورين

**الحجم:** ~1150 سطر، تفصيلي وشامل

---

### 2. `API_QUICK_REFERENCE.md` ⚡ (المرجع السريع)

**الوصف:** ملخص مختصر جداً لجميع الـ endpoints

**يحتوي على:**
- قائمة سريعة بجميع الـ endpoints
- Method و Path لكل endpoint
- تصنيف حسب الوحدة (Auth, Home, Shop, etc.)
- ملخص إحصائي (عدد الـ endpoints، GET/POST/PUT/DELETE)

**متى تستخدمه:**
- للبحث السريع عن endpoint معين
- كمرجع سريع أثناء التطوير
- للحصول على نظرة عامة على جميع الـ APIs

**الحجم:** ~120 سطر، مختصر جداً

---

### 3. `api-endpoints.json` 📋 (JSON Format)

**الوصف:** جميع الـ endpoints بتنسيق JSON

**يحتوي على:**
- جميع الـ endpoints بتنسيق JSON منظم
- Request bodies examples
- Query parameters
- Authentication requirements

**متى تستخدمه:**
- لاستيراد الـ APIs في Postman أو Insomnia
- للاستخدام البرمجي (parsing, automation)
- لإنشاء أدوات testing تلقائية

**الحجم:** JSON structure كامل

---

## 🚀 كيفية الاستخدام

### للمطورين (Backend)

1. **ابدأ بقراءة** `BACKEND_API_COMPLETE_SPEC.md` لفهم البنية العامة
2. **استخدم** القسم "General Guidelines" لفهم القواعد المشتركة
3. **طور** كل endpoint حسب المواصفات المذكورة
4. **راجع** قسم "Implementation Notes" للقواعد الحرجة

### للمطورين (Frontend)

1. **استخدم** `API_QUICK_REFERENCE.md` للبحث السريع
2. **ارجع إلى** `BACKEND_API_COMPLETE_SPEC.md` لتفاصيل الـ Response
3. **استورد** `api-endpoints.json` في Postman للتجربة

### لمديري المشاريع

1. **راجع** `API_QUICK_REFERENCE.md` لفهم نطاق العمل
2. **استخدم** جدول "Quick Reference" في الملف الرئيسي للتخطيط

---

## 📊 إحصائيات المشروع

- **إجمالي الـ Endpoints:** 43
- **Public Endpoints:** 32 (لا تحتاج authentication)
- **Protected Endpoints:** 11 (تحتاج authentication)

### توزيع الـ Methods:
- **GET:** 35 endpoint
- **POST:** 6 endpoints
- **PUT:** 1 endpoint
- **DELETE:** 2 endpoints

### توزيع حسب الوحدة:
- **Authentication:** 4 endpoints
- **Home Page:** 11 endpoints
- **Shop:** 4 endpoints
- **Product Details:** 2 endpoints
- **Blog:** 5 endpoints
- **About Us:** 4 endpoints
- **Stores:** 2 endpoints
- **Contact:** 4 endpoints
- **Cart:** 7 endpoints

---

## 🔑 المفاهيم الأساسية

### 1. Language Support (دعم اللغات)

جميع الـ APIs تدعم اللغتين العربية والإنجليزية عبر Header:

```http
Accept-Language: ar
```

أو

```http
Accept-Language: en
```

### 2. Authentication (المصادقة)

الـ endpoints المحمية تحتاج إلى JWT token:

```http
Authorization: Bearer {your_jwt_token}
```

### 3. Pagination (التصفح)

استخدم query parameters:

```
?page=1&limit=10
```

### 4. Filtering (الفلترة)

مثال لفلترة المنتجات:

```
/shop/products?category=Heels&size=38&color=Blue&minPrice=50&maxPrice=200
```

**مهم:** يجب تطبيق الفلاتر قبل الـ Pagination!

---

## ⚠️ ملاحظات مهمة

### للـ Backend Developers:

1. **Language Header إلزامي:** جميع الـ requests يجب أن تحتوي على `Accept-Language` header
2. **Filtering قبل Pagination:** في `/shop/products`، طبق الفلاتر أولاً ثم احسب `totalItems` ثم طبق pagination
3. **Absolute URLs للصور:** أرجع URLs كاملة للصور، ليس relative paths
4. **Error Handling موحد:** استخدم نفس تنسيق الـ error response في جميع الـ endpoints
5. **Price Range ديناميكي:** احسب min/max prices من قاعدة البيانات في `/shop/filters`

### للـ Frontend Developers:

1. **axios interceptor جاهز:** الـ Frontend يضيف `Accept-Language` header تلقائياً
2. **Token في localStorage:** يتم حفظ الـ token في localStorage بعد Login
3. **Cart في localStorage:** السلة محفوظة محلياً، لكن يُفضل مزامنتها مع الـ Backend

---

## 🎯 Next Steps

### للبدء بالتطوير:

1. ✅ **اقرأ** `BACKEND_API_COMPLETE_SPEC.md` كاملاً
2. ✅ **افهم** القواعد العامة في قسم "General Guidelines"
3. ✅ **ابدأ** بتطوير Authentication APIs أولاً
4. ✅ **اختبر** كل endpoint بعد تطويره
5. ✅ **وثق** أي تغييرات أو إضافات

### للاختبار:

1. استورد `api-endpoints.json` في Postman
2. أنشئ environment variables للـ base URL والـ token
3. اختبر كل endpoint على حدة
4. تأكد من الـ error handling

---

## 📞 الدعم

إذا كان لديك أي أسئلة أو استفسارات حول الـ APIs:

1. راجع `BACKEND_API_COMPLETE_SPEC.md` أولاً
2. تحقق من قسم "Implementation Notes" للقواعد الحرجة
3. راجع أمثلة الـ Request/Response في كل endpoint

---

## 📝 ملاحظات التحديث

- **Version:** 1.0
- **Last Updated:** 2024
- **Status:** Complete specification ready for implementation

---

**تم إنشاء هذا التوثيق بناءً على فحص شامل للـ Front-End code**

جميع الـ endpoints المذكورة هي متطلبات فعلية من الـ Front-End ويجب تطويرها.
