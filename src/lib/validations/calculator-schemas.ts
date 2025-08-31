import { z } from 'zod';
import { RESCISSION_TYPES } from '../calculations/constants';

// Schema base para validação de datas
const dateSchema = z.union([
  z.string().transform((str) => new Date(str)),
  z.date(),
]).refine((date) => !isNaN(date.getTime()), {
  message: 'Data inválida',
});

// Schema base para valores monetários
const currencySchema = z.number()
  .min(0.01, 'Valor deve ser maior que zero')
  .max(999999.99, 'Valor muito alto')
  .transform((val) => Math.round(val * 100) / 100);

// Schema para valores monetários opcionais (podem ser 0)
const optionalCurrencySchema = z.number()
  .min(0, 'Valor não pode ser negativo')
  .max(999999.99, 'Valor muito alto')
  .transform((val) => Math.round(val * 100) / 100);

// Schema para dependentes
const dependentsSchema = z.number()
  .int('Número de dependentes deve ser inteiro')
  .min(0, 'Número de dependentes não pode ser negativo')
  .max(20, 'Número de dependentes muito alto');

// RESCISÃO - Schema de validação
export const rescissionInputSchema = z.object({
  salary: currencySchema,
  admissionDate: dateSchema,
  dismissalDate: dateSchema,
  rescissionType: z.enum([
    RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE,
    RESCISSION_TYPES.DISMISSAL_WITH_CAUSE,
    RESCISSION_TYPES.RESIGNATION,
    RESCISSION_TYPES.MUTUAL_AGREEMENT,
    RESCISSION_TYPES.END_OF_CONTRACT,
  ] as const),
  dependents: dependentsSchema.optional().default(0),
  hasVacationPending: z.boolean().optional().default(false),
  vacationDays: z.number()
    .int('Dias de férias deve ser inteiro')
    .min(0, 'Dias de férias não pode ser negativo')
    .max(30, 'Máximo 30 dias de férias')
    .optional()
    .default(0),
  has13thSalaryPending: z.boolean().optional().default(false),
  workedMonths13th: z.number()
    .int('Meses trabalhados deve ser inteiro')
    .min(0, 'Meses trabalhados não pode ser negativo')
    .max(12, 'Máximo 12 meses')
    .optional()
    .default(0),
  fgtsBalance: optionalCurrencySchema.optional().default(0),
  avgSalaryLast3Months: optionalCurrencySchema.optional(),
}).refine(
  (data) => data.dismissalDate > data.admissionDate,
  {
    message: 'Data de demissão deve ser posterior à data de admissão',
    path: ['dismissalDate'],
  }
).refine(
  (data) => !data.hasVacationPending || data.vacationDays > 0,
  {
    message: 'Se há férias pendentes, deve informar os dias',
    path: ['vacationDays'],
  }
).refine(
  (data) => !data.has13thSalaryPending || data.workedMonths13th > 0,
  {
    message: 'Se há 13º pendente, deve informar os meses trabalhados',
    path: ['workedMonths13th'],
  }
);

// FÉRIAS - Schema de validação
export const vacationInputSchema = z.object({
  salary: currencySchema,
  admissionDate: dateSchema,
  vacationStartDate: dateSchema,
  vacationDays: z.number()
    .int('Dias de férias deve ser inteiro')
    .min(1, 'Mínimo 1 dia de férias')
    .max(30, 'Máximo 30 dias de férias'),
  dependents: dependentsSchema.optional().default(0),
  sellDays: z.number()
    .int('Dias vendidos deve ser inteiro')
    .min(0, 'Dias vendidos não pode ser negativo')
    .max(10, 'Máximo 10 dias podem ser vendidos (1/3 das férias)')
    .optional()
    .default(0),
  averageSalary: currencySchema.optional(),
}).refine(
  (data) => data.vacationStartDate > data.admissionDate,
  {
    message: 'Data de início das férias deve ser posterior à admissão',
    path: ['vacationStartDate'],
  }
).refine(
  (data) => data.sellDays === undefined || data.sellDays + data.vacationDays <= 30,
  {
    message: 'Total de dias (férias + vendidos) não pode exceder 30 dias',
    path: ['sellDays'],
  }
);

// 13º SALÁRIO - Schema de validação
export const thirteenthSalaryInputSchema = z.object({
  salary: currencySchema,
  admissionDate: dateSchema,
  referenceDate: dateSchema,
  workedMonths: z.number()
    .int('Meses trabalhados deve ser inteiro')
    .min(0, 'Meses trabalhados não pode ser negativo')
    .max(12, 'Máximo 12 meses')
    .optional(),
  dependents: dependentsSchema.optional().default(0),
  averageSalary: currencySchema.optional(),
  advanceReceived: currencySchema.optional().default(0),
}).refine(
  (data) => data.referenceDate > data.admissionDate,
  {
    message: 'Data de referência deve ser posterior à admissão',
    path: ['referenceDate'],
  }
);

// FGTS - Schema de validação
export const fgtsInputSchema = z.object({
  salary: currencySchema,
  admissionDate: dateSchema,
  referenceDate: dateSchema,
  currentBalance: currencySchema.optional().default(0),
  averageSalary: currencySchema.optional(),
  includeBonus13th: z.boolean().optional().default(false),
  includeVacationBonus: z.boolean().optional().default(false),
}).refine(
  (data) => data.referenceDate > data.admissionDate,
  {
    message: 'Data de referência deve ser posterior à admissão',
    path: ['referenceDate'],
  }
);

// HORAS EXTRAS - Schema de validação
export const overtimeInputSchema = z.object({
  salary: currencySchema,
  hoursWorked: z.number()
    .min(0, 'Horas trabalhadas não pode ser negativo')
    .max(100, 'Número de horas muito alto'),
  overtimeRate: z.number()
    .min(0.5, 'Taxa mínima de 50% para horas extras')
    .max(2.0, 'Taxa máxima de 200%')
    .default(0.5),
  dependents: dependentsSchema.optional().default(0),
  workingHours: z.number()
    .min(6, 'Jornada mínima de 6 horas')
    .max(8, 'Jornada máxima de 8 horas')
    .default(8),
});

// ADICIONAL NOTURNO - Schema de validação
export const nightShiftInputSchema = z.object({
  salary: currencySchema,
  nightHours: z.number()
    .min(0, 'Horas noturnas não pode ser negativo')
    .max(8, 'Máximo 8 horas noturnas por dia'),
  workingDays: z.number()
    .int('Dias trabalhados deve ser inteiro')
    .min(1, 'Mínimo 1 dia')
    .max(31, 'Máximo 31 dias'),
  nightShiftRate: z.number()
    .min(0.2, 'Taxa mínima de 20% para adicional noturno')
    .max(1.0, 'Taxa máxima de 100%')
    .default(0.2),
  dependents: dependentsSchema.optional().default(0),
});

// SIMULAÇÃO FGTS - Schema de validação
export const fgtsSimulationInputSchema = z.object({
  initialSalary: currencySchema,
  yearsOfService: z.number()
    .int('Anos de serviço deve ser inteiro')
    .min(1, 'Mínimo 1 ano')
    .max(50, 'Máximo 50 anos'),
  salaryGrowthRate: z.number()
    .min(0, 'Taxa de crescimento não pode ser negativa')
    .max(0.2, 'Taxa de crescimento máxima de 20% a.a.')
    .optional()
    .default(0.05),
  averageYield: z.number()
    .min(0, 'Rendimento não pode ser negativo')
    .max(0.15, 'Rendimento máximo de 15% a.a.')
    .optional()
    .default(0.03),
});

// SALÁRIO LÍQUIDO - Schema de validação
export const netSalaryInputSchema = z.object({
  grossSalary: currencySchema,
  dependents: dependentsSchema.optional().default(0),
  discounts: z.object({
    healthInsurance: currencySchema.optional().default(0),
    unionFee: currencySchema.optional().default(0),
    mealVoucher: currencySchema.optional().default(0),
    transportVoucher: currencySchema.optional().default(0),
    other: currencySchema.optional().default(0),
  }).optional().default(() => ({
    healthInsurance: 0,
    unionFee: 0,
    mealVoucher: 0,
    transportVoucher: 0,
    other: 0,
  })),
});

// COMPARADOR DE PROPOSTAS - Schema de validação
export const jobComparisonInputSchema = z.object({
  currentJob: z.object({
    salary: currencySchema,
    benefits: currencySchema.optional().default(0),
    transportCost: currencySchema.optional().default(0),
    mealCost: currencySchema.optional().default(0),
    workingHours: z.number().min(6).max(12).default(8),
    commutingTime: z.number().min(0).max(300).default(0), // em minutos
  }),
  newJob: z.object({
    salary: currencySchema,
    benefits: currencySchema.optional().default(0),
    transportCost: currencySchema.optional().default(0),
    mealCost: currencySchema.optional().default(0),
    workingHours: z.number().min(6).max(12).default(8),
    commutingTime: z.number().min(0).max(300).default(0), // em minutos
  }),
  dependents: dependentsSchema.optional().default(0),
});

// Tipos inferidos dos schemas
export type RescissionInput = z.infer<typeof rescissionInputSchema>;
export type VacationInput = z.infer<typeof vacationInputSchema>;
export type ThirteenthSalaryInput = z.infer<typeof thirteenthSalaryInputSchema>;
export type FGTSInput = z.infer<typeof fgtsInputSchema>;
export type OvertimeInput = z.infer<typeof overtimeInputSchema>;
export type NightShiftInput = z.infer<typeof nightShiftInputSchema>;
export type FGTSSimulationInput = z.infer<typeof fgtsSimulationInputSchema>;
export type NetSalaryInput = z.infer<typeof netSalaryInputSchema>;
export type JobComparisonInput = z.infer<typeof jobComparisonInputSchema>;

// Função helper para validar entrada
export function validateCalculatorInput<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Erro de validação desconhecido'] };
  }
}