import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pulabpguqotbkmxwyygr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1bGFicGd1cW90YmtteHd5eWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MzQ1MzUsImV4cCI6MjA2OTIxMDUzNX0.WOEaFVN4jXgU1nYnzdOTtVEozkJarYQwETj4YHBA4Ag';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);