'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown } from 'lucide-react';

export default function PriceChart({ history }: { history: any[] }) {
  const chartData = history?.reduce((acc: any[], curr: any) => {
    const dateStr = new Date(curr.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find((item: any) => item.date === dateStr);
    if (existing) {
      existing[curr.platformName] = curr.price;
    } else {
      acc.push({ date: dateStr, [curr.platformName]: curr.price });
    }
    return acc;
  }, []) || [];

  return (
    <div className="bg-card-bg border border-border rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <TrendingDown className="w-7 h-7 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Price History</h2>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.15} />
            <XAxis dataKey="date" tick={{fontSize: 12, fill: '#888'}} tickMargin={10} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(val) => `₹${val/1000}k`} tick={{fontSize: 12, fill: '#888'}} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--foreground)', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              formatter={(val: number) => `₹${val.toLocaleString()}`}
            />
            <Line type="monotone" dataKey="Amazon" stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{r: 8, strokeWidth: 0}} />
            <Line type="monotone" dataKey="Flipkart" stroke="#eab308" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="Myntra" stroke="#ec4899" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
