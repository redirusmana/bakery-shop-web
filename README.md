# Union Bakery - Frontend E-Commerce

A modern, responsive e-commerce application designed for **Union Bakery**. Built with **Next.js (App Router)** and **TypeScript**, focusing on a seamless user experience, robust state management, and a clean, minimalist aesthetic.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38bdf8)

## Key Features

### Authentication & User Flow
- **Secure Login & Register:** Implementation using `Zod` validation and `React Hook Form`.
- **Password Strength Meter:** Visual feedback bar (Red/Yellow/Green) with regex requirements checklist.
- **Smart Redirect:** If a user tries to checkout while logged out, the app saves their state and automatically resumes the checkout process after they log in or register.
- **Auto-Login:** Users are automatically logged in immediately after registration.

### Shopping Cart
- **Persistent State:** Cart data persists using `Zustand` with local storage integration.
- **Smart Validation:** Minimum order validation (e.g., Min. IDR 350k) to proceed to delivery.
- **Dynamic Metadata:** Handles complex item details like Cake Wording, Greeting Cards, and Size variations directly in the cart view.
- **Interactive UI:** Slide-out drawer cart (Sheet component) with real-time subtotal calculation.

### UI/UX
- **Responsive Navigation:** Navbar transitions from transparent to solid color upon scrolling.
- **Mobile-First Design:** Optimized mobile menu and touch interactions.
- **Toast Notifications:** Clean and professional feedback messages using `Sonner` (e.g., "Added to cart", "Welcome back").
- **Loading States:** Skeleton loaders for products and cart items to improve perceived performance.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Shadcn UI
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Toast:** Sonner

## Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/username/union-bakery.git](https://github.com/username/union-bakery.git)
   cd union-bakery
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install

   ```

3. **Environment Variables**
Create a `.env.local` file in the root directory and add your API endpoint:
   ```env
   NEXT_PUBLIC_API_URL=[https://api.your-backend.com/v1](https://api.your-backend.com/v1)

   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser.

## 📂 Project Structure

```bash
src/
├── app/                 # Next.js App Router pages
│   ├── account/         # Login & Register pages
│   ├── product/         # Product detail pages ([handle])
│   └── layout.tsx       # Root layout
├── components/
│   ├── cart/            # Cart drawer, items, and logic
│   ├── layout/          # Navbar, Footer
│   ├── product/         # Product cards, views
│   └── ui/              # Reusable UI components
├── hooks/               # Custom hooks
├── lib/                 # Utilities, api instance, formatters
├── stores/              # Zustand stores)
└── types/               # TypeScript interfaces

```

## 📦 Build for Production

To create an optimized production build:

```bash
npm run build
npm run start
```