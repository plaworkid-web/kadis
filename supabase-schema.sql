-- Jalankan SQL ini di Supabase Dashboard > SQL Editor
-- https://supabase.com/dashboard/project/kjlygfgixrcprdawmvsf/sql/new

CREATE TABLE IF NOT EXISTS public.ucapan (
  id bigint generated always as identity primary key,
  nama text not null,
  jabatan text default '',
  pesan text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
ALTER TABLE public.ucapan ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read ucapan
CREATE POLICY "Allow public read" ON public.ucapan
  FOR SELECT USING (true);

-- Allow anyone to insert ucapan
CREATE POLICY "Allow public insert" ON public.ucapan
  FOR INSERT WITH CHECK (true);
