'use client';

import { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, value, onChange, placeholder = '0,00', error, required, disabled, className = '' }, ref) => {
    const [displayValue, setDisplayValue] = useState(value);

    const formatCurrency = (value: string): string => {
      // Remove tudo que não é número
      const numbers = value.replace(/\D/g, '');
      
      if (!numbers) return '';
      
      // Converte para centavos
      const cents = parseInt(numbers);
      
      // Formata como moeda
      return (cents / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const formatted = formatCurrency(inputValue);
      
      setDisplayValue(formatted);
      
      // Converte para número para o callback
      const numbers = inputValue.replace(/\D/g, '');
      const numericValue = numbers ? (parseInt(numbers) / 100) : 0;
      onChange(numericValue.toString());
    };

    const handleBlur = () => {
      if (!displayValue) {
        setDisplayValue('');
        onChange('0');
      }
    };

    const inputId = `currency-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor={inputId} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ''}>
          {label}
        </Label>
        <div className="relative">
          <span 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            R$
          </span>
          <Input
            ref={ref}
            id={inputId}
            type="text"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            aria-label={`${label} em reais`}
            className={`pl-10 ${error ? 'border-red-500' : ''}`}
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';