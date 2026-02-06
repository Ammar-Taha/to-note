-- =============================================================================
-- TONOTE DATABASE SCHEMA - COMPLETE SETUP
-- Single source of truth for database schema with best practices
-- Run this in Supabase SQL Editor to set up everything correctly
-- =============================================================================

-- =============================================================================
-- 1. CREATE NOTES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.notes (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Note content
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  
  -- Status
  is_archived BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User relationship (UUID matches auth.uid() type)
  user_id UUID NOT NULL
);

-- =============================================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =============================================================================

-- Index for user_id lookups (most common query)
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON public.notes(user_id);

-- Index for sorting by updated_at (DESC for latest first)
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON public.notes(updated_at DESC);

-- Index for filtering archived notes
CREATE INDEX IF NOT EXISTS idx_notes_is_archived ON public.notes(is_archived);

-- Composite index for user's non-archived notes (common query pattern)
CREATE INDEX IF NOT EXISTS idx_notes_user_active ON public.notes(user_id, is_archived, updated_at DESC);

-- =============================================================================
-- 3. ADD FOREIGN KEY CONSTRAINT (OPTIONAL BUT RECOMMENDED)
-- =============================================================================

-- Links notes.user_id to auth.users.id
-- ON DELETE CASCADE ensures notes are deleted if user is deleted
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'notes_user_id_fkey'
  ) THEN
    ALTER TABLE public.notes
      ADD CONSTRAINT notes_user_id_fkey
      FOREIGN KEY (user_id)
      REFERENCES auth.users(id)
      ON DELETE CASCADE;
  END IF;
END $$;

-- =============================================================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 5. DROP EXISTING POLICIES (ALLOWS RE-RUNNING THIS SCRIPT)
-- =============================================================================

DROP POLICY IF EXISTS "Users can view their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can create their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can update their own notes" ON public.notes;
DROP POLICY IF EXISTS "Users can delete their own notes" ON public.notes;

-- =============================================================================
-- 6. CREATE RLS POLICIES (BEST PRACTICES)
-- =============================================================================

-- Policy: Users can only SELECT their own notes
-- Using subselect wrapper for stable query plans (Supabase best practice)
CREATE POLICY "Users can view their own notes"
ON public.notes
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- Policy: Users can only INSERT notes for themselves
CREATE POLICY "Users can create their own notes"
ON public.notes
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: Users can only UPDATE their own notes
CREATE POLICY "Users can update their own notes"
ON public.notes
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

-- Policy: Users can only DELETE their own notes
CREATE POLICY "Users can delete their own notes"
ON public.notes
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- =============================================================================
-- 7. VERIFICATION (OPTIONAL - SHOWS SETUP IS CORRECT)
-- =============================================================================

-- Show table structure
SELECT 
  column_name, 
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'notes'
ORDER BY ordinal_position;

-- Show indexes
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public' 
  AND tablename = 'notes'
ORDER BY indexname;

-- Verify RLS is enabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity as "RLS Enabled"
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename = 'notes';

-- Show all policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd as "Operation",
  roles
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'notes'
ORDER BY cmd;

-- =============================================================================
-- SETUP COMPLETE!
-- =============================================================================
-- 
-- ✅ Table created with UUID user_id (matches auth.uid())
-- ✅ Performance indexes created
-- ✅ Foreign key constraint to auth.users
-- ✅ RLS enabled
-- ✅ 4 security policies created (SELECT, INSERT, UPDATE, DELETE)
-- 
-- Your ToNote app is now ready to use with proper security!
-- 
-- Next steps:
-- 1. Test creating a note in your app
-- 2. Verify you can only see your own notes
-- 3. Sign in with different account and verify data isolation
-- =============================================================================
