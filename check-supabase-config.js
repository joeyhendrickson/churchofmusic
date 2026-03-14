#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Supabase Configuration...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('Please create a .env.local file with your Supabase configuration.');
  process.exit(1);
}

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

// Check required variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('📋 Environment Variables Check:');
let allPresent = true;

requiredVars.forEach(varName => {
  if (envVars[varName]) {
    console.log(`✅ ${varName}: Present`);
    
    // Check if it looks like a valid Supabase URL/key
    if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
      if (envVars[varName].includes('supabase.co')) {
        console.log(`   📍 URL: ${envVars[varName]}`);
      } else {
        console.log(`   ⚠️  URL doesn't look like a Supabase URL`);
        allPresent = false;
      }
    }
    
    if (varName === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') {
      if (envVars[varName].startsWith('eyJ')) {
        console.log(`   🔑 Key: ${envVars[varName].substring(0, 20)}...`);
      } else {
        console.log(`   ⚠️  Key doesn't look like a valid JWT token`);
        allPresent = false;
      }
    }
  } else {
    console.log(`❌ ${varName}: Missing`);
    allPresent = false;
  }
});

console.log('\n🌐 Network Connectivity Test:');

// Test DNS resolution
const { exec } = require('child_process');
const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];

if (supabaseUrl) {
  const hostname = supabaseUrl.replace('https://', '').replace('http://', '');
  
  exec(`nslookup ${hostname}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ DNS Resolution Failed: ${hostname}`);
      console.log(`   Error: ${error.message}`);
    } else {
      console.log(`✅ DNS Resolution Successful: ${hostname}`);
    }
    
    console.log('\n📝 Next Steps:');
    if (!allPresent) {
      console.log('1. ❌ Fix missing environment variables in .env.local');
    } else {
      console.log('1. ✅ Environment variables are present');
    }
    
    console.log('2. 🔍 Check your Supabase dashboard at https://supabase.com/dashboard');
    console.log('3. 📋 Verify your project is active and not suspended');
    console.log('4. 🔑 Copy the correct project URL and anon key from your project settings');
    console.log('5. 📝 Update your .env.local file with the correct values');
    console.log('6. 🔄 Restart your development server: npm run dev');
    
    console.log('\n💡 If your Supabase project was deleted, you may need to:');
    console.log('   - Create a new Supabase project');
    console.log('   - Run the database migration scripts');
    console.log('   - Update environment variables with new project details');
  });
} else {
  console.log('❌ Cannot test connectivity - Supabase URL is missing');
}

