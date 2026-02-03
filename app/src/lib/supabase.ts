import { createClient } from "@supabase/supabase-js";

// TODO: Brandon will provide these values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database (expand as needed)
export interface User {
  id: string;
  email: string;
  name?: string;
  level: number;
  xp: number;
  streak: number;
  created_at: string;
}

export interface Session {
  id: string;
  user_id: string;
  prompt_id: number;
  transcript: string;
  filler_count: number;
  eye_contact_percent: number;
  words_per_minute: number;
  score: number;
  xp_earned: number;
  created_at: string;
}

export interface Badge {
  id: string;
  user_id: string;
  badge_name: string;
  earned_at: string;
}
