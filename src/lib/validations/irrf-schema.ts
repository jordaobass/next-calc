import { z } from 'zod';

export const irrfInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(100000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  dependents: z.number()
    .int('Número de dependentes deve ser inteiro')
    .min(0, 'Número de dependentes não pode ser negativo')
    .max(20, 'Número de dependentes muito alto'),
  
  inssDiscount: z.number()
    .min(0, 'Desconto INSS não pode ser negativo')
    .max(10000, 'Desconto INSS muito alto')
    .optional(),
  
  otherDeductions: z.number()
    .min(0, 'Outras deduções não pode ser negativo')
    .max(50000, 'Outras deduções muito alto')
    .optional(),
  
  pensionAlimony: z.number()
    .min(0, 'Pensão alimentícia não pode ser negativa')
    .max(50000, 'Pensão alimentícia muito alta')
    .optional(),
  
  calculationType: z.enum(['monthly', 'annual', 'projection']),
  
  months: z.number()
    .min(1, 'Deve ser pelo menos 1 mês')
    .max(60, 'Período muito longo para projeção')
    .int('Meses deve ser um número inteiro')
    .optional(),
}).refine((data) => {
  // Para cálculo anual ou projeção, deve informar os meses
  if ((data.calculationType === 'annual' || data.calculationType === 'projection') && 
      (!data.months || data.months === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Para cálculo anual ou projeção, deve informar o número de meses',
  path: ['months'],
}).refine((data) => {
  // Validar se deduções não ultrapassam o salário
  const totalDeductions = (data.inssDiscount || 0) + (data.otherDeductions || 0) + (data.pensionAlimony || 0);
  return totalDeductions < data.salary;
}, {
  message: 'Total de deduções não pode ser maior que o salário',
  path: ['otherDeductions'],
});

export type IRRFInput = z.infer<typeof irrfInputSchema>;