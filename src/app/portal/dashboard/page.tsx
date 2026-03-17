'use client';

import { useQuery } from '@tanstack/react-query';
import { CreditCard, FileText, BarChart3, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for customer portal - in real app, this would use API with customer ID
function useCustomerData() {
  // In production, this would fetch based on authenticated customer
  return {
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      subscriptions: 2,
      pendingInvoices: 1,
      currentUsage: 750,
      usageLimit: 1000,
    },
    isLoading: false,
  };
}

export default function PortalDashboardPage() {
  const { data: customer, isLoading } = useCustomerData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">Here&apos;s an overview of your account</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer?.subscriptions || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer?.pendingInvoices || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer?.currentUsage || 0}</div>
            <p className="text-xs text-muted-foreground">
              of {customer?.usageLimit || 0} units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Apr 1</div>
            <p className="text-xs text-muted-foreground">in 14 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <a 
              href="/portal/subscriptions" 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-6 h-6 mb-2" />
              <div className="font-medium">View Subscriptions</div>
              <div className="text-sm text-muted-foreground">Manage your plans</div>
            </a>
            <a 
              href="/portal/invoices" 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-6 h-6 mb-2" />
              <div className="font-medium">View Invoices</div>
              <div className="text-sm text-muted-foreground">Download receipts</div>
            </a>
            <a 
              href="/portal/usage" 
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-6 h-6 mb-2" />
              <div className="font-medium">Check Usage</div>
              <div className="text-sm text-muted-foreground">View usage details</div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
