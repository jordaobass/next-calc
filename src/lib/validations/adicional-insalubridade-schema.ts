import { z } from 'zod';

export const adicionalInsalubridadeInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  insalubricadeGrade: z.enum(['minimum', 'medium', 'maximum']),
  
  hasInsalubrious: z.boolean(),
  
  hoursInInsalubrious: z.number()
    .min(0, 'Horas em ambiente insalubre não pode ser negativo')
    .max(300, 'Horas em ambiente insalubre muito alto para o período'),
  
  totalWorkHours: z.number()
    .min(1, 'Total de horas trabalhadas deve ser pelo menos 1')
    .max(300, 'Total de horas muito alto para o período'),
  
  calculationType: z.enum(['monthly', 'proportional']),
  
  months: z.number()
    .min(1, 'Deve ser pelo menos 1 mês')
    .max(60, 'Período muito longo para cálculo')
    .int('Meses deve ser um número inteiro')
    .optional(),
}).refine((data) => {
  // Se não tem insalubridade, horas insalubres deve ser 0
  if (!data.hasInsalubrious && data.hoursInInsalubrious > 0) {
    return false;
  }
  return true;
}, {
  message: 'Se não há atividade insalubre, horas insalubres deve ser 0',
  path: ['hoursInInsalubrious'],
}).refine((data) => {
  // Se tem insalubridade, deve ter pelo menos 1 hora
  if (data.hasInsalubrious && data.hoursInInsalubrious === 0) {
    return false;
  }
  return true;
}, {
  message: 'Se há atividade insalubre, deve informar as horas de exposição',
  path: ['hoursInInsalubrious'],
}).refine((data) => {
  // Horas insalubres não pode ser maior que total de horas
  return data.hoursInInsalubrious <= data.totalWorkHours;
}, {
  message: 'Horas insalubres não pode ser maior que o total de horas trabalhadas',
  path: ['hoursInInsalubrious'],
});

export type AdicionalInsalubridadeInput = z.infer<typeof adicionalInsalubridadeInputSchema>;