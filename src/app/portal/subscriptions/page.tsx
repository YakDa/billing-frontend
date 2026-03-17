'use client';

import { useQuery } from '@tanstack/react-query';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';
import { subscriptionsApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PortalSubscriptionsPage() {
  // In production, this would filter by customer ID
  const { data, isLoading, error } = useQuery({
    queryKey: ['portal-subscriptions'],
    queryFn: () => subscriptionsApi.list().then(res => res.data),
  });

  const subscriptions = data?.data || data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Subscriptions</h2>
        <p className="text-muted-foreground">View and manage your subscriptions</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading subscriptions...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          Failed to load subscriptions. Backend may not be running.
        </div>
      ) : subscriptions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No subscriptions found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Contact support to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map((sub: any) => (
            <Card key={sub.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{sub.plan} Plan</CardTitle>
                  {getStatusBadge(sub.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="font-medium">${sub.price?.toFixed(2)}/month</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">Start Date</div>
                      <div className="font-medium">
                        {new Date(sub.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm text-muted-foreground">End Date</div>
                      <div className="font-medium">
                        {sub.endDate 
                          ? new Date(sub.endDate).toLocaleDateString() 
                          : 'Ongoing'}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
