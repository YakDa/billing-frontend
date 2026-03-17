'use client';

import { useQuery } from '@tanstack/react-query';
import { FileText, Download, Send } from 'lucide-react';
import { invoicesApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PortalInvoicesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['portal-invoices'],
    queryFn: () => invoicesApi.list().then(res => res.data),
  });

  const invoices = data?.data || data || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'sent':
        return <Badge className="bg-blue-500">Sent</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Invoices</h2>
        <p className="text-muted-foreground">View and download your invoices</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading invoices...
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          Failed to load invoices. Backend may not be running.
        </div>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No invoices found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invoices.map((invoice: any) => (
            <Card key={invoice.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{invoice.invoiceNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-lg">
                        ${invoice.amount?.toFixed(2)}
                      </div>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
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
