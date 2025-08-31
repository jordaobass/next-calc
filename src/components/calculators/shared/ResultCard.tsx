'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';

interface ResultItemProps {
  label: string;
  value: number;
  highlight?: boolean;
  className?: string;
}

function ResultItem({ label, value, highlight, className = '' }: ResultItemProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? 'font-semibold text-lg' : ''} ${className}`}>
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? 'text-emerald-600' : 'font-medium'}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

interface ResultCardProps {
  title: string;
  items: Array<{
    label: string;
    value: number;
    highlight?: boolean;
  }>;
  children?: ReactNode;
  className?: string;
}

export function ResultCard({ title, items, children, className = '' }: ResultCardProps) {
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index}>
              <ResultItem {...item} />
              {index < items.length - 1 && !item.highlight && (
                <hr className="my-2 border-muted" />
              )}
            </div>
          ))}
        </div>
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}