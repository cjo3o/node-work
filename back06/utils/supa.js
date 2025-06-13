const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://wqetnltlnsvjidubewia.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZXRubHRsbnN2amlkdWJld2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NzI5NDksImV4cCI6MjA1ODM0ODk0OX0.-Jw0jqyq93rA7t194Kq4_umPoTci8Eqx9j-oCwoZc6k";
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY // 또는 ANON_KEY
);
module.exports = supabase;