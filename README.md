# ToNote

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3ECF8E?style=flat-square&logo=supabase) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A modern, minimal note-taking app that helps you capture ideas, organize with tags, and find what matters—instantly.**

[Introduction](#introduction) • [Features](#features) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Tech Stack](#tech-stack) • [Contributing](#contributing)

</div>

---

## Introduction

**ToNote** is a full-featured note-taking application built with the Next.js 16 App Router, Supabase for authentication and database, and a rich editing experience powered by TipTap. It offers a clean two-column layout, tag-based organization, search, archive, and theme support—all with real-time updates and a responsive UI.

### Why ToNote?

- **Secure & personal** — Supabase Auth (email/password, Google, magic link) with Row Level Security so notes stay private.
- **Rich editing** — TipTap editor with formatting, links, images, tables, and task lists.
- **Organized** — Tags, archive, and full-text search across title, content, and tags.
- **Pleasant to use** — Light/dark theme, font choices (sans/mono/serif), and a minimal interface.

---

## Features

| Feature | Description |
|--------|-------------|
| **Notes CRUD** | Create, read, update, and delete notes with title, rich content, and tags. |
| **Archive** | Archive and unarchive notes; filter view by All Notes or Archived. |
| **Tags** | Add tags to notes; filter by one or multiple tags in the sidebar. |
| **Search** | Search by title, content, or tags with live filtering. |
| **Rich text** | TipTap editor: bold, italic, lists, links, images, tables, task lists. |
| **Auth** | Email/password, Google sign-in, magic link (OTP), forgot/reset password. |
| **Settings** | Color theme (light/dark/system), font family, change password. |
| **Real-time** | TanStack Query for caching, refetching, and optimistic updates. |
| **State** | Zustand for UI state; TanStack Query for server state. |

---

## Getting Started

### Prerequisites

| Requirement | Details |
|-------------|---------|
| [Node.js](https://nodejs.org/) | 20+ |
| [pnpm](https://pnpm.io/) | Package manager |
| [Supabase](https://supabase.com) | Account for auth and database |

### Installation

1. **Clone and install dependencies**

```bash
git clone <your-repo-url>
cd "ToNote - Note Taking"
pnpm install
```

2. **Set up Supabase**

- Create a project at [supabase.com](https://supabase.com).
- In the SQL Editor, run the schema from `supabase/schema.sql` (creates `notes` table, indexes, RLS policies, and triggers).

3. **Configure environment**

Copy the example env and add your Supabase keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project: **Settings → API**.

4. **Run the development server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use the auth pages to sign up or log in, then start creating notes.

### Build for production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
├── app/
│   ├── (auth)/                 # Auth route group
│   │   ├── forgot-password/
│   │   ├── login/
│   │   ├── otp-login/
│   │   ├── reset-password/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── auth/callback/          # OAuth callback
│   ├── landing/                # Landing page
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── page.tsx                # Main notes app (protected)
│   ├── protected-route.tsx    # Auth guard
│   └── globals.css
├── components/
│   ├── layout/                 # Logo, Header
│   ├── notes/                  # NoteEditor, NoteViewer, NoteListItem, RichTextEditor
│   ├── providers/              # AuthProvider, QueryProvider, ThemeProvider
│   ├── settings/               # SettingsDialog, theme/font/password settings
│   ├── sidebar/                # Navigation, TagsPanel, UserMenu
│   └── ui/                     # shadcn/ui + custom (SearchInput, otp-input)
├── hooks/
│   └── use-notes.ts            # TanStack Query hooks for notes API
├── lib/
│   ├── api/notes.ts            # Notes CRUD (Supabase client)
│   ├── store/ui-store.ts       # Zustand UI state
│   ├── supabase/               # Browser & server Supabase clients
│   └── utils.ts
├── types/
│   ├── database.types.ts       # Supabase-generated types
│   └── index.ts               # Note, NoteFormData, ViewFilter, UIState
├── supabase/
│   ├── schema.sql             # Full DB schema (notes, RLS, triggers)
│   └── email-templates/       # Auth email templates
├── public/                     # Favicons, icons, assets
├── middleware.ts              # Supabase session refresh
└── next.config.ts
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | React 19, Radix UI, Tailwind CSS v4, shadcn/ui |
| **Backend** | Supabase (PostgreSQL, Auth, RLS) |
| **Rich text** | TipTap (Starter Kit, tables, task lists, links, images) |
| **State** | Zustand (UI), TanStack Query (server) |
| **Package manager** | pnpm |

---

## Key Modules

| Module | Purpose |
|--------|---------|
| `app/page.tsx` | Main notes view: sidebar, list, editor/viewer, filters. |
| `app/protected-route.tsx` | Wraps app and redirects unauthenticated users. |
| `components/providers/auth-provider.tsx` | Auth context (user, signIn, signOut, signInWithGoogle, etc.). |
| `hooks/use-notes.ts` | TanStack Query: notes list, create, update, delete, archive. |
| `lib/store/ui-store.ts` | Selected note, view filter, search, selected tags, edit mode, settings. |
| `lib/api/notes.ts` | Notes API using Supabase client (scoped by `user_id`). |
| `lib/supabase/client.ts` | Browser Supabase client (`@supabase/ssr`). |
| `middleware.ts` | Refreshes Supabase session for Server Components. |
| `supabase/schema.sql` | Notes table, indexes, RLS policies, `updated_at` trigger. |

---

## Configuration

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous (public) key |

### Adding shadcn components

```bash
npx -y shadcn@latest add <component-name>
```

---

## Development Notes

1. **Database** — Prefer changing `supabase/schema.sql` and re-running in SQL Editor; keep `types/database.types.ts` in sync (Supabase CLI or manual).
2. **Auth** — All note operations use the authenticated user's `id`; RLS enforces per-user access.
3. **Adding features** — Extend types → API → hooks → UI; add UI state in `ui-store` if needed.

---

## Production Checklist

- [ ] Configure production Supabase project and env vars.
- [ ] RLS policies are already in `schema.sql`; verify they match your security rules.
- [ ] Consider pagination or virtualized list for very large note counts.
- [ ] Set up error boundaries and user-facing error messages where needed.

---

## License

MIT

---

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

<div align="center">

**[⬆ Back to top](#tonote)**

</div>
