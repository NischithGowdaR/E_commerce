# ✅ MongoDB Setup Checklist

Use this checklist to ensure everything is properly configured.

## Pre-Setup

- [ ] You have Node.js 18+ installed
- [ ] You have pnpm installed (`pnpm --version`)
- [ ] You're in the project directory

## MongoDB Setup

### MongoDB Source (Choose One)

**☁️ Cloud Option (MongoDB Atlas)**
- [ ] Created MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
- [ ] Created a free cluster (M0 tier)
- [ ] Copied connection string from "Connect" → "Drivers"
- [ ] Connection string looks like: `mongodb+srv://username:password@cluster.mongodb.net/shophub`
- [ ] Added your IP to IP whitelist

**💻 Local Option**
- [ ] MongoDB installed on your machine
- [ ] MongoDB service is running
- [ ] Can connect to `mongodb://localhost:27017`
- [ ] Database will use local storage

## Secret Key Generation

- [ ] Ran: `openssl rand -base64 32`
- [ ] Copied the generated secret (32+ characters)
- [ ] Secret is secure and random

## .env.local File

- [ ] `.env.local` file created in project root
- [ ] Added `MONGODB_URI=` with your connection string
- [ ] Added `BETTER_AUTH_SECRET=` with your generated secret
- [ ] File is formatted correctly (no extra spaces)
- [ ] File is NOT committed to Git

Example content:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/shophub
BETTER_AUTH_SECRET=kR7x9mP2nQ8vL3jB5oD6tE9wF4uH1sK2xC3yN6pM0rJ7
```

## Project Setup

- [ ] Ran: `pnpm install`
- [ ] No installation errors
- [ ] node_modules folder created

## Build Verification

- [ ] Ran: `pnpm build`
- [ ] Build completed successfully
- [ ] No critical errors in build output

## Development Server

- [ ] Ran: `pnpm dev`
- [ ] Server started on http://localhost:3000
- [ ] No errors in terminal

## Testing

- [ ] Opened http://localhost:3000 in browser
- [ ] Homepage loads with products
- [ ] Can see "Sign In" and "Sign Up" buttons
- [ ] Navbar shows cart icon
- [ ] Clicked "Sign Up" navigates to registration page
- [ ] Registration form displays
- [ ] Created test account successfully
- [ ] Got logged in automatically
- [ ] Navbar shows user email
- [ ] "Logout" button appears in navbar
- [ ] Can browse products
- [ ] Can add products to cart
- [ ] Can view cart
- [ ] Can proceed to checkout
- [ ] Prices display in rupees (₹)
- [ ] Logout works
- [ ] Can login with same account
- [ ] "Sign In" button works

## Features Verification

- [ ] Sign up form validates input
- [ ] Password confirmation works
- [ ] Login requires valid credentials
- [ ] Session persists after page refresh
- [ ] Different users can create accounts
- [ ] Cart data saved (not lost on refresh)
- [ ] Logout clears session
- [ ] Protected pages redirect to login

## Documentation

- [ ] Read `QUICK_START.md`
- [ ] Read `SETUP_INSTRUCTIONS.md`
- [ ] Understood MongoDB setup from `MONGODB_SETUP.md`
- [ ] Know where `.env.example` is for reference

## Production Ready

- [ ] Know your MongoDB connection is secure
- [ ] Have backup of `BETTER_AUTH_SECRET`
- [ ] Know how to deploy to Vercel (add env vars)
- [ ] Understand session management
- [ ] Know security best practices from docs

## Common Issues Resolved

If any of these appear, mark as resolved:

- [ ] "MONGODB_URI not set" - Resolved by creating `.env.local`
- [ ] "Failed to initialize adapter" - Resolved by checking MongoDB
- [ ] "Session not persisting" - Resolved by checking secret key
- [ ] Port 3000 in use - Resolved using different port

## Final Checks

- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in version control
- [ ] All documentation files present
- [ ] Can rebuild successfully: `pnpm build`
- [ ] Dev server starts cleanly: `pnpm dev`

## Ready for Deployment?

- [ ] App works locally
- [ ] All environment variables documented
- [ ] MongoDB instance is production-ready
- [ ] Secret key is secure
- [ ] Ready to deploy to Vercel/other platform

---

## 🎉 Congratulations!

If all items are checked, your ShopHub with MongoDB authentication is fully operational!

### Next Steps:
1. Explore the product catalog
2. Test the shopping experience
3. Deploy to production when ready
4. Add additional features as needed

### Support:
- Quick issues: Check `QUICK_START.md`
- Setup help: See `SETUP_INSTRUCTIONS.md`
- MongoDB issues: See `MONGODB_SETUP.md`
- Full documentation: Read `README_AUTH.md`

---

**Date Completed:** ________________

**Notes:** 
```
(Add any notes or customizations here)


```

Go to http://localhost:3000 and start shopping! 🛍️
