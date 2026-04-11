# Quick Start Guide - Spare Care Website

## 🚀 Getting Started (5 minutes)

### Step 1: Install & Run Frontend

```bash
cd /home/signing-arol/Desktop/website/spare-care-ws/my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 2: Setup Strapi CMS

```bash
cd /home/signing-arol/Desktop/website/spare-care-ws/cms-system
npx create-strapi@latest app --quickstart
```

This will:
- Install Strapi
- Create SQLite database
- Open admin panel at http://localhost:1337/admin

### Step 3: Create Collections in Strapi

#### In Strapi Admin:

1. **Create "products" Collection Type**
   - Go to settings → Content-Type Builder
   - Create new Collection Type
   - Name: `products`
   - Add fields:
     - `name` (String, required)
     - `description` (String)
     - `price` (Number, required)
     - `image` (Media)
     - `slug` (String, unique)

2. **Create "collections" Collection Type**
   - Name: `collections`
   - Fields:
     - `name` (String)
     - `slug` (String)
     - `image` (Media)

### Step 4: Create API Token

1. Click your avatar → Logout
2. Go to Settings → API Tokens
3. Create new token:
   - Name: `website`
   - Select "Full access"
4. Copy and add to `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=<your_token>
```

### Step 5: Add Sample Data

In Strapi Admin:
1. Go to Content Manager → products
2. Create some test products
3. Upload product images
4. Publish them

### Done! 🎉

Your site will automatically display:
- ✅ Home page with featured products
- ✅ Collections page with all products
- ✅ Product detail pages
- ✅ About and Contact pages

## 📁 Project Structure

```
my-app/
├── app/
│   ├── page.tsx              # Homepage
│   ├── collections/          # Products listing
│   ├── products/[id]/        # Product details
│   ├── about/                # About page
│   ├── contact/              # Contact form
│   └── sections/             # Components (Header, Footer, Hero)
├── components/
│   ├── ProductCard.tsx       # Reusable product card
│   └── ui/                   # Shadcn components
└── lib/
    ├── strapi.ts             # API client
    ├── constants.ts          # Config
    └── cart.store.ts         # Cart state (Zustand)
```

## 🎨 Customizing Colors

Edit `app/globals.css`:

```css
:root {
  --background: hsla(28, 42, 91, 1);     /* Light cream */
  --foreground: hsla(16, 50, 23, 1);     /* Dark brown */
  --primary: hsla(16, 50, 23, 1);        /* Primary color */
  --muted: rgb(234, 221, 210);           /* Light muted */
  /* ... more colors ... */
}
```

## 🏪 Adding Products via Strapi

1. Go to Strapi Admin → Content Manager
2. Click "products"
3. Create New:
   - Name: Product name
   - Price: $XX.XX
   - Image: Upload image
   - Description: Product details
4. Click Save and Publish
5. Site updates automatically!

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🚀 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow prompts to connect your GitHub/GitLab account.

## 🤔 Troubleshooting

### "Cannot fetch products"
- Ensure Strapi is running: `npm run develop` in cms-system
- Check `.env.local` has correct STRAPI_URL and TOKEN
- Products must be published in Strapi

### "Images not loading"
- Ensure image files are uploaded in Strapi
- Check Strapi permissions allow public access

### Dark mode not working
- Clear browser cache
- Check ThemeProvider in layout.tsx

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Strapi Docs](https://docs.strapi.io)
- [Tailwind CSS](https://tailwindcss.com)

---

**Next Steps:**
1. Customize brand colors in `globals.css`
2. Update brand info in `lib/constants.ts`
3. Add more products in Strapi
4. Customize pages and sections
5. Set up payment integration (Stripe, etc.)

Happy building! 🎉
