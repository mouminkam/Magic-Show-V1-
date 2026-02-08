---
name: Complete Dashboard for All Pages
overview: إنشاء Dashboard شامل يغطي جميع صفحات الموقع (Home, About Us, Contact, Stores, Shop, Blog) مع إمكانية التحكم الكامل في كل محتوى بدون أي بيانات ثابتة
todos: []
---

# خطة Dashboard الشامل - بدون أي بيانات ثابتة

## الرؤية الكاملة

Dashboard يجب أن يعكس **بالضبط** نفس هيكل Frontend:

```
Frontend Navigation          Dashboard Sections
─────────────────────        ──────────────────────
🏠 Home                  →   📄 Home Management
👥 About Us              →   📄 About Us Management  
🛍️ Shop                  →   📄 Shop Management
📝 Blog                  →   📄 Blog Management
📍 Stores                →   📄 Stores Management
📧 Contact Us            →   📄 Contact Management
```

---

## تحليل شامل لجميع الصفحات

### 1️⃣ **HOME PAGE** (11 أقسام)

#### ❌ Hardcoded Currently:

1. **Hero Section** - (badge, title, subtitle, description, CTAs, stats, social links)
2. **About Us Banner** - (title, background image, badges)
3. **Featured Products Header** - (title, subtitle, description, button)
4. **On Sale Header** - (title, subtitle, description, button)
5. **Blog Section Banner** - (title, subtitle, description, background image, badges)
6. **Latest Blog** - (title, description)
7. **Featured Categories** - (name, image, slug)
8. **New Arrivals Header** - (title, subtitle, description, button)
9. **Best Sellers Header** - (title, subtitle, description, button)
10. **Special Offers Header** - (title, subtitle, description, button)
11. **Why Choose Us** - (features with icons, titles, descriptions)

#### ✅ Already Dynamic:

- Featured Products (from Products table)
- On Sale Products (from Products table)
- Latest Blog Posts (from BlogPosts table)
- New Arrivals (from Products table)
- Best Sellers (from Products table)
- Special Offers (from Products table)

---

### 2️⃣ **ABOUT US PAGE** (4 أقسام)

#### ❌ Hardcoded Currently:

1. **Hero Banner** - (title, background image, badges)
2. **About Description** - (title, subtitle, description, image, features)
3. **Stats** - (value, label, icon)

#### ✅ Already Has Models:

4. **Team Members** - ✅ Model exists, needs Dashboard
5. **Testimonials** - ✅ Model exists, needs Dashboard

---

### 3️⃣ **CONTACT US PAGE** (3 أقسام)

#### ❌ Hardcoded Currently:

1. **Hero Banner** - (title, background image, badges)
2. **Contact Map** - (mapUrl)
3. **Contact Details** - (title, address, email, phone, fax, about text)

#### ✅ Already Dynamic:

- Contact Form (sends to database)

---

### 4️⃣ **STORES PAGE** (2 أقسام)

#### ❌ Hardcoded Currently:

1. **Stores Banner** - (title, background image, badges)

#### ✅ Already Has Model:

2. **Stores List** - ✅ Model (Branch) exists, already in Dashboard

---

### 5️⃣ **SHOP PAGE**

#### ✅ Already Complete:

- Products ✅
- Categories ✅
- Filters ✅
- All managed via existing Dashboard

---

### 6️⃣ **BLOG PAGE**

#### ✅ Already Has Model:

- Blog Posts ✅ Model exists, needs Dashboard
- Comments ✅ Model exists, needs Dashboard

---

## Dashboard Structure المطلوب

```
┌─────────────────────────────────────────────────┐
│ 🏪 Magic Show Admin Dashboard                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📊 Dashboard (Overview)                         │
│                                                 │
│ 📄 CONTENT MANAGEMENT ▼                         │
│   ├── 🏠 Home Page                              │
│   │   ├── Hero Section                          │
│   │   ├── About Us Banner                       │
│   │   ├── Featured Products Header              │
│   │   ├── Blog Section Banner                   │
│   │   ├── Latest Blog Header                    │
│   │   ├── Featured Categories                   │
│   │   ├── Why Choose Us Features                │
│   │   └── Section Headers (New/Best/Special)    │
│   │                                              │
│   ├── 👥 About Us Page                          │
│   │   ├── Hero Banner                           │
│   │   ├── About Description                     │
│   │   ├── Statistics                            │
│   │   ├── Team Members                          │
│   │   └── Testimonials                          │
│   │                                              │
│   ├── 📧 Contact Page                           │
│   │   ├── Hero Banner                           │
│   │   ├── Contact Details                       │
│   │   ├── Map Settings                          │
│   │   └── Contact Messages (View Only)          │
│   │                                              │
│   ├── 📍 Stores Page                            │
│   │   ├── Stores Banner                         │
│   │   └── Stores List                           │
│   │                                              │
│   └── 📝 Blog Page                              │
│       ├── Blog Posts                            │
│       └── Comments Management                   │
│                                                 │
│ 🛍️ E-COMMERCE ▼                                 │
│   ├── Products                                  │
│   ├── Categories                                │
│   ├── Orders                                    │
│   ├── Customers                                 │
│   └── Coupons                                   │
│                                                 │
│ 📊 REPORTS & ANALYTICS                          │
│ ⚙️ SETTINGS                                     │
│ 👤 USERS                                        │
└─────────────────────────────────────────────────┘
```

---

## الجداول الجديدة المطلوبة في Database

### 1. `page_sections` - لتخزين محتوى الأقسام الثابتة

```sql
CREATE TABLE page_sections (
    id BIGINT PRIMARY KEY,
    page VARCHAR(50),           -- 'home', 'about', 'contact', 'stores'
    section VARCHAR(100),       -- 'hero', 'about_banner', 'stats', etc.
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    background_image VARCHAR(255),
    button_text VARCHAR(100),
    button_link VARCHAR(255),
    left_badge VARCHAR(100),
    right_badge VARCHAR(100),
    data JSON,                  -- للبيانات الإضافية المرنة
    sort_order INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 2. `home_features` - لميزات Why Choose Us

```sql
CREATE TABLE home_features (
    id BIGINT PRIMARY KEY,
    icon VARCHAR(50),
    title VARCHAR(255),
    description TEXT,
    sort_order INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 3. `home_categories` - للفئات المميزة في Home

```sql
CREATE TABLE home_categories (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    slug VARCHAR(255),
    image VARCHAR(255),
    sort_order INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 4. `contact_info` - لمعلومات الاتصال

```sql
CREATE TABLE contact_info (
    id BIGINT PRIMARY KEY,
    address TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    fax VARCHAR(50),
    map_url TEXT,
    about_text TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 5. `social_links` - لروابط Social Media

```sql
CREATE TABLE social_links (
    id BIGINT PRIMARY KEY,
    platform VARCHAR(50),       -- 'facebook', 'twitter', 'instagram', etc.
    label VARCHAR(100),
    icon VARCHAR(50),
    url VARCHAR(255),
    sort_order INT,
    is_active BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### 6. `blog_posts` و `blog_comments` - للمدونة

```sql
CREATE TABLE blog_posts (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255) UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image VARCHAR(255),
    author_id BIGINT,
    category VARCHAR(100),
    tags JSON,
    is_published BOOLEAN,
    published_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE blog_comments (
    id BIGINT PRIMARY KEY,
    blog_post_id BIGINT,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    comment TEXT,
    is_approved BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

---

## Controllers المطلوبة

### Content Management Controllers

1. **HomeContentController** - إدارة محتوى Home Page

   - Hero Section
   - Banners
   - Features
   - Categories
   - Headers

2. **AboutContentController** - إدارة محتوى About Page

   - Hero Banner
   - Description
   - Stats

3. **ContactContentController** - إدارة Contact Page

   - Hero Banner
   - Contact Info
   - Map

4. **StoresContentController** - إدارة Stores Page

   - Banner
   - (Branches already has BranchController)

5. **TeamMemberController** - إدارة Team Members
6. **TestimonialController** - إدارة Testimonials
7. **BlogPostController** - إدارة Blog Posts
8. **BlogCommentController** - إدارة Comments
9. **SocialLinkController** - إدارة Social Media Links

---

## Implementation Priority

### Phase 1: Critical (الأهم) - About Us

- ✅ TeamMemberController + Views
- ✅ TestimonialController + Views
- ⚠️ About Hero/Description/Stats management

### Phase 2: Contact & Stores

- ContactContentController + Views
- StoresContentController + Views

### Phase 3: Home Page

- HomeContentController + Views
- HomeFeaturesController
- HomeCategoriesController
- SocialLinksController

### Phase 4: Blog

- BlogPostController + Views
- BlogCommentController + Views

---

## Estimated Implementation Time

| Phase | Components | Time |

|-------|-----------|------|

| Phase 1 | About Us Complete | 3-4 ساعات |

| Phase 2 | Contact & Stores | 2-3 ساعات |

| Phase 3 | Home Page | 4-5 ساعات |

| Phase 4 | Blog | 2-3 ساعات |

| **Total** | **Full Dashboard** | **11-15 ساعة** |

---

## السؤال المهم

هل تريد أن نبدأ **بالتدريج** (Phase by Phase) أم تريد **خطة كاملة الآن** لكل شيء دفعة واحدة؟

**اقتراحي:** نبدأ بـ **Phase 1 (About Us)** نكملها بالكامل، تشوف النتيجة، وبعدها نكمل الباقي.

ما رأيك؟