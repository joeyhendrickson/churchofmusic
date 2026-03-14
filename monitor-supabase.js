#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Monitoring Supabase connection...');
console.log(`📍 URL: ${supabaseUrl}`);
console.log('⏳ Checking every 30 seconds...\n');

let attempts = 0;
const maxAttempts = 20; // 10 minutes total

const checkConnection = async () => {
  attempts++;
  const timestamp = new Date().toLocaleTimeString();
  
  try {
    console.log(`[${timestamp}] Attempt ${attempts}/${maxAttempts}: Testing connection...`);
    
    const { data, error } = await supabase
      .from('artists')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log(`   ❌ Error: ${error.message}`);
      
      if (attempts >= maxAttempts) {
        console.log('\n⏰ Timeout reached. Supabase may still be restoring.');
        console.log('💡 Check your Supabase dashboard for restoration status.');
        process.exit(1);
      }
    } else {
      console.log('   ✅ Connection successful!');
      console.log('   📊 Database is responding');
      console.log('\n🎉 Your Supabase project is back online!');
      console.log('🚀 You can now use your platform normally.');
      process.exit(0);
    }
  } catch (error) {
    console.log(`   ❌ Network error: ${error.message}`);
    
    if (attempts >= maxAttempts) {
      console.log('\n⏰ Timeout reached. Please check your Supabase dashboard.');
      process.exit(1);
    }
  }
  
  // Wait 30 seconds before next attempt
  setTimeout(checkConnection, 30000);
};

// Start monitoring
checkConnection();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Monitoring stopped.');
  process.exit(0);
});





