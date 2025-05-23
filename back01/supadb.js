const supabase = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

exports.supabase = supabase.createClient(supabaseUrl, supabaseKey);