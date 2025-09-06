import React from 'react';
import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const colorVariants = {
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
  green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' }
};

export default function StatsOverview({ title, value, icon: Icon, change, color = 'blue' }) {
  const variant = colorVariants[color];
  const isPositive = change?.startsWith('+');

  return (
    <Card className="neu-card border-none relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-24 h-24 ${variant.bg} opacity-5 rounded-full transform translate-x-8 -translate-y-8`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">{title}</p>
            <p className="text-3xl font-bold text-black">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {change}
                </span>
                <span className="text-sm text-gray-600">vs last month</span>
              </div>
            )}
          </div>
          <div className={`neu-card p-3 rounded-xl ${variant.light}`}>
            <Icon className={`w-6 h-6 ${variant.text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}