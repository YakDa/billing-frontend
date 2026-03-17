'use client';

import { useQuery } from '@tanstack/react-query';
import { BarChart3, Activity, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usageApi } from '@/lib/api';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface UsageRecord {
  id: string;
  customerId: string;
  customerName?: string;
  subscriptionId: string;
  metric: string;
  value: number;
  unit: string;
  period: string;
  timestamp: string;
}

export default function UsagePage() {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['usage-stats'],
    queryFn: () => usageApi.getStats().then(res => res.data),
  });

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['usage-history'],
    queryFn: () => usageApi.getHistory().then(res => res.data),
  });

  const stats = statsData || {
    totalUsage: 0,
    activeMetrics: 0,
    avgDailyUsage: 0,
    peakUsage: 0,
  };

  const usageRecords: UsageRecord[] = historyData?.data || historyData || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage Tracking</h2>
        <p className="text-muted-foreground">Monitor resource usage across customers</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">units consumed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Metrics</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMetrics}</div>
            <p className="text-xs text-muted-foreground">tracked metrics</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Daily Usage</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDailyUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">units per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Peak Usage</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.peakUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">highest recorded</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading usage data...
            </div>
          ) : usageRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No usage records found. Backend may not be running.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">
                      {record.customerName || record.customerId}
                    </TableCell>
                    <TableCell>{record.metric}</TableCell>
                    <TableCell>{record.value.toLocaleString()}</TableCell>
                    <TableCell>{record.unit}</TableCell>
                    <TableCell>{record.period}</TableCell>
                    <TableCell>{new Date(record.timestamp).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
