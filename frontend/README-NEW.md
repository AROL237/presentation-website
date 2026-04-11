# Spare Care Website

A professional e-commerce website for premium hair care products, built with Next.js 16, React 19, and Strapi CMS.

## Features

- 🎨 **Modern Design** - Professional, responsive UI with your brand colors
- 🏪 **Product Collections** - Browse and filter products
- 🔍 **Product Details** - Detailed product pages with Strapi integration
- 📱 **Fully Responsive** - Works on all devices
- 🎯 **SEO Ready** - Optimized for search engines
- 🔌 **Headless CMS** - Strapi integration for easy content management
- 🎨 **Theme Support** - Light/dark mode with next-themes
- ⚡ **Performance** - Optimized with Next.js and image optimization

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **CMS**: Strapi
- **State Management**: Zustand
- **Forms**: React Hook Form (optional)
- **Icons**: Lucide React

## Project Structure

```
my-app/
├── app/
│   ├── sections/          # Page sections (Header, Footer, Hero, etc.)
│   ├── collections/       # Product listings page
│   ├── products/[id]/     # Product detail pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── common/            # Shared components
│   ├── ui/                # Shadcn UI components
│   └── ProductCard.tsx    # Product card component
├── lib/
│   ├── strapi.ts          # Strapi API client
│   ├── constants.ts       # Brand constants
│   └── utils.ts           # Shared utilities
├── public/
│   └── images/            # Static images
└── types/                 # TypeScript types

cms-system/               # Strapi CMS (separate)
├── src/
│   ├── api/
│   │   ├── product/       # Products collection
│   │   ├── collection/    # Collections
│   │   └── page/          # Pages
│   └── plugins/
└── config/
```

## Installation & Setup

### 1. Install Dependencies

```bash
cd my-app
npm install
```

### 2. Setup Strapi CMS

See [STRAPI_SETUP.md](./STRAPI_SETUP.md) for detailed instructions.

### 3. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_token_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Pages

- **Home** (`/`) - Landing page with featured products
- **Collections** (`/collections`) - Browse all products
- **Product Detail** (`/products/[id]`) - Individual product page
- **About** (`/about`) - Brand story and values
- **Contact** (`/contact`) - Contact form and information

## API Endpoints

All API calls are managed through `/lib/strapi.ts`:

- `getProducts()` - Fetch all products
- `getProductById(id)` - Fetch single product
- `getCollections()` - Fetch all collections
- `getCollectionBySlug(slug)` - Fetch collection by slug
- `getPageBySlug(slug)` - Fetch custom pages

## Customization

### Colors & Branding

Edit `app/globals.css` to customize:
- Main colors
- Typography
- Spacing
- Border radius

Update `lib/constants.ts` for:
- Brand name and tagline
- Navigation links
- Social links
- Contact info

### Components

Reusable components in `components/`:
- `ProductCard` - Product card component
- `Header` - Navigation header
- `Footer` - Page footer
- Custom form components

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

The site can be deployed on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting

### Vercel Deploy

```bash
npm i -g vercel
vercel
```

## SEO

- Metadata configured in individual pages
- Open Graph meta tags for social sharing
- Sitemap auto-generation (if needed)
- Mobile-friendly design

## Performance

- Image optimization with Next.js Image
- Server-side rendering where applicable
- CSS minification via Tailwind
- Code splitting automatically handled

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Strapi Docs](https://docs.strapi.io)

## License

Proprietary - All rights reserved

## Contact

For support, contact: contact@sparecare.com
