import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/Note';
const supabaseUrl = 'https://wemhsmacqjdqbjrkkhjz.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
