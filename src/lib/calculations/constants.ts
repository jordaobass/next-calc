// Tabelas e constantes trabalhistas - 2024

// Tabela INSS 2024
export const INSS_TABLE_2024 = [
  { min: 0, max: 1412.00, rate: 0.075 },
  { min: 1412.01, max: 2666.68, rate: 0.09 },
  { min: 2666.69, max: 4000.03, rate: 0.12 },
  { min: 4000.04, max: 7786.02, rate: 0.14 },
] as const;

// Tabela IRRF 2024
export const IRRF_TABLE_2024 = [
  { min: 0, max: 2112.00, rate: 0, deduction: 0 },
  { min: 2112.01, max: 2826.65, rate: 0.075, deduction: 158.40 },
  { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 370.40 },
  { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 651.73 },
  { min: 4664.69, max: Infinity, rate: 0.275, deduction: 884.96 },
] as const;

// Valores de dependentes IRRF 2024
export const IRRF_DEPENDENT_DEDUCTION = 189.59;

// Salário mínimo 2024
export const SALARIO_MINIMO_2024 = 1412.00;

// Percentuais padrão
export const FGTS_RATE = 0.08; // 8%
export const FGTS_FINE_RATE = 0.40; // 40% multa rescisão sem justa causa
export const VACATION_BONUS = 1/3; // 1/3 constitucional sobre férias

// Tipos de rescisão
export const RESCISSION_TYPES = {
  DISMISSAL_WITHOUT_CAUSE: 'dismissal_without_cause', // Demissão sem justa causa
  DISMISSAL_WITH_CAUSE: 'dismissal_with_cause', // Demissão com justa causa
  RESIGNATION: 'resignation', // Pedido de demissão
  MUTUAL_AGREEMENT: 'mutual_agreement', // Acordo mútuo
  END_OF_CONTRACT: 'end_of_contract', // Fim do contrato
} as const;

// Adicional de insalubridade (% sobre salário mínimo)
export const INSALUBRIDADE_RATES = {
  MINIMUM: 0.10, // 10% - grau mínimo
  MEDIUM: 0.20,  // 20% - grau médio
  MAXIMUM: 0.40, // 40% - grau máximo
} as const;

// Adicional de periculosidade
export const PERICULOSIDADE_RATE = 0.30; // 30% sobre o salário base

// Adicional noturno
export const NIGHT_SHIFT_RATE = 0.20; // 20% sobre a hora normal

// Horas extras
export const OVERTIME_RATES = {
  NORMAL: 0.50, // 50% - dias normais
  SUNDAY_HOLIDAY: 1.00, // 100% - domingos e feriados
} as const;

// Jornada de trabalho
export const WORK_HOURS = {
  DAILY: 8, // 8 horas diárias
  WEEKLY: 44, // 44 horas semanais
  MONTHLY: 220, // 220 horas mensais (aproximado)
} as const;