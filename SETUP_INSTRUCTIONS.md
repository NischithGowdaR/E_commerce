# ShopHub - MongoDB Authentication Setup

Your authentication system is now configured to use **MongoDB** with **Better Auth**. Follow these steps to get started.

## What's Been Done

✅ Removed PostgreSQL/Neon dependencies
✅ Installed MongoDB driver and Better Auth MongoDB adapter  
✅ Updated auth configuration to use MongoDB
✅ Created `.env.example` and `.env.local` template files
✅ Authentication pages are ready (Sign In, Sign Up, with protected routes)

## Next Steps - Add Your MongoDB

### Step 1: Get MongoDB

Choose one option:

**Option A: MongoDB Atlas (Cloud - Recommended for production)**
- Visit https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority`)

**Option B: Local MongoDB (For local development)**
- Install MongoDB: https://docs.mongodb.com/manual/installation/
- Start MongoDB service: `mongod`
- Use connection string: `mongodb://localhost:27017/shophub`

### Step 2: Add Environment Variables

Edit `.env.local` in the project root and fill in your values:

```env
# Your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority

# Generate a secret key with: openssl rand -base64 32
BETTER_AUTH_SECRET=your-generated-secret-key-here
```

### Step 3: Generate Better Auth Secret

```bash
openssl rand -base64 32
```

Copy the output and paste it into `.env.local` as `BETTER_AUTH_SECRET`

### Step 4: Start Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 and click "Sign Up" to create an account!

## File Structure

```
lib/
├── auth.ts              ← Better Auth config (MongoDB adapter)
├── auth-client.ts       ← React client for auth
├── auth-utils.ts        ← Server utilities (getSession, getUserId)
├── db/
│   ├── index.ts         ← MongoDB connection
│   └── schema.ts        ← Collection names (for reference)

app/
├── api/auth/[...all]/   ← Auth API endpoints
├── login/               ← Login page
├── register/            ← Sign up page

components/
├── auth-form.tsx        ← Shared login/signup form
└── navbar.tsx           ← Shows auth status
```

## Collections Created Automatically

When you use the auth system, MongoDB will automatically create:

- `users` - User accounts and profiles
- `sessions` - Active user sessions  
- `accounts` - OAuth accounts (if enabled)
- `verifications` - Email verification tokens

## Testing the Auth System

1. Start dev server: `pnpm dev`
2. Go to http://localhost:3000
3. Click "Sign Up" in navbar
4. Create account with email/password
5. You'll be logged in automatically
6. Navbar shows your email and "Logout" button
7. Click "Logout" to log out

## Production Deployment

When deploying to Vercel or another platform:

1. Add environment variables in your platform's dashboard:
   - `MONGODB_URI` - Your MongoDB connection string
   - `BETTER_AUTH_SECRET` - Your secret key

2. That's it! The app works the same way.

**Important:** Never commit `.env.local` to Git - it contains your secrets!

## Troubleshooting

**"Failed to initialize database adapter"**
- MongoDB is not running or connection string is wrong
- For Atlas: Make sure your IP is whitelisted
- For local: Make sure `mongod` is running

**Session not persisting**
- Check `BETTER_AUTH_SECRET` is set in `.env.local`
- Restart dev server after adding `.env.local`
- Clear browser cookies

**Port already in use**
- Kill existing process: `pkill -f "pnpm dev"`
- Or use different port: `pnpm dev -- -p 3001`

## Security Best Practices

1. Use strong, randomly-generated `BETTER_AUTH_SECRET`
2. Never share your MongoDB connection string
3. Use IP whitelisting in MongoDB Atlas
4. Rotate secrets periodically in production
5. Use `.env.local` (not committed to Git) for local development

## Next: Add Features to Your Auth System

Once auth is working, you can:

- ✅ Add role-based access control
- ✅ Create user profiles/preferences
- ✅ Add email verification
- ✅ Implement OAuth (Google, GitHub, etc.)
- ✅ Add two-factor authentication
- ✅ Track user activity in database

See Better Auth docs: https://www.betterauth.dev/

## Support

For issues:
1. Check MONGODB_SETUP.md for detailed MongoDB setup
2. Verify `.env.local` has correct variables
3. Check browser console for client errors
4. Check terminal for server errors

Good luck! 🚀
