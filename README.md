# ToNote - Note Taking App

A modern, feature-rich note-taking application built with Next.js 16, Supabase, and shadcn/ui.

## Features

- ✅ Create, read, update, and delete notes
- ✅ Archive/unarchive notes
- ✅ Tag-based organization
- ✅ Search notes by title, content, or tags
- ✅ Filter by tags
- ✅ Real-time updates with TanStack Query
- ✅ Responsive design with Tailwind CSS v4
- ✅ Client state management with Zustand
- ✅ Server state management with TanStack Query

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Database:** Supabase
- **State Management:**
  - Zustand (UI/client state)
  - TanStack Query (server state)
- **Package Manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- Supabase account

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the following SQL in the Supabase SQL Editor to create the notes table:

```sql
-- Create notes table
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL
);

-- Create index for better query performance
CREATE INDEX idx_notes_user_id ON notes(user_id);
CREATE INDEX idx_notes_updated_at ON notes(updated_at DESC);
CREATE INDEX idx_notes_is_archived ON notes(is_archived);

-- Enable Row Level Security (RLS)
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create a policy for development (adjust for production)
CREATE POLICY "Allow all operations for development" ON notes
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get these values from your Supabase project settings under "API".

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/ # Next.js App Router
│ ├── layout.tsx # Root layout with providers
│ ├── page.tsx # Main notes page
│ └── globals.css # Global styles
├── components/
│ ├── layout/ # Layout components (Logo, Header)
│ ├── notes/ # Note-specific components
│ ├── sidebar/ # Sidebar components
│ ├── ui/ # shadcn UI components
│ └── providers/ # React Query provider
├── hooks/ # Custom React hooks
│ └── use-notes.ts # TanStack Query hooks for notes
├── lib/
│ ├── api/ # API client functions
│ ├── store/ # Zustand stores
│ ├── supabase.ts # Supabase client
│ └── utils.ts # Utility functions
├── types/ # TypeScript types
│ ├── database.types.ts # Supabase database types
│ └── index.ts # Application types
└── public/
└── icons/ # SVG icons
```

## Key Components

### State Management

- **Zustand Store** (`lib/store/ui-store.ts`): Manages UI state including:
  - Selected note
  - View filter (all/archived)
  - Search query
  - Selected tags
  - Draft note content

- **TanStack Query** (`hooks/use-notes.ts`): Manages server state with:
  - Automatic caching
  - Background refetching
  - Optimistic updates
  - Loading and error states

### Data Layer

- **Supabase Client** (`lib/supabase.ts`): PostgreSQL database with real-time capabilities
- **API Functions** (`lib/api/notes.ts`): CRUD operations for notes

## Features Breakdown

### Note Management

- Create new notes with title, content, and tags
- Edit existing notes
- Delete notes with confirmation
- Archive/unarchive notes

### Filtering & Search

- Filter by view (All Notes / Archived Notes)
- Search across title, content, and tags
- Multi-select tag filtering
- Combined filters work together

### UI/UX

- Two-column layout (notes list + editor)
- Responsive design
- Real-time tag updates
- Auto-save indicators
- Empty states for no notes/no results

## Development Notes

### Adding New Features

1. **Database Changes**: Update the Supabase schema first
2. **Types**: Update `types/database.types.ts` and `types/index.ts`
3. **API Layer**: Add functions to `lib/api/notes.ts`
4. **Hooks**: Create TanStack Query hooks in `hooks/`
5. **Components**: Build UI components
6. **State**: Add to Zustand store if needed

### shadcn Components

To add new shadcn components:

```bash
npx -y shadcn@latest add [component-name]
```

## Production Deployment

### Important Steps

1. **Authentication**: Replace `temp-user-id` in `lib/api/notes.ts` with actual authentication
2. **RLS Policies**: Update Supabase Row Level Security policies for production
3. **Environment Variables**: Set up production environment variables
4. **Error Handling**: Add proper error boundaries and user feedback
5. **Performance**: Consider pagination for large note collections

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
