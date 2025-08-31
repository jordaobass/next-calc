import { z } from 'zod';

export const adicionalNoturnoInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  workType: z.enum(['urban', 'rural']),
  
  nightHours: z.number()
    .min(0, 'Horas noturnas não pode ser negativo')
    .max(300, 'Horas noturnas muito alto para o período'),
  
  totalWorkHours: z.number()
    .min(1, 'Total de horas trabalhadas deve ser pelo menos 1')
    .max(300, 'Total de horas muito alto para o período'),
  
  hasNightWork: z.boolean(),
  
  calculationType: z.enum(['monthly', 'proportional']),
  
  months: z.number()
    .min(1, 'Deve ser pelo menos 1 mês')
    .max(60, 'Período muito longo para cálculo')
    .int('Meses deve ser um número inteiro')
    .optional(),
}).refine((data) => {
  // Se não trabalha à noite, horas noturnas deve ser 0
  if (!data.hasNightWork && data.nightHours > 0) {
    return false;
  }
  return true;
}, {
  message: 'Se não trabalha à noite, horas noturnas deve ser 0',
  path: ['nightHours'],
}).refine((data) => {
  // Se trabalha à noite, deve ter pelo menos 1 hora
  if (data.hasNightWork && data.nightHours === 0) {
    return false;
  }
  return true;
}, {
  message: 'Se trabalha à noite, deve informar as horas noturnas',
  path: ['nightHours'],
}).refine((data) => {
  // Horas noturnas não pode ser maior que total de horas
  return data.nightHours <= data.totalWorkHours;
}, {
  message: 'Horas noturnas não pode ser maior que o total de horas trabalhadas',
  path: ['nightHours'],
});

export type AdicionalNoturnoInput = z.infer<typeof adicionalNoturnoInputSchema>;