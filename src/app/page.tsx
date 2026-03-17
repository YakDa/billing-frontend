import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, CreditCard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Billing System</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete billing and subscription management solution
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                Manage customers, subscriptions, invoices, and track usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• Customer management</li>
                <li>• Subscription tracking</li>
                <li>• Invoice generation</li>
                <li>• Usage monitoring</li>
              </ul>
              <Link href="/admin/dashboard">
                <Button className="w-full">Go to Admin</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customer Portal
              </CardTitle>
              <CardDescription>
                View your subscriptions, invoices, and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li>• View subscriptions</li>
                <li>• Download invoices</li>
                <li>• Track usage</li>
                <li>• Account overview</li>
              </ul>
              <Link href="/portal/dashboard">
                <Button className="w-full" variant="outline">Go to Portal</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Make sure the backend is running on port 8082
        </p>
      </div>
    </div>
  );
}
