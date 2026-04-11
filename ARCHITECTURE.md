# Architecture & Implementation Guide

## 🏗️ Website Architecture

### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 4 + custom CSS variables
- **Components**: shadcn/ui
- **State Management**: Zustand
- **CMS**: Strapi (Headless)

### Backend Stack
- **CMS**: Strapi 4/5
- **Database**: SQLite (development), PostgreSQL (production)
- **API**: RESTful

## 📐 Project Structure

```
spare-care-ws/
├── my-app/                          # Next.js Frontend
│   ├── app/
│   │   ├── layout.tsx               # Root layout with Header/Footer
│   │   ├── page.tsx                 # Homepage
│   │   ├── sections/
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── Hero.tsx             # Hero banner
│   │   │   ├── Footer.tsx           # Footer
│   │   │   └── FooterComponent.tsx  # (Legacy - can remove)
│   │   ├── collections/
│   │   │   └── page.tsx             # Products listing page
│   │   ├── products/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Product detail page
│   │   ├── about/
│   │   │   └── page.tsx             # About page
│   │   ├── contact/
│   │   │   └── page.tsx             # Contact page
│   │   └── globals.css              # Global styles & CSS variables
│   ├── components/
│   │   ├── ProductCard.tsx          # Product card (reusable)
│   │   ├── ShoppingCart.tsx         # Cart component
│   │   ├── theme-provider.tsx       # Theme provider wrapper
│   │   ├── common/                  # Shared components
│   │   │   ├── NavBar.tsx           # (Legacy)
│   │   │   └── SocialLinks.tsx      # Social links footer
│   │   └── ui/                      # Shadcn UI components
│   ├── lib/
│   │   ├── strapi.ts                # Strapi API client
│   │   ├── constants.ts             # Brand constants & config
│   │   ├── utils.ts                 # Utility functions
│   │   ├── cart.store.ts            # Cart state (Zustand)
│   │   └── Global.store.ts          # (Legacy)
│   ├── types/
│   │   ├── strapi.ts                # Strapi TypeScript types
│   │   └── (other type files)
│   ├── public/
│   │   └── images/
│   │       ├── logo/
│   │       └── shop-items/
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── .env.example                 # Environment template
│   └── package.json
│
└── cms-system/                      # Strapi CMS
    ├── config/                      # Strapi configuration
    ├── src/
    │   ├── api/
    │   │   ├── products/            # Products collection
    │   │   ├── collections/         # Collections
    │   │   └── pages/               # Custom pages
    │   └── plugins/                 # Custom plugins
    └── package.json

QUICK_START.md                      # Quick setup guide
STRAPI_SETUP.md                     # Detailed Strapi setup
```

## 🔄 Data Flow

```
Strapi CMS
    ↓
    ├── Products API
    ├── Collections API
    └── Pages API
    
    ↓ (REST API calls)
    
lib/strapi.ts (API Client)
    ↓
Components & Pages
    ↓
User Interface
```

## 📄 Page Structure

### Homepage (`/`)
```
Header
  ├── Logo & Brand Name
  ├── Navigation Links
  └── Shopping Cart Icon
Hero Section
  ├── Hero Title & Description
  └── CTA Buttons
Featured Products
  ├── ProductCard (Grid)
  └── "View All Products" Link
Features Section
  ├── Premium Quality
  ├── Fast Shipping
  └── Returns Policy
Footer
  ├── Brand Info
  ├── Navigation
  ├── Support Links
  └── Social Links
```

### Collections (`/collections`)
```
Header
Title & Description
Filter Buttons
Product Grid (ProductCard components)
Footer
```

### Product Detail (`/products/[id]`)
```
Header
Product Image
  ├── Name & SKU
  ├── Price
  ├── Description
  ├── Quantity Selector
  ├── Add to Cart Button
  └── Wishlist Button
Additional Info
  ├── Shipping
  └── Returns
Footer
```

## 🔌 API Integration

### Strapi API Client (`lib/strapi.ts`)

```typescript
// Fetch products
const products = await getProducts();

// Fetch single product
const product = await getProductById(id);

// Fetch collections
const collections = await getCollections();

// Custom endpoint
const data = await fetchAPI(path, options);
```

### Environment Variables

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_api_token
```

## 🎨 Styling System

### Color Variables (`globals.css`)

```css
/* Light Mode */
--background: cream (light background)
--foreground: brown (text color)
--primary: brown (primary accent)
--secondary: white
--muted: light beige
--card: cream
--border: subtle light border

/* Dark Mode */
--background: dark teal
--foreground: cream
--primary: cream
--muted: dark
```

### Tailwind Classes Used

```
- bg-background, bg-card, bg-muted
- text-foreground, text-primary, text-muted-foreground
- border-border
- rounded-lg, rounded-md, rounded-xl
- shadow, shadow-lg
- hover: variations
```

## 🛒 Shopping Cart

### Cart Store (`lib/cart.store.ts`)

```typescript
useCartStore.addItem(item)
useCartStore.removeItem(id)
useCartStore.updateQuantity(id, qty)
useCartStore.getTotalPrice()
useCartStore.getTotalItems()
```

### CartComponent Usage

```tsx
const items = useCartStore((state) => state.items);
const addItem = useCartStore((state) => state.addItem);
```

## 🔐 Security

- API tokens stored in `.env.local` (not in version control)
- CORS configured for Strapi
- Input validation on forms
- XSS protection via React

## ⚡ Performance Optimizations

- Next.js Image optimization
- Code splitting (automatic)
- CSS minification (Tailwind)
- Server-side rendering where applicable
- Lazy loading of components

## 🚀 Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Vercel Deployment
```bash
vercel deploy
```

### Environment Setup (Production)
```env
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
NEXT_PUBLIC_STRAPI_TOKEN=your_production_token
```

## 🧪 Testing Checklist

- [ ] All products display correctly
- [ ] Product detail pages load
- [ ] Add to cart functionality works
- [ ] Form submissions work
- [ ] Links navigate correctly
- [ ] Mobile responsive design
- [ ] Images load properly
- [ ] Theme switching works

## 📊 Database Schema (Strapi)

### Products Collection
```
- id (auto)
- name (string, required)
- slug (string, unique)
- description (string)
- longDescription (richtext)
- price (decimal, required)
- sku (string)
- stock (integer)
- image (media)
- category (relation)
- createdAt (datetime, auto)
- publishedAt (datetime)
```

### Collections
```
- id (auto)
- name (string, required)
- slug (string, unique)
- description (string)
- image (media)
- products (relation to Products)
```

## 🔗 Key Files to Understand

1. **lib/strapi.ts** - API client, all Strapi calls
2. **app/sections/Header.tsx** - Navigation & branding
3. **components/ProductCard.tsx** - Product display
4. **app/page.tsx** - Homepage structure
5. **lib/constants.ts** - Brand configuration
6. **app/globals.css** - Colors & theming

## 🛠️ Development Workflow

1. Make changes to components
2. TypeScript checks validity
3. Tailwind CSS classes applied
4. Changes hot-reload (dev mode)
5. Test in browser
6. Commit to git

## 📚 Resources

- [Next.js Docs](https://nextjs.org)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Strapi Docs](https://docs.strapi.io)
- [Zustand Docs](https://github.com/pmndrs/zustand)

---

**For quick setup, see [QUICK_START.md](./QUICK_START.md)**
