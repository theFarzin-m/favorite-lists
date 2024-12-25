import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hljnhwekklyblzmximer.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsam5od2Vra2x5Ymx6bXhpbWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0ODM3MjMsImV4cCI6MjA0OTA1OTcyM30.K--FCTVfB-wwTlpEFYU0CbWc9COD0olZr2wlfJCdgp8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
