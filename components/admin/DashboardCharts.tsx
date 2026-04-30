'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type DataPoint = {
  date: string;
  total: number;
};

export function SalesChart({ data }: { data: DataPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-400 text-sm">No sales data to display yet.</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#008060" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#008060" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e1e3e5" />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#616a75' }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#616a75' }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e1e3e5', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Total Sales']}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#008060"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTotal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
