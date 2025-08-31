import { z } from 'zod';

export const periculosidadeInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  hasDangerousActivity: z.boolean(),
  
  hoursInDanger: z.number()
    .min(0, 'Horas em perigo não pode ser negativo')
    .max(300, 'Horas em perigo muito alto para o período'),
  
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
  // Se não há atividade perigosa, horas em perigo deve ser 0
  if (!data.hasDangerousActivity && data.hoursInDanger > 0) {
    return false;
  }
  return true;
}, {
  message: 'Se não há atividade perigosa, horas em perigo deve ser 0',
  path: ['hoursInDanger'],
}).refine((data) => {
  // Se há atividade perigosa, deve ter pelo menos 1 hora
  if (data.hasDangerousActivity && data.hoursInDanger === 0) {
    return false;
  }
  return true;
}, {
  message: 'Se há atividade perigosa, deve informar as horas de exposição',
  path: ['hoursInDanger'],
}).refine((data) => {
  // Horas em perigo não pode ser maior que total de horas
  return data.hoursInDanger <= data.totalWorkHours;
}, {
  message: 'Horas em perigo não pode ser maior que o total de horas trabalhadas',
  path: ['hoursInDanger'],
});

export type PericulosidadeInput = z.infer<typeof periculosidadeInputSchema>;