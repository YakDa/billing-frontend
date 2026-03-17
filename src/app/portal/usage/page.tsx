'use client';

import { useQuery } from '@tanstack/react-query';
import { BarChart3, Activity, Zap, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usageApi } from '@/lib/api';

export default function PortalUsagePage() {
  // In production, this would fetch by customer ID
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['portal-usage-stats'],
    queryFn: () => usageApi.getStats().then(res => res.data),
  });

  const { data: historyData, isLoading: historyLoading } = useQuery({
    queryKey: ['portal-usage-history'],
    queryFn: () => usageApi.getHistory().then(res => res.data),
  });

  const stats = statsData || {
    totalUsage: 750,
    usageLimit: 1000,
    avgDailyUsage: 25,
    daysRemaining: 14,
  };

  const history = historyData?.data || historyData || [];
  const usagePercent = (stats.totalUsage / stats.usageLimit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usage Dashboard</h2>
        <p className="text-muted-foreground">Monitor your resource consumption</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of {stats.usageLimit.toLocaleString()} units
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usage Limit</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usageLimit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">units per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgDailyUsage}</div>
            <p className="text-xs text-muted-foreground">units/day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Days Remaining</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.daysRemaining}</div>
            <p className="text-xs text-muted-foreground">in billing cycle</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span>{usagePercent.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    usagePercent > 90 
                      ? 'bg-red-500' 
                      : usagePercent > 75 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {stats.usageLimit - stats.totalUsage} units remaining
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage History</CardTitle>
        </CardHeader>
        <CardContent>
          {historyLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading usage data...
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No usage records found. Backend may not be running.
            </div>
          ) : (
            <div className="space-y-4">
              {history.slice(0, 10).map((record: any) => (
                <div 
                  key={record.id} 
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <div className="font-medium">{record.metric}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(record.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{record.value.toLocaleString()} {record.unit}</div>
                    <div className="text-sm text-muted-foreground">{record.period}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
