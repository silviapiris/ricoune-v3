# Ricoune - Site Officiel V2

Site officiel de Ricoune, artiste incontournable des fetes du sud de la France.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a new project on [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run `supabase/schema.sql` to create tables and RLS policies
4. Run `supabase/seed.sql` to insert albums and concerts data
5. Copy the project URL and anon key to your `.env.local`

## Vercel Deployment

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Project Structure

```
src/
  app/              # Next.js App Router pages
    albums/         # Albums listing + individual album pages
    biographie/     # Biography page
    boutique/       # Shop / streaming platforms
    concerts/       # Concert dates
    contact/        # Contact form + social links
    photos/         # Photo gallery
    professionnels/ # Pro section (formules, devis, photos HD)
    videos/         # Video gallery
  components/       # Reusable components
  data/             # Static data (albums, concerts)
  lib/              # Supabase client
  types/            # TypeScript type definitions
supabase/
  schema.sql        # Database schema + RLS policies
  seed.sql          # Seed data for albums and concerts
```
