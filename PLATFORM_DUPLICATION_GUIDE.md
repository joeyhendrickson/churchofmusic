# Platform Duplication Guide

## Overview
This guide will help you duplicate the LaunchThatSong platform and customize it for your own use case.

## Step 1: Create a New Project

### 1.1 Clone the Repository
```bash
# Create a new directory for your project
mkdir your-new-platform
cd your-new-platform

# Clone the LaunchThatSong repository
git clone https://github.com/your-username/launchthatsong-github.git .
```

### 1.2 Clean Up Git History
```bash
# Remove existing git history
rm -rf .git

# Initialize new git repository
git init
git add .
git commit -m "Initial commit: Duplicated from LaunchThatSong"
```

## Step 2: Update Project Configuration

### 2.1 Update package.json
```bash
# Edit package.json and change:
# - "name": "your-platform-name"
# - "description": "Your platform description"
# - "author": "Your Name"
# - "repository": "your-username/your-repo"
```

### 2.2 Update Environment Variables
```bash
# Copy .env.local to .env.local.new
cp .env.local .env.local.new

# Edit .env.local.new and update:
# - NEXT_PUBLIC_BASE_URL=http://localhost:3000
# - Keep Supabase credentials for now (we'll update these later)
```

## Step 3: Set Up New Supabase Project

### 3.1 Create New Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization
4. Enter project name (e.g., "your-platform-db")
5. Set database password
6. Choose region
7. Click "Create new project"

### 3.2 Get New Project Credentials
1. Go to Project Settings > API
2. Copy the Project URL
3. Copy the anon/public key
4. Copy the service_role key (for admin operations)

### 3.3 Update Environment Variables
```bash
# Edit .env.local.new and replace:
NEXT_PUBLIC_SUPABASE_URL=https://your-new-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-new-service-role-key
```

## Step 4: Set Up Database Schema

### 4.1 Run Database Migration Scripts
Execute these SQL scripts in your new Supabase project's SQL Editor:

1. **Basic Tables Setup**
```sql
-- Run the comprehensive_admin_system.sql script
-- This creates all the necessary tables and policies
```

2. **Add Sample Data**
```sql
-- Run add_sample_artists.sql (customize for your use case)
-- Update the artist names, descriptions, and images
```

### 4.2 Customize Database Schema (Optional)
If you need different data structures:

1. **Modify Tables**
   - Update `artists` table structure if needed
   - Modify `songs` table for your use case
   - Add new tables as required

2. **Update RLS Policies**
   - Modify the policies in `fix_homepage_rls_policies.sql`
   - Ensure proper access control for your use case

## Step 5: Customize Frontend Content

### 5.1 Update Branding and Text

#### Update Homepage (src/app/page.tsx)
```typescript
// Change these key elements:
- "Support Unreleased Songs" → "Your Platform Title"
- "Support what artists just wrote" → "Your platform description"
- Featured artists section → Your featured content
- Artist cards → Your content cards
```

#### Update Navigation (src/components/Navbar.tsx)
```typescript
// Update:
- "LaunchThatSong" → "Your Platform Name"
- Navigation links
- Logo/branding
```

#### Update Layout (src/app/layout.tsx)
```typescript
// Update:
- Page title
- Meta description
- Favicon
```

### 5.2 Customize Featured Content

#### Replace Artist Cards
In `src/app/page.tsx`, replace the artist cards with your content:

```typescript
// Example: Replace artists with products, services, etc.
const featuredItems = [
  {
    id: 'item-1',
    name: 'Your Item 1',
    description: 'Description of your item',
    image_url: 'https://your-image-url.com/image1.jpg',
    category: 'Your Category',
    rating: 85
  },
  // Add more items...
];
```

#### Update Card Components
Modify the card rendering to match your content type:

```typescript
// Replace artist-specific elements with your content elements
<div className="card">
  <Image src={item.image_url} alt={item.name} />
  <h3>{item.name}</h3>
  <p>{item.description}</p>
  <span>{item.category}</span>
  {/* Add your custom elements */}
</div>
```

### 5.3 Update How It Works Section

In `src/components/ArtistHowItWorks.tsx`:
```typescript
// Replace the artist-focused content with your platform's features
const features = [
  {
    title: "Your Feature 1",
    description: "Description of your feature",
    icon: "Your Icon"
  },
  // Add more features...
];
```

## Step 6: Customize Admin System

### 6.1 Update Admin Users
```sql
-- In your Supabase SQL Editor, run:
INSERT INTO admin_users (email, role, is_active, created_at)
VALUES ('your-email@example.com', 'admin', true, NOW());
```

### 6.2 Customize Admin Dashboard
Update `src/app/admin-dashboard/page.tsx`:
```typescript
// Modify the dashboard to show your relevant data
// Replace artist/song management with your content management
```

### 6.3 Update Admin API Routes
Modify the admin API routes in `src/app/api/admin/`:
```typescript
// Update approve-song/route.ts for your content type
// Modify the approval logic for your use case
```

## Step 7: Customize Authentication

### 7.1 Update User Types
If you're not dealing with artists, update the user system:

```typescript
// In login page and other auth components
// Replace "artist" with your user type (e.g., "creator", "vendor", etc.)
```

### 7.2 Update Signup Process
Modify `src/app/artist-signup/page.tsx`:
```typescript
// Rename to your-signup/page.tsx
// Update form fields for your use case
// Modify the signup API route
```

## Step 8: Add New Applications/Features

### 8.1 Create New Pages
```bash
# Create new page directories
mkdir -p src/app/your-new-feature
touch src/app/your-new-feature/page.tsx
```

### 8.2 Add New API Routes
```bash
# Create new API routes
mkdir -p src/app/api/your-new-feature
touch src/app/api/your-new-feature/route.ts
```

### 8.3 Update Navigation
Add your new features to the navigation in `src/components/Navbar.tsx`

## Step 9: Test and Deploy

### 9.1 Local Testing
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test all functionality
# - Homepage loads correctly
# - Featured content displays
# - Admin login works
# - New features function properly
```

### 9.2 Deploy to Production
```bash
# Deploy to Vercel (recommended)
npm install -g vercel
vercel

# Or deploy to other platforms
# - Netlify
# - Railway
# - Your own server
```

## Step 10: Post-Launch Tasks

### 10.1 Set Up Analytics
```typescript
// Add analytics tracking
// Google Analytics, Mixpanel, etc.
```

### 10.2 Configure Email Services
```typescript
// Set up email notifications
// Update email templates for your use case
```

### 10.3 Set Up Monitoring
```typescript
// Add error monitoring
// Set up uptime monitoring
```

## Customization Examples

### For an E-commerce Platform
- Replace "artists" with "vendors"
- Replace "songs" with "products"
- Update featured content to show featured products
- Modify admin dashboard for product management

### For a Service Marketplace
- Replace "artists" with "service providers"
- Replace "songs" with "services"
- Update featured content to show featured services
- Modify admin dashboard for service approval

### For a Content Platform
- Replace "artists" with "creators"
- Replace "songs" with "content"
- Update featured content to show featured content
- Modify admin dashboard for content moderation

## Important Notes

1. **Keep the existing error handling** - It's well-implemented
2. **Maintain the responsive design** - It works well on all devices
3. **Preserve the authentication system** - It's secure and functional
4. **Keep the admin approval workflow** - It's a good pattern for content moderation

## Troubleshooting

### Common Issues
1. **Database connection errors** - Check Supabase credentials
2. **Image loading issues** - Update image URLs to your content
3. **Authentication problems** - Verify admin user setup
4. **Styling issues** - Check CSS class names after customization

### Getting Help
- Check the original LaunchThatSong documentation
- Review Supabase documentation for database issues
- Test thoroughly before going live 