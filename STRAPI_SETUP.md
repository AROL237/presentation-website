# Strapi CMS Setup Guide

## Quick Start

### 1. Install Strapi in the CMS folder

```bash
cd /home/signing-arol/Desktop/website/spare-care-ws/cms-system
npx create-strapi@latest my-strapi-cms --quickstart
```

### 2. Create Required Collections

In Strapi Admin:

#### Products Collection
- **name** (String, required)
- **description** (String)
- **longDescription** (Rich Text)
- **price** (Number, required)
- **image** (Media)
- **sku** (String)
- **stock** (Number)
- **slug** (String, unique)

#### Collections
- **name** (String, required)
- **description** (String)
- **image** (Media)
- **slug** (String, unique)
- **products** (Relation to Products)

#### Pages
- **title** (String, required)
- **slug** (String, unique)
- **content** (Rich Text)
- **image** (Media)

### 3. API Permissions

1. Go to Settings > API Tokens
2. Create a new token with name "website"
3. Grant full access to Products, Collections, and Pages
4. Copy token and add to `.env.local` file

### 4. Environment Setup

Create `.env.local`:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_token_here
```

### 5. Start Development

```bash
# Terminal 1: Start Strapi
cd cms-system
npm run develop

# Terminal 2: Start Next.js
cd ../my-app
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin
