# Billing System Frontend

A Next.js 14+ frontend for the billing system with an Admin Dashboard and Customer Portal.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Query
- Axios
- Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- Backend running on port 8082

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin Dashboard
│   │   ├── dashboard/     # Overview with stats
│   │   ├── customers/     # Customer list + CRUD
│   │   ├── subscriptions/ # Subscription management
│   │   ├── invoices/      # Invoice list
│   │   └── usage/         # Usage tracking
│   └── portal/            # Customer Portal
│       ├── dashboard/     # Account overview
│       ├── subscriptions/ # View subscriptions
│       ├── invoices/      # View invoices
│       └── usage/         # Usage dashboard
├── components/
│   ├── layout/            # Layout components
│   └── ui/                # shadcn/ui components
└── lib/
    ├── api.ts             # API client
    └── utils.ts           # Utility functions
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8082/api/v1
```

## Pages

### Admin Dashboard
- `/admin/dashboard` - Overview with stats
- `/admin/customers` - Customer management (CRUD)
- `/admin/subscriptions` - Subscription management
- `/admin/invoices` - Invoice list
- `/admin/usage` - Usage tracking

### Customer Portal
- `/portal/dashboard` - Account overview
- `/portal/subscriptions` - View subscriptions
- `/portal/invoices` - View invoices
- `/portal/usage` - Usage dashboard

## API Integration

The frontend connects to the backend API at `http://localhost:8082/api/v1`. Make sure the backend is running before using the application.
