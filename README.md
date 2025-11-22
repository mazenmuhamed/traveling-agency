# 🌍 Traveling Agency

A modern, full-featured travel booking platform built with Next.js 16, React 19, and TypeScript. Discover amazing destinations, explore curated travel packages, and plan your perfect getaway with our intuitive and beautiful interface.

Live Demo: [https://traveling-agency-pink.vercel.app/](https://traveling-agency-pink.vercel.app/)

## ✨ Features

### 🗺️ Trip Packages & Destinations

- **20+ Global Destinations** - Explore carefully curated travel packages across the world
- **Advanced Filtering** - Search and filter destinations by country, price range, and duration
- **Detailed Itineraries** - Comprehensive package information with pricing, duration, and highlights
- **Beautiful Gallery** - High-quality imagery showcasing each destination

### 💼 Flexible Pricing Plans

- **Explorer Plan** ($99/month) - Perfect for solo travelers with access to 20+ destinations
- **Adventurer Plan** ($199/month) - Most popular! For frequent travelers with 80+ destinations and premium perks
- **Luxury Plan** ($499/month) - Ultimate travel experience with unlimited destinations and concierge service
- **Flexible Billing** - Choose between monthly and yearly subscriptions with savings

### 🎨 Modern User Experience

- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode Support** - Built-in theme switching with next-themes
- **Smooth Animations** - Powered by Motion (Framer Motion) for delightful interactions
- **Accessibility First** - Built with Radix UI primitives ensuring WCAG compliance
- **Favorites System** - Save and manage your dream destinations with localStorage persistence

### 📱 Interactive Components

- **Smart Booking System** - Intuitive booking dialog with form validation (Zod + React Hook Form)
- **Dynamic Filtering** - Real-time search and filter capabilities with URL state management
- **Carousel Galleries** - Auto-playing image carousels with Embla
- **Toast Notifications** - Beautiful feedback with Sonner
- **Calendar Integration** - Date picking with react-day-picker
- **Favorites Management** - Add/remove destinations with local storage persistence
- **Floating Action Button** - Quick access to saved destinations
- **Action Tooltips** - Context-aware tooltips for better UX
- **Loading States** - Skeleton loaders and smooth page transitions
- **Pagination** - Load more/less functionality for destination lists

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Component Library:** Radix UI
- **Forms:** React Hook Form + Zod validation
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React + Flag Icons
- **State Management:** React Hooks + usehooks-ts

## 📦 Project Structure

```
traveling-agency/
├── src/
│   ├── app/
│   │   ├── (landing)/          # Landing pages group
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── layout.tsx       # Landing layout
│   │   │   ├── loading.tsx      # Loading state
│   │   │   ├── about/           # About page
│   │   │   ├── pricing/         # Pricing plans
│   │   │   ├── saved/           # Saved destinations page
│   │   │   └── details/[id]/    # Package details (dynamic)
│   │   ├── layout.tsx           # Root layout
│   │   ├── loading.tsx          # Root loading state
│   │   ├── not-found.tsx        # 404 page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ui                   # Reusable UI components
│   │   ├── animations          # Animation components
│   │   ├── trip-packages/       # Package listing & filters
│   │   │   ├── index.ts         # Barrel export
│   │   │   ├── trip-packages.tsx # Main packages component
│   │   │   ├── package-card.tsx  # Package card
│   │   │   ├── packages-filter.tsx # Filter controls
│   │   │   └── packages-autocomplete-input.tsx # Search input
│   │   ├── pricing-content/     # Pricing cards & plans
│   │   │   ├── pricing-content.tsx # Main pricing component
│   │   │   ├── pricing-content-card.tsx # Plan card
│   │   │   └── plans.tsx        # Plans data
│   │   ├── action-tooltip.tsx   # Action tooltips
│   │   ├── banner.tsx           # Hero banner
│   │   ├── booking-dialog.tsx   # Booking modal
│   │   ├── fab.tsx              # Floating action button
│   │   ├── logo.tsx             # Brand logo
│   │   ├── navbar.tsx           # Navigation
│   │   ├── package-details.tsx  # Package detail view
│   │   └── saved-places.tsx     # Saved destinations
│   ├── data/
│   │   └── destinations.ts      # Destination data
│   ├── hooks/
│   │   ├── use-breakpoint.ts    # Responsive breakpoints
│   │   ├── use-destination-filter.ts  # Filter logic
│   │   └── use-places-storage.ts # Favorite places storage
│   ├── lib/
│   │   ├── utils.ts             # Utility functions
│   │   └── constants.ts         # App constants
│   ├── models/
│   │   └── destination.model.ts # TypeScript types
│   └── validators/
│       ├── booking.validator.ts # Booking form validation
│       └── packages-filter.validator.ts # Filter validation
└── public/
    ├── assets/                  # Images & videos
    │   ├── avatars/             # User avatars
    │   ├── images/              # Destination images
    │   └── videos/              # Hero videos
    └── brand/                   # Brand assets
```

## 🎯 Key Pages

- **Home (`/`)** - Hero banner and trip packages showcase
- **About (`/about`)** - Company information and mission
- **Pricing (`/pricing`)** - Subscription plans comparison
- **Saved (`/saved`)** - User's favorite destinations collection
- **Package Details (`/details/[id]`)** - Individual package information
- **404 (`/not-found`)** - Custom not found page

## 🎨 Design Features

- **Color Scheme** - Modern, vibrant palette optimized for travel
- **Typography** - Clean, readable fonts with proper hierarchy
- **Spacing** - Consistent padding and margins using Tailwind's design system
- **Components** - Reusable, composable UI elements with shadcn/ui patterns

## 🌟 Highlights

- ⚡ **Lightning Fast** - Optimized with Next.js App Router and React Server Components
- 🎯 **Type Safe** - Full TypeScript coverage with strict mode
- 🎨 **Modern UI** - Beautiful, accessible components with Radix UI
- 📱 **Mobile First** - Responsive design that works everywhere
- 🔍 **SEO Optimized** - Proper meta tags and semantic HTML
- ♿ **Accessible** - WCAG compliant with keyboard navigation support

Built with ❤️ using Next.js and modern web technologies
