# ⚡ QUICK START (5 Minutes)

Get your ShopHub e-commerce store with MongoDB authentication running in 5 minutes.

## Step 1: Get MongoDB (2 minutes)

### Choose Your Option:

#### Option A: Cloud (Recommended) ☁️
```
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Create account
4. Create M0 (free) cluster
5. Click "Connect" 
6. Select "Drivers"
7. Copy connection string (looks like below)

mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority
```

#### Option B: Local 💻
```
1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start service:
   - Mac: brew services start mongodb-community
   - Linux: sudo systemctl start mongod
   - Windows: Run "mongod" in PowerShell

3. Connection string:
   mongodb://localhost:27017/shophub
```

## Step 2: Generate Secret Key (1 minute)

Run in terminal:
```bash
openssl rand -base64 32
```

Copy the output (looks like: `kR7x9mP2nQ8vL3jB5oD6tE9wF4uH1sK2xC3yN6pM0rJ7...`)

## Step 3: Create .env.local (1 minute)

In your project root, create file `.env.local`:

```env
MONGODB_URI=paste_your_connection_string_here

BETTER_AUTH_SECRET=paste_your_generated_secret_here
```

Example:
```env
MONGODB_URI=mongodb+srv://john:password123@cluster0.mongodb.net/shophub?retryWrites=true&w=majority

BETTER_AUTH_SECRET=kR7x9mP2nQ8vL3jB5oD6tE9wF4uH1sK2xC3yN6pM0rJ7
```

## Step 4: Start Server (Instant)

```bash
pnpm dev
```

## Step 5: Test It (1 minute)

1. Open http://localhost:3000
2. Click "Sign Up" in top right
3. Create account:
   - Name: Your Name
   - Email: your.email@example.com
   - Password: Any password (minimum 6 chars)
4. Click "Sign Up"
5. ✅ You're logged in!
6. Browse products and add to cart
7. Go to checkout
8. Click "Logout" to test

## ✅ Done! 🎉

Your ShopHub is now running with MongoDB authentication!

---

## Common Issues

| Error | Fix |
|-------|-----|
| "MONGODB_URI not set" | Make sure `.env.local` file exists in root |
| "Connection timeout" | MongoDB not running or URI wrong |
| "Sign up button doesn't work" | Restart server after adding `.env.local` |

## Troubleshooting

### MongoDB connection fails
```
For Atlas:
- Check your IP is whitelisted in MongoDB dashboard
- Verify username/password in connection string

For Local:
- Make sure mongod is running
- Check port 27017 is available
```

### Still having issues?

See full docs:
- **SETUP_INSTRUCTIONS.md** - Detailed setup
- **MONGODB_SETUP.md** - MongoDB help
- **README_AUTH.md** - Full documentation

## Features Ready to Use

✅ Sign up / Login / Logout
✅ Protected sessions
✅ Shopping cart (saves automatically)
✅ Product browsing
✅ Checkout process
✅ Prices in Indian Rupees (₹)

## What's Next?

After testing:

1. Deploy to Vercel:
   - Push to GitHub
   - Connect repo to Vercel
   - Add same env vars
   - Deploy!

2. Add more features:
   - Email verification
   - Order history
   - User profiles
   - Payment gateway

See **README_AUTH.md** for full feature list.

## File Locations

| What | File |
|------|------|
| Config templates | `.env.example` |
| Your settings | `.env.local` (CREATE THIS) |
| Quick start | `SETUP_INSTRUCTIONS.md` |
| Full docs | `README_AUTH.md` |
| MongoDB help | `MONGODB_SETUP.md` |

---

## 🚀 You're Ready!

```bash
# Your commands:
openssl rand -base64 32          # Generate secret
# Copy to .env.local along with MONGODB_URI

pnpm dev                         # Start server
# Visit http://localhost:3000
# Sign up and test!
```

That's it! You have a fully working e-commerce store with authentication. 🎊

**Questions?** Check the documentation files or retry the steps above.
