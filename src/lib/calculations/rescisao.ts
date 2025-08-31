import { 
  RESCISSION_TYPES, 
  FGTS_RATE, 
  FGTS_FINE_RATE,
  VACATION_BONUS 
} from './constants';
import {
  calculateNetSalary,
  calculateProportionalDays,
  calculateProportionalValue,
  calculateMonthsDifference,
  calculateYearsDifference,
  isValidDate
} from './utils';

export interface RescissionInput {
  salary: number;
  admissionDate: Date;
  dismissalDate: Date;
  rescissionType: typeof RESCISSION_TYPES[keyof typeof RESCISSION_TYPES];
  dependents?: number;
  hasVacationPending?: boolean;
  vacationDays?: number;
  has13thSalaryPending?: boolean;
  workedMonths13th?: number;
  fgtsBalance?: number;
  avgSalaryLast3Months?: number;
}

export interface RescissionResult {
  // Valores principais
  salaryBalance: number;
  priorNotice: number;
  vacationValue: number;
  vacationBonus: number;
  thirteenthSalary: number;
  fgtsWithdrawal: number;
  fgtsFine: number;
  
  // Totais
  grossTotal: number;
  inssDiscount: number;
  irrfDiscount: number;
  netTotal: number;
  
  // Detalhes do cálculo
  details: {
    workedDays: number;
    serviceTime: string;
    vacationDays: number;
    priorNoticeType: 'worked' | 'paid' | 'none';
    eligibleForFgtsFine: boolean;
    eligibleForUnemploymentInsurance: boolean;
  };
}

/**
 * Calcula saldo de salário
 */
function calculateSalaryBalance(
  salary: number,
  admissionDate: Date,
  dismissalDate: Date
): { value: number; days: number } {
  const startOfMonth = new Date(dismissalDate.getFullYear(), dismissalDate.getMonth(), 1);
  const workedDays = calculateProportionalDays(startOfMonth, dismissalDate);
  const value = calculateProportionalValue(salary, workedDays);
  
  return { value, days: workedDays };
}

/**
 * Calcula aviso prévio
 */
function calculatePriorNotice(
  salary: number,
  admissionDate: Date,
  dismissalDate: Date,
  rescissionType: string
): { value: number; type: 'worked' | 'paid' | 'none' } {
  // Apenas para demissão sem justa causa e acordo mútuo
  if (rescissionType !== RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE && 
      rescissionType !== RESCISSION_TYPES.MUTUAL_AGREEMENT) {
    return { value: 0, type: 'none' };
  }

  const serviceYears = calculateYearsDifference(admissionDate, dismissalDate);
  let priorNoticeDays = 30; // Mínimo 30 dias

  // Adiciona 3 dias por ano completo de serviço (máximo 90 dias)
  if (serviceYears > 0) {
    priorNoticeDays = Math.min(30 + (serviceYears * 3), 90);
  }

  const dailySalary = salary / 30;
  const value = dailySalary * priorNoticeDays;

  // Para acordo mútuo, aviso prévio é pela metade
  if (rescissionType === RESCISSION_TYPES.MUTUAL_AGREEMENT) {
    return { value: value / 2, type: 'paid' };
  }

  return { value, type: 'paid' };
}

/**
 * Calcula férias vencidas e proporcionais
 */
function calculateVacation(
  salary: number,
  admissionDate: Date,
  dismissalDate: Date,
  hasVacationPending: boolean = false,
  vacationDays: number = 30
): { vacationValue: number; vacationBonus: number; days: number } {
  let totalVacationValue = 0;
  let totalDays = 0;

  // Férias vencidas
  if (hasVacationPending && vacationDays > 0) {
    const dailySalary = salary / 30;
    totalVacationValue += dailySalary * vacationDays;
    totalDays += vacationDays;
  }

  // Férias proporcionais
  const serviceMonths = calculateMonthsDifference(admissionDate, dismissalDate);
  const proportionalVacationMonths = serviceMonths % 12;
  
  if (proportionalVacationMonths > 0) {
    const proportionalDays = Math.floor((proportionalVacationMonths / 12) * 30);
    const dailySalary = salary / 30;
    totalVacationValue += dailySalary * proportionalDays;
    totalDays += proportionalDays;
  }

  const vacationBonus = totalVacationValue * VACATION_BONUS;

  return {
    vacationValue: Math.round(totalVacationValue * 100) / 100,
    vacationBonus: Math.round(vacationBonus * 100) / 100,
    days: totalDays
  };
}

/**
 * Calcula 13º salário
 */
function calculate13thSalary(
  salary: number,
  admissionDate: Date,
  dismissalDate: Date,
  has13thSalaryPending: boolean = false,
  workedMonths13th: number = 0
): number {
  let total13th = 0;

  // 13º do ano anterior (se pendente)
  if (has13thSalaryPending && workedMonths13th > 0) {
    total13th += (salary / 12) * workedMonths13th;
  }

  // 13º proporcional do ano atual
  const currentYear = dismissalDate.getFullYear();
  const yearStart = new Date(currentYear, 0, 1);
  const monthsWorkedThisYear = calculateMonthsDifference(yearStart, dismissalDate) + 1;
  
  if (monthsWorkedThisYear > 0) {
    total13th += (salary / 12) * monthsWorkedThisYear;
  }

  return Math.round(total13th * 100) / 100;
}

/**
 * Calcula FGTS
 */
function calculateFGTS(
  rescissionType: string,
  fgtsBalance: number = 0
): { withdrawal: number; fine: number; eligibleForFine: boolean } {
  const eligibleForFine = rescissionType === RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE;
  const fine = eligibleForFine ? fgtsBalance * FGTS_FINE_RATE : 0;

  // Para acordo mútuo, multa é de 20%
  let mutualAgreementFine = 0;
  if (rescissionType === RESCISSION_TYPES.MUTUAL_AGREEMENT) {
    mutualAgreementFine = fgtsBalance * (FGTS_FINE_RATE / 2);
  }

  return {
    withdrawal: fgtsBalance,
    fine: Math.round((fine + mutualAgreementFine) * 100) / 100,
    eligibleForFine: eligibleForFine || rescissionType === RESCISSION_TYPES.MUTUAL_AGREEMENT
  };
}

/**
 * Verifica elegibilidade para seguro desemprego
 */
function isEligibleForUnemploymentInsurance(
  rescissionType: string,
  admissionDate: Date,
  dismissalDate: Date
): boolean {
  if (rescissionType !== RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE) {
    return false;
  }

  const serviceMonths = calculateMonthsDifference(admissionDate, dismissalDate);
  return serviceMonths >= 12; // Mínimo 12 meses de trabalho
}

/**
 * Função principal de cálculo de rescisão
 */
export function calculateRescission(input: RescissionInput): RescissionResult {
  // Validações
  if (!isValidDate(input.admissionDate) || !isValidDate(input.dismissalDate)) {
    throw new Error('Datas inválidas');
  }

  if (input.admissionDate >= input.dismissalDate) {
    throw new Error('Data de demissão deve ser posterior à data de admissão');
  }

  if (input.salary <= 0) {
    throw new Error('Salário deve ser maior que zero');
  }

  // Cálculos individuais
  const salaryBalanceData = calculateSalaryBalance(
    input.salary,
    input.admissionDate,
    input.dismissalDate
  );

  const priorNoticeData = calculatePriorNotice(
    input.salary,
    input.admissionDate,
    input.dismissalDate,
    input.rescissionType
  );

  const vacationData = calculateVacation(
    input.salary,
    input.admissionDate,
    input.dismissalDate,
    input.hasVacationPending,
    input.vacationDays
  );

  const thirteenthSalary = calculate13thSalary(
    input.salary,
    input.admissionDate,
    input.dismissalDate,
    input.has13thSalaryPending,
    input.workedMonths13th
  );

  const fgtsData = calculateFGTS(input.rescissionType, input.fgtsBalance || 0);

  // Cálculo do total bruto
  const grossTotal = 
    salaryBalanceData.value +
    priorNoticeData.value +
    vacationData.vacationValue +
    vacationData.vacationBonus +
    thirteenthSalary +
    fgtsData.withdrawal +
    fgtsData.fine;

  // Cálculo dos descontos (INSS e IRRF aplicados apenas sobre valores tributáveis)
  const taxableAmount = 
    salaryBalanceData.value +
    priorNoticeData.value +
    vacationData.vacationValue +
    vacationData.vacationBonus +
    thirteenthSalary;

  const netSalaryData = calculateNetSalary(taxableAmount, input.dependents || 0);

  // Total líquido
  const netTotal = grossTotal - netSalaryData.inssDiscount - netSalaryData.irrfDiscount;

  const serviceTime = `${calculateYearsDifference(input.admissionDate, input.dismissalDate)} anos e ${
    calculateMonthsDifference(input.admissionDate, input.dismissalDate) % 12
  } meses`;

  return {
    salaryBalance: salaryBalanceData.value,
    priorNotice: priorNoticeData.value,
    vacationValue: vacationData.vacationValue,
    vacationBonus: vacationData.vacationBonus,
    thirteenthSalary,
    fgtsWithdrawal: fgtsData.withdrawal,
    fgtsFine: fgtsData.fine,
    grossTotal: Math.round(grossTotal * 100) / 100,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    netTotal: Math.round(netTotal * 100) / 100,
    details: {
      workedDays: salaryBalanceData.days,
      serviceTime,
      vacationDays: vacationData.days,
      priorNoticeType: priorNoticeData.type,
      eligibleForFgtsFine: fgtsData.eligibleForFine,
      eligibleForUnemploymentInsurance: isEligibleForUnemploymentInsurance(
        input.rescissionType,
        input.admissionDate,
        input.dismissalDate
      ),
    },
  };
}