import { INSS_TABLE_2024, IRRF_TABLE_2024, IRRF_DEPENDENT_DEDUCTION } from './constants';

/**
 * Calcula o desconto do INSS baseado na tabela 2024
 */
export function calculateINSS(salary: number): number {
  let inssDiscount = 0;
  let remainingSalary = salary;

  for (const bracket of INSS_TABLE_2024) {
    if (remainingSalary <= 0) break;

    const bracketMin = bracket.min;
    const bracketMax = bracket.max;
    const rate = bracket.rate;

    const taxableAmount = Math.min(remainingSalary, bracketMax - bracketMin + 0.01);
    inssDiscount += taxableAmount * rate;
    remainingSalary -= taxableAmount;
  }

  return Math.round(inssDiscount * 100) / 100;
}

/**
 * Calcula o desconto do IRRF baseado na tabela 2024
 */
export function calculateIRRF(
  salary: number, 
  inssDiscount: number, 
  dependents: number = 0
): number {
  const taxableBase = salary - inssDiscount - (dependents * IRRF_DEPENDENT_DEDUCTION);
  
  if (taxableBase <= 0) return 0;

  const bracket = IRRF_TABLE_2024.find(
    (b) => taxableBase >= b.min && taxableBase <= b.max
  );

  if (!bracket || bracket.rate === 0) return 0;

  const irrfDiscount = (taxableBase * bracket.rate) - bracket.deduction;
  return Math.max(0, Math.round(irrfDiscount * 100) / 100);
}

/**
 * Calcula salário líquido
 */
export function calculateNetSalary(
  grossSalary: number,
  dependents: number = 0
): {
  grossSalary: number;
  inssDiscount: number;
  irrfDiscount: number;
  netSalary: number;
} {
  const inssDiscount = calculateINSS(grossSalary);
  const irrfDiscount = calculateIRRF(grossSalary, inssDiscount, dependents);
  const netSalary = grossSalary - inssDiscount - irrfDiscount;

  return {
    grossSalary,
    inssDiscount,
    irrfDiscount,
    netSalary: Math.round(netSalary * 100) / 100,
  };
}

/**
 * Calcula dias proporcionais baseado em período
 */
export function calculateProportionalDays(
  startDate: Date,
  endDate: Date,
  totalDaysInMonth: number = 30
): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.min(diffDays, totalDaysInMonth);
}

/**
 * Calcula valor proporcional baseado em dias trabalhados
 */
export function calculateProportionalValue(
  fullValue: number,
  workedDays: number,
  totalDays: number = 30
): number {
  return Math.round((fullValue * workedDays / totalDays) * 100) / 100;
}

/**
 * Formata valor como moeda brasileira
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Valida se uma data é válida
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Calcula diferença em meses entre duas datas
 */
export function calculateMonthsDifference(startDate: Date, endDate: Date): number {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

/**
 * Calcula diferença em anos entre duas datas
 */
export function calculateYearsDifference(startDate: Date, endDate: Date): number {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(diffYears);
}