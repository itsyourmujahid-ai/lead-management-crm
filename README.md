# Lead Management & Sales Follow-up CRM

A professional CRM application for construction, architectural glass, and aluminium businesses to manage sales leads, track interactions, and schedule follow-ups.

**Status**: 🟢 Foundation Complete - Ready for Phase 1 Implementation

## 📚 Documentation

### Quick Start
1. **New to the project?** → Start with [FOUNDATION.md](./FOUNDATION.md)
2. **Ready to set up?** → Follow [SETUP.md](./SETUP.md)
3. **Need database info?** → Check [DATABASE.md](./DATABASE.md)

### Full Documentation Index
- [FOUNDATION.md](./FOUNDATION.md) - Architecture, features, and roadmap
- [DATABASE.md](./DATABASE.md) - Database schema and design
- [SETUP.md](./SETUP.md) - Installation and deployment guide

## 🚀 Quick Start

```bash
# Install dependencies (already done)
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🏗️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |

## ✨ Current Features

### Phase 0 - Foundation (✅ Complete)
- [x] React + TypeScript + Vite setup
- [x] Authentication system (login/signup)
- [x] Main navigation (6 sections)
- [x] UI component library (Button, Card, Dialog, etc.)
- [x] Page structure (Dashboard, Leads, Pipeline, Follow-ups, Reports, Settings)
- [x] Add Lead modal (UI only)
- [x] Responsive layout
- [x] Database schema design

### Coming Soon
- [ ] Lead creation & storage
- [ ] Lead list & search
- [ ] Pipeline/Kanban board
- [ ] Activity tracking
- [ ] Follow-up management
- [ ] Reports & analytics

## 📖 Usage

### Login
- Use any email and password (demo mode)
- Session persists across refreshes

### Navigate
- Use sidebar to switch between Dashboard, Leads, Pipeline, etc.
- Click "+ Add Lead" to create new leads (Phase 2 onwards)

### Customize
- Edit components in `src/components/`
- Modify pages in `src/pages/`
- Change styles with Tailwind in component files

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter (if configured)
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout (header, sidebar)
│   └── modals/         # Modal dialogs
├── pages/              # Page components
├── contexts/           # React Context (auth)
├── hooks/              # Custom hooks
├── lib/                # Utilities & Supabase client
└── App.tsx             # Main app component
```

## 🗄️ Database Schema

Five core tables (not yet created):
- **profiles**: User information
- **leads**: Sales leads
- **lead_activities**: Interaction history
- **follow_ups**: Scheduled follow-ups
- **attachments**: File storage

See [DATABASE.md](./DATABASE.md) for full schema.

## 🔐 Security

- Supabase authentication (email/password)
- Row Level Security (RLS) ready
- Environment variables for sensitive data
- TypeScript type safety

## 📱 Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface

## 🛣️ Roadmap

### Phase 1: Database & Security
- Create Supabase tables
- Enable RLS policies
- Create migrations

### Phase 2: Lead Management
- Lead creation with database
- Lead list & search
- Lead details & editing

### Phase 3: Activity & Follow-ups
- Activity logging
- Follow-up scheduling
- Status tracking

### Phase 4: Pipeline & Analytics
- Kanban board
- Drag & drop
- Reports

### Phase 5: Advanced Features
- Realtime sync
- Attachments
- Team collaboration

See [FOUNDATION.md](./FOUNDATION.md#next-steps-recommended-implementation-order) for detailed roadmap.

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify, GitHub Pages, or any static host
Upload the `dist/` folder

## 🆘 Troubleshooting

**App won't start?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Can't connect to Supabase?**
- Check `.env.local` has correct keys
- Verify Supabase project is active

**TypeScript errors?**
- Restart the dev server
- Check that all imports use correct paths

See [SETUP.md](./SETUP.md#troubleshooting) for more help.

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

## 📝 License

Private project for construction/architectural glass business.

---

**Version**: 0.1.0 - Foundation  
**Last Updated**: 2026-08-30  
**Next Phase**: Database & Security Setup

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
