import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// cookie config
export const sessionConfig = {
  name: "qid",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
};
