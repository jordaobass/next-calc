'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CalculatorWrapperProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function CalculatorWrapper({
  title,
  description,
  children,
  className = '',
}: CalculatorWrapperProps) {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <CardDescription className="text-center text-lg">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}