# Ecommerce Template

A modern ecommerce platform built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI components.

## Features

- Modern UI with Shadcn components and Tailwind CSS
- Next.js 15 App Router
- TypeScript for type safety
- PostgreSQL database with Prisma ORM
- NextAuth.js for authentication
- Pexels API integration for product images
- Responsive design
- Dark/light mode support

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecommerce-template.git
   cd ecommerce-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and update the variables:
   ```bash
   cp .env.example .env
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

### Step 1: Connect Repository

Connect your GitHub repository to Vercel through the Vercel dashboard.

### Step 2: Configure Environment Variables

Add the following environment variables in your Vercel project settings:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., https://your-app.vercel.app)
- `NEXTAUTH_SECRET`: A strong random string (generate with `openssl rand -base64 32`)
- `RESEND_API_KEY`: Your Resend API key
- `EMAIL_FROM`: Your sender email
- `UPLOADTHING_SECRET`: Your Uploadthing secret
- `UPLOADTHING_APP_ID`: Your Uploadthing app ID
- `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL
- `NEXT_PUBLIC_APP_NAME`: Your app name
- `NEXT_PUBLIC_PEXELS_API_KEY`: Your Pexels API key

### Step 3: Database Setup

1. Create a PostgreSQL database accessible from Vercel (Vercel Postgres, Neon, Supabase, etc.)
2. Update the `DATABASE_URL` environment variable in Vercel
3. Run database migrations:
   ```bash
   # Locally:
   npx prisma migrate deploy
   ```
   Or set up a deployment hook to run migrations.

### Step 4: Deploy

Vercel will automatically deploy your application when you push to your main branch.

## Development

### Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Database Management

- `npx prisma studio`: Open Prisma Studio to manage your database
- `npx prisma migrate dev`: Create migrations from schema changes
- `npx prisma migrate deploy`: Apply migrations to your database

## License

MIT
