"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
