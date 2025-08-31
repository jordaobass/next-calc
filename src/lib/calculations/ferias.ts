import { VACATION_BONUS } from './constants';
import {
  calculateNetSalary,
  calculateMonthsDifference,
  calculateYearsDifference,
  isValidDate
} from './utils';

export interface VacationInput {
  salary: number;
  admissionDate: Date;
  vacationStartDate: Date;
  vacationDays: number;
  dependents?: number;
  sellDays?: number; // Venda de até 10 dias
  averageSalary?: number; // Para casos com salário variável
}

export interface VacationResult {
  // Valores principais
  vacationValue: number;
  vacationBonus: number; // 1/3 constitucional
  soldDaysValue: number;
  soldDaysBonus: number;
  
  // Totais
  grossTotal: number;
  inssDiscount: number;
  irrfDiscount: number;
  netTotal: number;
  
  // Detalhes
  details: {
    eligibleDays: number;
    remainingDays: number;
    serviceTime: string;
    dailySalary: number;
    vacationPeriod: string;
  };
}

/**
 * Calcula dias de férias elegíveis baseado no tempo de serviço
 */
function calculateEligibleVacationDays(
  admissionDate: Date,
  referenceDate: Date
): { eligible: number; remaining: number } {
  const serviceMonths = calculateMonthsDifference(admissionDate, referenceDate);
  
  // Após 12 meses, direito a 30 dias de férias
  if (serviceMonths >= 12) {
    const completePeriods = Math.floor(serviceMonths / 12);
    const eligibleDays = completePeriods * 30;
    const proportionalDays = Math.floor(((serviceMonths % 12) / 12) * 30);
    
    return {
      eligible: eligibleDays,
      remaining: proportionalDays
    };
  }
  
  // Férias proporcionais para menos de 12 meses
  const proportionalDays = Math.floor((serviceMonths / 12) * 30);
  return {
    eligible: 0,
    remaining: proportionalDays
  };
}

/**
 * Calcula reduções nas férias por faltas injustificadas
 * Baseado no artigo 130 da CLT
 */
function calculateVacationReduction(unjustifiedAbsences: number): number {
  if (unjustifiedAbsences <= 5) return 30;
  if (unjustifiedAbsences <= 14) return 24;
  if (unjustifiedAbsences <= 23) return 18;
  if (unjustifiedAbsences <= 32) return 12;
  return 0; // Perde o direito às férias
}

/**
 * Calcula valor das férias
 */
function calculateVacationPayment(
  salary: number,
  vacationDays: number,
  averageSalary?: number
): { vacationValue: number; dailySalary: number } {
  const baseSalary = averageSalary || salary;
  const dailySalary = baseSalary / 30;
  const vacationValue = dailySalary * vacationDays;
  
  return {
    vacationValue: Math.round(vacationValue * 100) / 100,
    dailySalary: Math.round(dailySalary * 100) / 100
  };
}

/**
 * Calcula venda de dias de férias (máximo 10 dias = 1/3 das férias)
 */
function calculateSoldDays(
  salary: number,
  soldDays: number,
  averageSalary?: number
): { soldDaysValue: number; soldDaysBonus: number } {
  if (soldDays <= 0 || soldDays > 10) {
    return { soldDaysValue: 0, soldDaysBonus: 0 };
  }

  const baseSalary = averageSalary || salary;
  const dailySalary = baseSalary / 30;
  
  const soldDaysValue = dailySalary * soldDays;
  const soldDaysBonus = soldDaysValue * VACATION_BONUS;
  
  return {
    soldDaysValue: Math.round(soldDaysValue * 100) / 100,
    soldDaysBonus: Math.round(soldDaysBonus * 100) / 100
  };
}

/**
 * Formata período de férias
 */
function formatVacationPeriod(startDate: Date, days: number): string {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days - 1);
  
  const formatter = new Intl.DateTimeFormat('pt-BR');
  return `${formatter.format(startDate)} a ${formatter.format(endDate)}`;
}

/**
 * Função principal de cálculo de férias
 */
export function calculateVacation(input: VacationInput): VacationResult {
  // Validações
  if (!isValidDate(input.admissionDate) || !isValidDate(input.vacationStartDate)) {
    throw new Error('Datas inválidas');
  }

  if (input.admissionDate >= input.vacationStartDate) {
    throw new Error('Data de início das férias deve ser posterior à data de admissão');
  }

  if (input.salary <= 0) {
    throw new Error('Salário deve ser maior que zero');
  }

  if (input.vacationDays <= 0 || input.vacationDays > 30) {
    throw new Error('Dias de férias deve estar entre 1 e 30 dias');
  }

  if (input.sellDays && (input.sellDays < 0 || input.sellDays > 10)) {
    throw new Error('Venda de dias deve estar entre 0 e 10 dias');
  }

  // Cálculos de elegibilidade
  const eligibilityData = calculateEligibleVacationDays(
    input.admissionDate,
    input.vacationStartDate
  );

  // Verificar se tem direito às férias solicitadas
  const totalAvailableDays = eligibilityData.eligible + eligibilityData.remaining;
  if (input.vacationDays > totalAvailableDays) {
    throw new Error(`Você tem direito a apenas ${totalAvailableDays} dias de férias`);
  }

  // Cálculo dos valores das férias
  const vacationData = calculateVacationPayment(
    input.salary,
    input.vacationDays,
    input.averageSalary
  );

  const vacationBonus = vacationData.vacationValue * VACATION_BONUS;

  // Cálculo da venda de dias (se aplicável)
  const soldDaysData = calculateSoldDays(
    input.salary,
    input.sellDays || 0,
    input.averageSalary
  );

  // Cálculo do total bruto
  const grossTotal = 
    vacationData.vacationValue +
    vacationBonus +
    soldDaysData.soldDaysValue +
    soldDaysData.soldDaysBonus;

  // Cálculo dos descontos (INSS e IRRF)
  const netSalaryData = calculateNetSalary(grossTotal, input.dependents || 0);

  // Total líquido
  const netTotal = grossTotal - netSalaryData.inssDiscount - netSalaryData.irrfDiscount;

  // Tempo de serviço
  const serviceYears = calculateYearsDifference(input.admissionDate, input.vacationStartDate);
  const serviceMonths = calculateMonthsDifference(input.admissionDate, input.vacationStartDate) % 12;
  const serviceTime = `${serviceYears} anos e ${serviceMonths} meses`;

  return {
    vacationValue: vacationData.vacationValue,
    vacationBonus: Math.round(vacationBonus * 100) / 100,
    soldDaysValue: soldDaysData.soldDaysValue,
    soldDaysBonus: soldDaysData.soldDaysBonus,
    grossTotal: Math.round(grossTotal * 100) / 100,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    netTotal: Math.round(netTotal * 100) / 100,
    details: {
      eligibleDays: eligibilityData.eligible,
      remainingDays: eligibilityData.remaining,
      serviceTime,
      dailySalary: vacationData.dailySalary,
      vacationPeriod: formatVacationPeriod(input.vacationStartDate, input.vacationDays),
    },
  };
}

/**
 * Calcula férias coletivas
 */
export function calculateCollectiveVacation(
  salary: number,
  vacationDays: number,
  dependents: number = 0,
  averageSalary?: number
): Omit<VacationResult, 'details'> {
  if (vacationDays <= 0 || vacationDays > 30) {
    throw new Error('Dias de férias deve estar entre 1 e 30 dias');
  }

  const vacationData = calculateVacationPayment(salary, vacationDays, averageSalary);
  const vacationBonus = vacationData.vacationValue * VACATION_BONUS;
  const grossTotal = vacationData.vacationValue + vacationBonus;
  
  const netSalaryData = calculateNetSalary(grossTotal, dependents);
  const netTotal = grossTotal - netSalaryData.inssDiscount - netSalaryData.irrfDiscount;

  return {
    vacationValue: vacationData.vacationValue,
    vacationBonus: Math.round(vacationBonus * 100) / 100,
    soldDaysValue: 0,
    soldDaysBonus: 0,
    grossTotal: Math.round(grossTotal * 100) / 100,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    netTotal: Math.round(netTotal * 100) / 100,
  };
}