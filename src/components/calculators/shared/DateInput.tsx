'use client';

import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: string;
  max?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, value, onChange, error, required, disabled, className = '', min, max }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor={label} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={label}
          type="date"
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          min={min}
          max={max}
          className={error ? 'border-red-500' : ''}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

DateInput.displayName = 'DateInput';