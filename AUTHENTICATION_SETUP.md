# ShopHub Authentication Setup

Your ShopHub e-commerce app is configured for **MongoDB + Better Auth** for user authentication.

## What You Need to Do

### Step 1: Get MongoDB

Choose one option:

#### Option A: MongoDB Cloud (Recommended - easiest)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free M0 cluster (takes 2-3 minutes)
4. Click "Connect" → "Drivers"
5. Copy the connection string that looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB
1. Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and run MongoDB on your machine
3. Default connection: `mongodb://localhost:27017/shophub`

### Step 2: Update `.env.local`

Edit the `.env.local` file in your project root with:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your-random-32-character-secret-key
```

**To generate a secret key:**
```bash
openssl rand -base64 32
```

### Step 3: Start the App

```bash
pnpm dev
```

Visit `http://localhost:3000` and test:
- Create an account at `/register`
- Login at `/login`
- Use the shopping cart
- Logout and login again

## MongoDB Setup Details

### MongoDB Atlas (Cloud)
1. Whitelist your IP address in Network Access
2. Make sure your connection string includes:
   - `retryWrites=true`
   - `w=majority`

### Local MongoDB
1. Start MongoDB service:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```
2. Verify connection:
   ```bash
   mongosh
   ```

## Environment Variables

**Required:**
- `MONGODB_URI` - Your MongoDB connection string
- `BETTER_AUTH_SECRET` - Random 32+ character string

**Optional:**
- `MONGODB_DB_NAME` - Database name (defaults to 'shophub')
- `BETTER_AUTH_URL` - For custom domains only

## Testing Authentication

1. **Sign Up:**
   - Go to `/register`
   - Enter name, email, password
   - Submit the form
   - You should be logged in automatically

2. **Login:**
   - Go to `/login`
   - Enter email and password
   - Submit the form
   - You should see your email in the navbar

3. **Logout:**
   - Click the "Logout" button in the navbar
   - You should be logged out

4. **Shopping:**
   - Add products to cart
   - Cart data persists per user
   - Checkout page works
   - Prices show in Indian Rupees (₹)

## Database Collections

Better Auth automatically creates these MongoDB collections:

- `users` - User accounts and profiles
- `sessions` - Active user sessions
- `accounts` - OAuth account links (if configured)
- `verifications` - Email verification tokens

No manual database setup needed!

## Deployment to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel project settings:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
4. Deploy!

## Troubleshooting

### "Failed to connect to MongoDB"
- Check if MongoDB is running
- Verify connection string in `.env.local`
- Test connection with: `mongosh mongodb://your-connection-string`

### "Authentication not working"
- Clear browser cookies
- Restart dev server: `pnpm dev`
- Check `.env.local` has both `MONGODB_URI` and `BETTER_AUTH_SECRET`

### "Sessions not persisting"
- Make sure MongoDB is actually connected
- Check browser dev tools → Application → Cookies for `better-auth.session_token`

### Connection string issues
- MongoDB Atlas: Use `mongodb+srv://` protocol
- Local MongoDB: Use `mongodb://` protocol
- Always include database name at the end: `/shophub`

## File Locations

- **Auth Code:** `lib/auth.ts`, `lib/auth-client.ts`, `lib/auth-utils.ts`
- **Auth Pages:** `app/login/page.tsx`, `app/register/page.tsx`
- **Auth Form:** `components/auth-form.tsx`
- **API Routes:** `app/api/auth/[...all]/route.ts`
- **Config:** `.env.local`

## Security Notes

- ✅ `BETTER_AUTH_SECRET` should be 32+ random characters
- ✅ `.env.local` is in `.gitignore` (never committed)
- ✅ No secrets in source code
- ✅ Passwords are hashed automatically
- ✅ Sessions use secure HTTP-only cookies

## Next Steps

1. Set up MongoDB (5 minutes)
2. Update `.env.local` (1 minute)
3. Run `pnpm dev` (instant)
4. Test authentication
5. Deploy to Vercel when ready

## Help

If you get stuck:
1. Check MongoDB is running
2. Verify `.env.local` has correct values
3. Check `pnpm dev` terminal for error messages
4. Clear browser cache and cookies
5. Restart dev server

---

**Your authentication system is ready!**
Just add MongoDB and update `.env.local`, then everything will work. 🚀
