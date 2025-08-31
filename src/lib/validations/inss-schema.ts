import { z } from 'zod';

export const inssInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  hasMultipleJobs: z.boolean(),
  
  otherJobsSalary: z.number()
    .min(0, 'Salário de outros empregos não pode ser negativo')
    .max(50000, 'Salário de outros empregos muito alto')
    .optional(),
  
  calculationType: z.enum(['monthly', 'annual', 'projection']),
  
  months: z.number()
    .min(1, 'Deve ser pelo menos 1 mês')
    .max(60, 'Período muito longo para projeção')
    .int('Meses deve ser um número inteiro')
    .optional(),
}).refine((data) => {
  // Se tem múltiplos empregos, deve informar o salário
  if (data.hasMultipleJobs && (!data.otherJobsSalary || data.otherJobsSalary === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Quando há outros empregos, deve informar o salário total dos outros empregos',
  path: ['otherJobsSalary'],
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
});

export type INSSInput = z.infer<typeof inssInputSchema>;