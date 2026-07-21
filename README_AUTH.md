# ShopHub Authentication with MongoDB

A full-featured e-commerce store with **MongoDB-based authentication** using Better Auth.

## Features

✨ **Authentication**
- Email & password sign up
- Secure login/logout
- Session management with cookies
- Password hashing via Better Auth
- Cross-environment support (dev, preview, production)

🛍️ **E-Commerce**
- Product listing with search & filtering
- Shopping cart with persistent storage
- Product details page
- Checkout flow with pricing in Indian Rupees (₹)
- User-scoped order management

🔒 **Security**
- Secure session tokens
- CSRF protection
- Environment-based configuration
- No hardcoded secrets

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- pnpm (or npm/yarn)

### Setup

1. **Clone and install:**
```bash
cd /vercel/share/v0-project
pnpm install
```

2. **Get MongoDB:**

**Option A: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create account and cluster
- Get connection string

**Option B: Local MongoDB**
- Install MongoDB: https://docs.mongodb.com/manual/installation/
- Run `mongod` in terminal

3. **Generate secret:**
```bash
openssl rand -base64 32
```

4. **Create `.env.local`:**
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/shophub
BETTER_AUTH_SECRET=<paste-generated-secret>
```

5. **Start dev server:**
```bash
pnpm dev
```

6. **Visit http://localhost:3000**
   - Click "Sign Up" to create account
   - Add products to cart
   - Checkout with your user profile

## Project Structure

```
app/
├── page.tsx                 ← Homepage with products
├── login/page.tsx          ← Login page
├── register/page.tsx       ← Sign-up page
├── cart/page.tsx           ← Shopping cart
├── checkout/page.tsx       ← Checkout form
├── products/[id]/page.tsx  ← Product details
└── api/auth/[...all]/      ← Auth API endpoints

lib/
├── auth.ts                 ← Better Auth config (MongoDB)
├── auth-client.ts          ← Client-side auth utilities
├── auth-utils.ts           ← Server-side auth helpers
└── db/
    ├── index.ts            ← MongoDB connection
    └── schema.ts           ← Collection references

components/
├── navbar.tsx              ← Navigation with auth status
├── footer.tsx              ← Footer
├── product-card.tsx        ← Product listing card
├── cart-item.tsx           ← Cart item component
└── auth-form.tsx           ← Shared login/signup form

context/
└── cart-context.tsx        ← Shopping cart state

public/
└── images/                 ← Product images
```

## Authentication Flow

### Sign Up
1. User fills sign-up form
2. Better Auth hashes password
3. User document created in MongoDB
4. Session cookie issued
5. Redirect to homepage

### Login
1. User enters email & password
2. Password verified against hash
3. Session created in MongoDB
4. Cookie returned to browser
5. User logged in

### Protected Routes
- Login/register pages redirect authenticated users to home
- Cart & checkout show current user's data
- All user data automatically scoped to current session

## MongoDB Collections

Better Auth automatically creates:

```
shophub/
├── users           ← User accounts
├── sessions        ← Active sessions
├── accounts        ← OAuth connections
└── verifications   ← Email tokens
```

No migrations needed - collections created on first use!

## Environment Variables

### Required for Production
```env
MONGODB_URI=mongodb+srv://...
BETTER_AUTH_SECRET=<32+ char random string>
```

### Optional
```env
MONGODB_DB_NAME=shophub          # Database name
BETTER_AUTH_URL=https://domain   # Custom domain
NODE_ENV=development|production
```

For local development, create `.env.local` from `.env.example`.

## Testing

### Manual Testing
1. Sign up with test account
2. Browse products
3. Add to cart
4. Go to checkout
5. Verify prices in rupees
6. Logout and login again

### API Endpoints
- `POST /api/auth/sign-up` - Create account
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get session

## Deployment

### Vercel
1. Connect GitHub repo
2. Add environment variables:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
3. Deploy!

### Other Platforms (Heroku, Railway, etc.)
1. Set same environment variables
2. Deploy your code
3. Auth works automatically

## Pricing

All product prices are displayed in **Indian Rupees (₹)**

**Example:**
- Premium Wireless Headphones: ₹7,499
- Stainless Steel Water Bottle: ₹1,299
- Travel Backpack: ₹4,999

Shipping is free for orders over ₹5,000.

## Documentation

- **`SETUP_INSTRUCTIONS.md`** - Quick start guide
- **`MONGODB_SETUP.md`** - Detailed MongoDB setup
- **`MIGRATION_NOTES.md`** - PostgreSQL → MongoDB changes
- **`.env.example`** - Environment template

## Troubleshooting

### "Failed to initialize database adapter"
MongoDB not running or connection string wrong.
- For Atlas: Whitelist your IP
- For local: Run `mongod`

### Session not persisting
- Check `BETTER_AUTH_SECRET` is set
- Clear browser cookies
- Restart dev server

### Port 3000 already in use
```bash
pnpm dev -- -p 3001
```

## Features to Add

You can extend this with:
- [ ] Email verification
- [ ] Password reset
- [ ] OAuth (Google, GitHub)
- [ ] User profiles
- [ ] Order history
- [ ] Reviews & ratings
- [ ] Wishlist
- [ ] Coupon codes
- [ ] Payment gateway (Stripe, Razorpay)
- [ ] Admin dashboard

## Security Notes

🔒 **Best Practices**
- Never commit `.env.local` to Git
- Use strong, random `BETTER_AUTH_SECRET`
- Rotate secrets in production
- Use HTTPS in production
- Enable MongoDB IP whitelisting
- Regular backups of MongoDB

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Database:** MongoDB with Better Auth
- **Authentication:** Better Auth (email + password)
- **State:** React Context, SWR for data
- **Icons:** Lucide React

## Performance

- ⚡ Server-side rendering for SEO
- 🎯 Optimized images
- 📦 Bundle size optimized
- 🔄 Efficient database queries
- 💾 Session-based caching

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## License

MIT

## Support

Need help?
1. Check documentation files
2. Review error messages in browser console/terminal
3. See Better Auth docs: https://www.betterauth.dev/
4. MongoDB docs: https://docs.mongodb.com/

## Next Steps

1. ✅ Set up MongoDB and `.env.local`
2. ✅ Run `pnpm dev` and test auth
3. ✅ Try signing up and shopping
4. ✅ Deploy to production
5. 🚀 Add more features!

---

**Happy shopping! 🛍️**

Your ShopHub is ready to go. Just add your MongoDB connection and secret key to get started.
