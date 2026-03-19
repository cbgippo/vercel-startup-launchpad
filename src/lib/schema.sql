-- briefs table
CREATE TABLE IF NOT EXISTS briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  notes TEXT NOT NULL,
  generated_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Optional: index for per-user queries
CREATE INDEX IF NOT EXISTS idx_briefs_user_id ON briefs(user_id);
