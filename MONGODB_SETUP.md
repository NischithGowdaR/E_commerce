# MongoDB Setup Guide for ShopHub

This authentication system uses **MongoDB** with **Better Auth** for secure user management.

## Quick Setup

### 1. Create a MongoDB Instance

You have two options:

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project
4. Create a new cluster (select Free tier)
5. Wait for cluster to be ready
6. Click "Connect" and select "Drivers"
7. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority`)

#### Option B: Local MongoDB
1. [Install MongoDB Community Server](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service
3. Use local connection string: `mongodb://localhost:27017/shophub`

### 2. Generate Better Auth Secret

```bash
openssl rand -base64 32
```

Copy the generated string.

### 3. Create .env.local File

Create a `.env.local` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your values:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub?retryWrites=true&w=majority

# Better Auth Secret (generated from openssl command above)
BETTER_AUTH_SECRET=your_generated_secret_key_here

# Optional: Database name (defaults to 'shophub')
# MONGODB_DB_NAME=shophub

# Optional: Better Auth URL (only for custom domains)
# BETTER_AUTH_URL=https://yourdomain.com
```

### 4. Start the Development Server

```bash
pnpm dev
```

The app will automatically create the required MongoDB collections when needed.

## Collections Created Automatically

Better Auth automatically creates these collections in MongoDB:

- `users` - User accounts and profile data
- `sessions` - Active user sessions
- `accounts` - OAuth provider accounts (if enabled)
- `verifications` - Email verification tokens

## Testing the Authentication

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up" in the navbar
3. Create a new account with email and password
4. You'll be logged in automatically
5. See your user info in the navbar
6. Click "Logout" to log out

## Troubleshooting

### "MONGODB_URI environment variable is not set"
- Make sure `.env.local` file exists in the project root
- Verify the `MONGODB_URI` key is spelled correctly
- Restart the dev server after adding the file

### "Failed to initialize database adapter"
- Verify your MongoDB connection string is valid
- For Atlas: Make sure your IP is whitelisted
- For local: Make sure MongoDB service is running

### Session not persisting
- Check that `BETTER_AUTH_SECRET` is set in `.env.local`
- Make sure cookies are enabled in your browser
- Clear browser cookies and try again

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add environment variables in your platform's settings:
   - `MONGODB_URI` - Your MongoDB connection string
   - `BETTER_AUTH_SECRET` - Your secret key

2. No code changes needed - the app works the same way!

## Security Notes

- Never commit `.env.local` to git - it contains sensitive credentials
- Use strong, randomly generated `BETTER_AUTH_SECRET`
- For MongoDB Atlas, use strong passwords and enable IP whitelisting
- Rotate your `BETTER_AUTH_SECRET` periodically in production
