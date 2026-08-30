# CRM Setup & Installation Guide

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier available)
- Code editor (VS Code recommended)

### 2. Clone or Navigate to Project
```bash
cd crm-app
```

### 3. Install Dependencies
All dependencies are already installed if you ran `npm install` during setup.

To reinstall:
```bash
npm install
```

### 4. Set Up Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to https://supabase.com and create/log into your project
   - Navigate to **Project Settings → API**
   - Copy the **Project URL** and **anon (public) key**

3. Update `.env.local`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Development Workflow

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── modals/         # Modal dialogs
├── pages/              # Page components
├── contexts/           # React Context (Auth)
├── hooks/              # Custom hooks
├── lib/                # Utilities & Supabase client
└── App.tsx             # Main app component
```

### Making Changes

**Creating a new component:**
```typescript
// src/components/MyComponent.tsx
import { cn } from '@/lib/cn';

interface MyComponentProps {
  // Define props
}

export function MyComponent({ ... }: MyComponentProps) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

**Using the Supabase client:**
```typescript
import { supabase } from '@/lib/supabase';

// Query example
const { data, error } = await supabase
  .from('leads')
  .select()
  .eq('id', leadId);

// Insert example
const { data, error } = await supabase
  .from('leads')
  .insert({ company_name: 'Acme Corp' });
```

**Using authentication:**
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, logout } = useAuth();
  
  return <p>Logged in as: {user?.email}</p>;
}
```

---

## Building for Production

### Build the app
```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview production build locally
```bash
npm run preview
```

### Deploy to production
The `dist/` folder can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Restart the dev server
npm run dev
```

### Supabase connection errors
1. Check `.env.local` has correct keys
2. Verify Supabase project is active
3. Check network connectivity

---

## Testing

### Run TypeScript check
```bash
npx tsc --noEmit
```

### Lint code (if ESLint is configured)
```bash
npm run lint
```

---

## Next Steps

1. **Set up Supabase database** (See `DATABASE.md`)
2. **Create database tables** using Supabase SQL editor
3. **Enable Row Level Security** for data protection
4. **Test authentication** by logging in with test credentials
5. **Implement lead creation** feature (Phase 2)

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code quality
npm run lint            # Run linter (if configured)

# Troubleshooting
npm install             # Reinstall dependencies
rm -rf .next            # Clear cache
```

---

## API Reference Quick Links

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **Vite Docs**: https://vite.dev

---

**Last Updated**: 2026-08-30
