'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

const calculatorCategories = [
  {
    name: 'Principais',
    calculators: [
      { name: 'Rescisão Trabalhista', href: '/calculadoras/rescisao' },
      { name: 'Férias', href: '/calculadoras/ferias' },
      { name: '13º Salário', href: '/calculadoras/decimo-terceiro' },
      { name: 'FGTS', href: '/calculadoras/fgts' },
    ]
  },
  {
    name: 'Adicionais',
    calculators: [
      { name: 'Horas Extras', href: '/calculadoras/horas-extras' },
      { name: 'Adicional Noturno', href: '/calculadoras/adicional-noturno' },
      { name: 'Adicional de Periculosidade', href: '/calculadoras/adicional-periculosidade' },
      { name: 'Adicional de Insalubridade', href: '/calculadoras/adicional-insalubridade' },
    ]
  },
  {
    name: 'Descontos',
    calculators: [
      { name: 'INSS', href: '/calculadoras/inss' },
      { name: 'IRRF', href: '/calculadoras/irrf' },
    ]
  },
  {
    name: 'Benefícios',
    calculators: [
      { name: 'Seguro Desemprego', href: '/calculadoras/seguro-desemprego' },
    ]
  }
];

interface CalculatorDropdownProps {
  onItemClick?: () => void;
}

export function CalculatorDropdown({ onItemClick }: CalculatorDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-emerald-600"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Calculadoras</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-1 w-80 rounded-md border bg-white shadow-lg z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Calculadoras Trabalhistas</h3>
              <Link
                href="/calculadoras"
                className="text-xs text-emerald-600 hover:text-emerald-700"
                onClick={handleItemClick}
              >
                Ver todas
              </Link>
            </div>
            
            <div className="space-y-4">
              {calculatorCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {category.name}
                  </h4>
                  <div className="space-y-1">
                    {category.calculators.map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="flex items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                        onClick={handleItemClick}
                      >
                        <Calculator className="h-3 w-3" />
                        <span>{calc.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}