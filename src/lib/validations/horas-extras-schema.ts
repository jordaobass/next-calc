import { z } from 'zod';

export const horasExtrasInputSchema = z.object({
  salary: z.number()
    .min(1320, 'Salário deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário deve ser positivo'),
  
  hoursPerDay: z.number()
    .min(1, 'Deve trabalhar pelo menos 1 hora por dia')
    .max(12, 'Jornada máxima de 12 horas por dia')
    .positive('Horas por dia deve ser positivo'),
  
  daysPerWeek: z.number()
    .min(1, 'Deve trabalhar pelo menos 1 dia por semana')
    .max(6, 'Máximo 6 dias de trabalho por semana')
    .int('Dias por semana deve ser um número inteiro'),
  
  extraHours: z.number()
    .min(0, 'Horas extras não pode ser negativo')
    .max(500, 'Quantidade de horas extras muito alta'),
  
  extraHoursSunday: z.number()
    .min(0, 'Horas extras de domingo não pode ser negativo')
    .max(200, 'Quantidade de horas extras de domingo muito alta'),
  
  extraHoursHoliday: z.number()
    .min(0, 'Horas extras de feriado não pode ser negativo')
    .max(200, 'Quantidade de horas extras de feriado muito alta'),
  
  hasNightShift: z.boolean(),
  
  nightHours: z.number()
    .min(0, 'Horas noturnas não pode ser negativo')
    .max(300, 'Quantidade de horas noturnas muito alta')
    .optional(),
}).refine((data) => {
  // Se tem turno noturno, deve informar as horas
  if (data.hasNightShift && (!data.nightHours || data.nightHours === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Quando há turno noturno, deve informar a quantidade de horas',
  path: ['nightHours'],
}).refine((data) => {
  // Validar se o total de horas extras não ultrapassa limites legais
  const totalExtraHours = data.extraHours + data.extraHoursSunday + data.extraHoursHoliday;
  const maxExtraHoursPerMonth = 100; // Limite razoável para o mês
  
  return totalExtraHours <= maxExtraHoursPerMonth;
}, {
  message: 'Total de horas extras muito alto para um período',
  path: ['extraHours'],
});

export type HorasExtrasInput = z.infer<typeof horasExtrasInputSchema>;