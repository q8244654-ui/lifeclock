# LifeClock - Cursor Development Instructions

## Project Overview

LifeClock is a premium psychological assessment app that guides users through a 100-question quiz to reveal their life archetype, hidden forces, and 47 personalized revelations. Users pay $47 for their complete report.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (NEEDS IMPLEMENTATION)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Audio**: Native Web Audio API

## Funnel Architecture

\`\`\`
/onboarding → /quiz → /result → /payment (MISSING) → /generating → /report
\`\`\`

### Page Breakdown

1. **`/onboarding`** - Conversational onboarding
   - Captures: name, age, gender, email
   - Captures referral code from URL (`?ref=ABC123`)
   - Saves to Supabase `onboarding_data` table
   - Generates unique referral code for user
   - Redirects to `/quiz`

2. **`/quiz`** - 100 questions across 10 phases
   - Phase transitions with animations
   - Questions personalized with user's name
   - Calculates 10 phase scores (0-100)
   - Saves results to localStorage
   - Redirects to `/result`

3. **`/result`** - Emotional reveal + CTA
   - Progressive message reveal (90 seconds max)
   - 3 random sounds (tap1.mp3, tap2.mp3, tap3.mp3)
   - Variable typing delays based on message type
   - CTA: "I want to see everything - $47"
   - Should redirect to `/payment` (MISSING)

4. **`/payment`** - ⚠️ MISSING - CRITICAL TO IMPLEMENT
   - Stripe checkout integration needed
   - Must track referral code from localStorage
   - On success → redirect to `/generating`

5. **`/generating`** - Loading animation
   - Simulates report generation (30 seconds)
   - Redirects to `/report`

6. **`/report`** - Complete premium report
   - User's archetype and life index
   - 3 Hidden Forces (Shadow, Fear, Power)
   - 47 personalized revelations
   - 10 phase details with insights
   - Radar chart of 4 energies
   - Life curve visualization
   - PDF export button
   - Social sharing
   - Referral link with stats

## Database Schema (Supabase)

### Tables

**`onboarding_data`**
\`\`\`sql
- id (uuid, primary key)
- name (text)
- age (integer)
- gender (text)
- email (text, unique)
- referral_code (text, unique) -- Generated for this user
- created_at (timestamp)
- updated_at (timestamp)
\`\`\`

**`reports`**
\`\`\`sql
- id (uuid, primary key)
- user_email (text, references onboarding_data.email)
- report_data (jsonb) -- Complete report JSON
- created_at (timestamp)
- accessed_at (timestamp)
\`\`\`

**`referrals`**
\`\`\`sql
- id (uuid, primary key)
- referrer_email (text) -- Person who shared the link
- referred_email (text) -- Person who signed up
- referrer_code (text) -- The referral code used
- status (text) -- 'pending' or 'completed'
- commission_amount (numeric) -- 10.00
- created_at (timestamp)
- completed_at (timestamp)
\`\`\`

### SQL Scripts to Run

Execute these in order:
1. `scripts/001_create_onboarding_table.sql`
2. `scripts/002_create_reports_table.sql`
3. `scripts/003_create_referrals_table.sql`

## Critical Missing Feature: Stripe Payment

### Current Problem

The referral system is implemented but **doesn't work** because:
- No payment page exists
- Referrals stay "pending" forever
- No one can actually purchase the report
- No commission tracking happens

### What Needs to Be Built

**1. Payment Page** - `/app/payment/page.tsx`
\`\`\`typescript
// Should:
// - Get quiz results from localStorage
// - Get referral code from localStorage (if exists)
// - Create Stripe checkout session
// - Redirect to Stripe hosted checkout
\`\`\`

**2. Create Checkout API** - `/app/api/stripe/create-checkout-session/route.ts`
\`\`\`typescript
// Should:
// - Accept quiz results + referral code
// - Create Stripe checkout session
// - Store referral code in session metadata
// - Return checkout URL
\`\`\`

**3. Stripe Webhook** - `/app/api/stripe/webhook/route.ts`
\`\`\`typescript
// Should:
// - Listen for checkout.session.completed
// - Get referral code from metadata
// - Update referral status to "completed"
// - Set completed_at timestamp
// - Redirect user to /generating
\`\`\`

**4. Success Page** - `/app/payment/success/page.tsx`
\`\`\`typescript
// Should:
// - Verify payment
// - Redirect to /generating
\`\`\`

### Stripe Environment Variables Needed

\`\`\`env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
LIFECLOCK_PRICE_ID=price_... (for $47 product)
\`\`\`

### Expected Payment Flow

\`\`\`
User clicks CTA on /result
  ↓
/payment page loads
  ↓
Create Stripe checkout session (API call)
  ↓
Redirect to Stripe hosted checkout
  ↓
User pays $47
  ↓
Stripe webhook fires
  ↓
Update referral status to "completed" (if referral exists)
  ↓
Redirect to /generating
  ↓
/report page shows complete report
\`\`\`

## Referral System Logic

### How It Works

1. **User A completes onboarding**
   - Referral code generated: `ABC123` (from email hash)
   - Stored in `onboarding_data.referral_code`

2. **User A shares link**
   - Link: `lifeclock.app/onboarding?ref=ABC123`
   - Shown on `/report` page

3. **User B clicks link**
   - `?ref=ABC123` captured in onboarding page
   - Stored in localStorage: `lifeclock-referral-code`

4. **User B completes onboarding**
   - System looks up User A's email via `referral_code = ABC123`
   - Creates entry in `referrals` table:
     - `referrer_email`: User A's email
     - `referred_email`: User B's email
     - `status`: "pending"
     - `commission_amount`: 10.00

5. **User B pays $47** (MISSING IMPLEMENTATION)
   - Webhook updates referral status to "completed"
   - User A now has $10 commission earned

6. **User A sees stats on /report**
   - Pending: X
   - Completed: Y
   - Earned: $Z

## Code Conventions

### Supabase Client Usage

**Client-side** (use in "use client" components):
\`\`\`typescript
import { createClient } from "@/lib/supabase/client"
const supabase = createClient()
\`\`\`

**Server-side** (use in Server Components/Actions):
\`\`\`typescript
import { createClient } from "@/lib/supabase/server"
const supabase = await createClient()
\`\`\`

### Styling Patterns

- Use Tailwind CSS v4 (config in `app/globals.css`)
- Design tokens: `bg-background`, `text-foreground`, etc.
- Animations with Framer Motion
- Conversational UI with message bubbles (see `components/chat-message.tsx`)

### Audio & Haptics

\`\`\`typescript
// Play random sound
const sounds = ["tap1.mp3", "tap2.mp3", "tap3.mp3"]
const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
const audio = new Audio(`/sounds/${randomSound}`)
audio.play()

// Vibrate
if (navigator.vibrate) {
  navigator.vibrate(80)
}
\`\`\`

### Message Timing (for conversational UX)

\`\`\`typescript
function getTypingDelay(messageType: string): number {
  switch (messageType) {
    case "action": return 1000
    case "normal": return 1500
    case "introspection": return 2000
    case "revelation": return 2300
    default: return 1500
  }
}
\`\`\`

## Environment Variables

Create `.env.local`:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe (NEEDS SETUP)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
LIFECLOCK_PRICE_ID=price_xxx

# Optional
SYSTEME_IO_API_KEY=xxx
\`\`\`

## Priority Tasks

### 1. Implement Stripe Payment (URGENT)

**Why**: The entire referral system and monetization depends on this.

**Files to create**:
- `/app/payment/page.tsx`
- `/app/api/stripe/create-checkout-session/route.ts`
- `/app/api/stripe/webhook/route.ts`
- `/app/payment/success/page.tsx`

**Reference**: Use Stripe's Next.js integration guide

### 2. Test Complete Funnel

- Onboarding with referral code
- Complete quiz
- Click CTA on result page
- Pay with Stripe test card
- Verify referral status updates
- Check report page loads correctly

### 3. Analytics & Optimization

- Add conversion tracking
- A/B test pricing ($37 vs $47)
- Track drop-off points
- Optimize load times

## Development Commands

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint
npm run lint
\`\`\`

## Testing Stripe Locally

\`\`\`bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Use test card
# Card: 4242 4242 4242 4242
# Expiry: Any future date
# CVC: Any 3 digits
\`\`\`

## Key Files Reference

### Core Pages
- `app/onboarding/page.tsx` - Onboarding flow
- `app/quiz/page.tsx` - Quiz with 10 phases
- `app/result/page.tsx` - Emotional reveal + CTA
- `app/report/page.tsx` - Complete report

### Components
- `components/chat-message.tsx` - Message bubble UI
- `components/phase-transition.tsx` - Phase animations
- `components/forces-cachees.tsx` - Hidden forces section
- `components/revelations.tsx` - 47 revelations display
- `components/referral-section.tsx` - Referral link + stats
- `components/charts-section.tsx` - Data visualizations

### Logic
- `lib/analyze-forces.ts` - Analyze Shadow/Fear/Power
- `lib/generate-insights.ts` - Generate 47 revelations
- `lib/compute-life-clock-final-report.ts` - Calculate report
- `lib/generate-referral-code.ts` - Create referral codes

### Supabase
- `lib/supabase/client.ts` - Client-side Supabase
- `lib/supabase/server.ts` - Server-side Supabase

## Common Issues & Solutions

### Issue: Referrals not updating
**Cause**: No Stripe webhook implementation
**Solution**: Implement `/app/api/stripe/webhook/route.ts`

### Issue: User name showing as {name}
**Cause**: Variable replacement not working
**Solution**: Already fixed in `app/quiz/page.tsx` with `replaceVariables()`

### Issue: Infinite messages in onboarding
**Cause**: useEffect triggering multiple times
**Solution**: Already fixed with `hasStarted` guard

### Issue: Supabase RLS blocking inserts
**Cause**: Row Level Security policies
**Solution**: Check policies allow `anon` role to insert

## Design Philosophy

- **Mystical & Poetic Tone**: All copy should feel like a higher consciousness speaking
- **Progressive Revelation**: Build tension before revealing insights
- **Premium Feel**: Justify the $47 price with quality and depth
- **Conversational UX**: iMessage-style bubbles, natural pacing
- **Emotional Peaks**: Time CTAs at moments of highest emotional intensity

## Next Steps After Payment Implementation

1. **Email Integration**: Send report via email after purchase
2. **Admin Dashboard**: View all users, referrals, revenue
3. **Payout System**: Pay affiliates their commissions
4. **Retargeting**: Email users who didn't complete purchase
5. **Upsells**: Coaching, community, advanced reports

---

**Questions?** Review the code in the files mentioned above. Everything is well-commented and follows Next.js best practices.
