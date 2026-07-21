# ShopHub E-Commerce Storefront

A modern, fast, and secure e-commerce storefront built with Next.js 16, React 19, TypeScript, Tailwind CSS, and MongoDB. It utilizes **Better Auth** for seamless authentication, session management, and database adapter handling.

> [!NOTE]
> This repository contains only the frontend application. The backend code has been excluded per request.

## 🚀 Features

### 🔐 Authentication
* **Email & Password**: Secure sign-up, sign-in, and sign-out out-of-the-box.
* **Session Management**: Secure cookies handled automatically by Better Auth.
* **Database Driven**: User credentials and sessions stored securely in MongoDB.

### 🛍️ E-Commerce Front
* **Product Catalog**: View, filter, and search products.
* **Shopping Cart**: Fully functional and persistent cart.
* **Indian Rupee (₹) Pricing**: Localization of all currencies and pricing logic.
* **Checkout Flow**: Complete multi-step visual checkout.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 & React 19 (App Router)
* **Language**: TypeScript
* **Database**: MongoDB (via `mongodb` driver & `mongoose`)
* **Auth**: Better Auth
* **Styling**: Tailwind CSS & shadcn/ui components

---

## ⚡ Quick Start

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/) (either running locally or a free MongoDB Atlas cloud cluster)
* Package manager: `npm` or `pnpm`

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Generate a secure authorization secret using OpenSSL:
```bash
openssl rand -base64 32
```

Add your connection details inside `.env.local`:
```env
MONGODB_URI=your_mongodb_connection_string_here
BETTER_AUTH_SECRET=your_generated_secret_here
```

### 3. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 4. Run the Development Server
```bash
pnpm dev:frontend
# or
npm run dev:frontend
```

Now open [http://localhost:3000](http://localhost:3000) in your browser to view the application!

---

## 📂 Project Structure

* [app/](file:///d:/e-commerce-storefront/app) - Next.js page layouts, auth routes, and page routing views.
* [components/](file:///d:/e-commerce-storefront/components) - Reusable UI widgets and custom dashboard templates.
* [context/](file:///d:/e-commerce-storefront/context) - Cart state contexts and helper hooks.
* [lib/](file:///d:/e-commerce-storefront/lib) - Database connection helpers, auth configuration adapters, and utility libraries.
* [public/](file:///d:/e-commerce-storefront/public) - Static assets including logo graphics and placeholders.

---

## 📘 Detailed Guides

For more details on setup, auth configuration, and database management, refer to the following documents:
* [SETUP_INSTRUCTIONS.md](file:///d:/e-commerce-storefront/SETUP_INSTRUCTIONS.md) — Comprehensive step-by-step setup guides.
* [MONGODB_SETUP.md](file:///d:/e-commerce-storefront/MONGODB_SETUP.md) — MongoDB installation & cloud setup walk-through.
* [README_AUTH.md](file:///d:/e-commerce-storefront/README_AUTH.md) — Full description of Better Auth architecture.
