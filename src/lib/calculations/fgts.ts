import { FGTS_RATE, FGTS_FINE_RATE } from './constants';
import { calculateMonthsDifference, calculateYearsDifference, isValidDate } from './utils';

export interface FGTSInput {
  salary: number;
  admissionDate: Date;
  referenceDate: Date;
  currentBalance?: number; // Saldo atual já depositado
  averageSalary?: number; // Para salário variável
  includeBonus13th?: boolean; // Incluir 13º no cálculo
  includeVacationBonus?: boolean; // Incluir 1/3 férias no cálculo
}

export interface FGTSResult {
  // Valores principais
  monthlyDeposit: number;
  totalDeposits: number;
  currentBalance: number;
  projectedBalance: number;
  
  // Simulação de saque
  withdrawalSimulation: {
    dismissalWithoutCause: number; // 40% multa
    mutualAgreement: number; // 20% multa
    resignationNoWithdrawal: number; // 0 - não pode sacar
    homeFinancing: number; // Valor disponível
  };
  
  // Detalhes
  details: {
    serviceTime: string;
    totalMonths: number;
    annualYield: number; // Rendimento TR + 3% a.a.
    monthlyYieldRate: number;
    companyContribution: number;
    workerRight: number;
  };
}

export interface FGTSSimulationInput {
  initialSalary: number;
  yearsOfService: number;
  salaryGrowthRate?: number; // % anual de aumento
  averageYield?: number; // Rendimento médio anual (padrão 3%)
}

export interface FGTSSimulationResult {
  finalBalance: number;
  totalDeposits: number;
  totalYield: number;
  yearlyBreakdown: Array<{
    year: number;
    salary: number;
    deposits: number;
    balance: number;
    yield: number;
  }>;
}

/**
 * Calcula depósito mensal do FGTS
 */
function calculateMonthlyFGTSDeposit(
  salary: number,
  includeBonus13th: boolean = false,
  includeVacationBonus: boolean = false
): number {
  let baseSalary = salary;
  
  // 13º salário (1/12 ao mês)
  if (includeBonus13th) {
    baseSalary += salary / 12;
  }
  
  // 1/3 de férias (1/12 do 1/3 ao mês)
  if (includeVacationBonus) {
    baseSalary += (salary / 3) / 12;
  }
  
  return baseSalary * FGTS_RATE;
}

/**
 * Calcula rendimento do FGTS (TR + 3% a.a.)
 */
function calculateFGTSYield(
  balance: number,
  monthsDeposited: number,
  annualYieldRate: number = 0.03
): number {
  const monthlyYieldRate = annualYieldRate / 12;
  const yearsDeposited = monthsDeposited / 12;
  
  // Fórmula simplificada de juros compostos
  const totalYield = balance * Math.pow(1 + annualYieldRate, yearsDeposited) - balance;
  
  return Math.max(0, totalYield);
}

/**
 * Simula saldo FGTS ao longo do tempo
 */
function simulateFGTSBalance(
  monthlyDeposit: number,
  months: number,
  annualYieldRate: number = 0.03
): { balance: number; totalDeposits: number; totalYield: number } {
  const monthlyYieldRate = annualYieldRate / 12;
  let balance = 0;
  let totalDeposits = 0;
  
  for (let month = 1; month <= months; month++) {
    // Adicionar depósito mensal
    balance += monthlyDeposit;
    totalDeposits += monthlyDeposit;
    
    // Aplicar rendimento mensal
    balance = balance * (1 + monthlyYieldRate);
  }
  
  const totalYield = balance - totalDeposits;
  
  return {
    balance: Math.round(balance * 100) / 100,
    totalDeposits: Math.round(totalDeposits * 100) / 100,
    totalYield: Math.round(totalYield * 100) / 100
  };
}

/**
 * Formata tempo de serviço
 */
function formatServiceTime(admissionDate: Date, referenceDate: Date): string {
  const years = calculateYearsDifference(admissionDate, referenceDate);
  const totalMonths = calculateMonthsDifference(admissionDate, referenceDate);
  const months = totalMonths % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  } else if (months === 0) {
    return `${years} ${years === 1 ? 'ano' : 'anos'}`;
  } else {
    return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }
}

/**
 * Função principal para calcular FGTS
 */
export function calculateFGTS(input: FGTSInput): FGTSResult {
  // Validações
  if (!isValidDate(input.admissionDate) || !isValidDate(input.referenceDate)) {
    throw new Error('Datas inválidas');
  }

  if (input.admissionDate > input.referenceDate) {
    throw new Error('Data de referência deve ser posterior à data de admissão');
  }

  if (input.salary <= 0) {
    throw new Error('Salário deve ser maior que zero');
  }

  // Cálculos básicos
  const baseSalary = input.averageSalary || input.salary;
  const totalMonths = calculateMonthsDifference(input.admissionDate, input.referenceDate);
  
  // Depósito mensal
  const monthlyDeposit = calculateMonthlyFGTSDeposit(
    baseSalary,
    input.includeBonus13th,
    input.includeVacationBonus
  );

  // Simulação de saldo
  const simulation = simulateFGTSBalance(monthlyDeposit, totalMonths);
  
  // Saldo atual (informado ou calculado)
  const currentBalance = input.currentBalance || simulation.balance;
  
  // Simulações de saque
  const withdrawalSimulation = {
    dismissalWithoutCause: currentBalance * (1 + FGTS_FINE_RATE), // Saldo + 40% multa
    mutualAgreement: currentBalance * (1 + FGTS_FINE_RATE / 2), // Saldo + 20% multa
    resignationNoWithdrawal: 0, // Não pode sacar
    homeFinancing: currentBalance, // Valor total disponível
  };

  const serviceTime = formatServiceTime(input.admissionDate, input.referenceDate);
  const annualYield = 0.03; // 3% a.a. padrão
  const monthlyYieldRate = annualYield / 12;

  return {
    monthlyDeposit: Math.round(monthlyDeposit * 100) / 100,
    totalDeposits: simulation.totalDeposits,
    currentBalance: Math.round(currentBalance * 100) / 100,
    projectedBalance: simulation.balance,
    withdrawalSimulation: {
      dismissalWithoutCause: Math.round(withdrawalSimulation.dismissalWithoutCause * 100) / 100,
      mutualAgreement: Math.round(withdrawalSimulation.mutualAgreement * 100) / 100,
      resignationNoWithdrawal: 0,
      homeFinancing: Math.round(withdrawalSimulation.homeFinancing * 100) / 100,
    },
    details: {
      serviceTime,
      totalMonths,
      annualYield,
      monthlyYieldRate: Math.round(monthlyYieldRate * 10000) / 10000,
      companyContribution: Math.round((simulation.totalDeposits) * 100) / 100,
      workerRight: Math.round(currentBalance * 100) / 100,
    },
  };
}

/**
 * Simula crescimento do FGTS ao longo dos anos
 */
export function simulateFGTSGrowth(input: FGTSSimulationInput): FGTSSimulationResult {
  const yearlyBreakdown: FGTSSimulationResult['yearlyBreakdown'] = [];
  const salaryGrowthRate = input.salaryGrowthRate || 0.05; // 5% a.a. padrão
  const averageYield = input.averageYield || 0.03; // 3% a.a. padrão
  
  let currentSalary = input.initialSalary;
  let totalDeposits = 0;
  let balance = 0;
  let totalYield = 0;

  for (let year = 1; year <= input.yearsOfService; year++) {
    // Depósitos do ano
    const monthlyDeposit = currentSalary * FGTS_RATE;
    const yearlyDeposits = monthlyDeposit * 12;
    
    // Saldo com rendimento
    balance = (balance + yearlyDeposits) * (1 + averageYield);
    totalDeposits += yearlyDeposits;
    
    const yearYield = balance - totalDeposits + totalYield;
    totalYield = yearYield;

    yearlyBreakdown.push({
      year,
      salary: Math.round(currentSalary * 100) / 100,
      deposits: Math.round(yearlyDeposits * 100) / 100,
      balance: Math.round(balance * 100) / 100,
      yield: Math.round(yearYield * 100) / 100,
    });

    // Crescimento salarial para próximo ano
    currentSalary *= (1 + salaryGrowthRate);
  }

  return {
    finalBalance: Math.round(balance * 100) / 100,
    totalDeposits: Math.round(totalDeposits * 100) / 100,
    totalYield: Math.round(totalYield * 100) / 100,
    yearlyBreakdown,
  };
}

/**
 * Calcula FGTS para rescisão trabalhista
 */
export function calculateFGTSForRescission(
  currentBalance: number,
  rescissionType: 'dismissal_without_cause' | 'mutual_agreement' | 'resignation' | 'dismissal_with_cause'
): {
  balance: number;
  fine: number;
  total: number;
  canWithdraw: boolean;
} {
  let fine = 0;
  let canWithdraw = false;

  switch (rescissionType) {
    case 'dismissal_without_cause':
      fine = currentBalance * FGTS_FINE_RATE; // 40%
      canWithdraw = true;
      break;
    
    case 'mutual_agreement':
      fine = currentBalance * (FGTS_FINE_RATE / 2); // 20%
      canWithdraw = true;
      break;
    
    case 'dismissal_with_cause':
    case 'resignation':
      fine = 0;
      canWithdraw = false;
      break;
  }

  const total = canWithdraw ? currentBalance + fine : 0;

  return {
    balance: Math.round(currentBalance * 100) / 100,
    fine: Math.round(fine * 100) / 100,
    total: Math.round(total * 100) / 100,
    canWithdraw,
  };
}

/**
 * Calcula FGTS acumulado baseado no histórico salarial
 */
export function calculateFGTSWithSalaryHistory(
  salaryHistory: Array<{ salary: number; startDate: Date; endDate: Date }>,
  currentDate: Date = new Date()
): {
  totalDeposits: number;
  estimatedBalance: number;
  monthlyContributions: Array<{ month: string; salary: number; deposit: number }>;
} {
  let totalDeposits = 0;
  const monthlyContributions: Array<{ month: string; salary: number; deposit: number }> = [];

  salaryHistory.forEach((period) => {
    const months = calculateMonthsDifference(period.startDate, period.endDate);
    const monthlyDeposit = period.salary * FGTS_RATE;
    
    for (let i = 0; i <= months; i++) {
      const monthDate = new Date(period.startDate);
      monthDate.setMonth(monthDate.getMonth() + i);
      
      if (monthDate <= currentDate && monthDate <= period.endDate) {
        totalDeposits += monthlyDeposit;
        
        monthlyContributions.push({
          month: monthDate.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit' }),
          salary: period.salary,
          deposit: Math.round(monthlyDeposit * 100) / 100,
        });
      }
    }
  });

  // Estimar saldo com rendimento médio de 3% a.a.
  const estimatedBalance = totalDeposits * 1.03; // Simplificado

  return {
    totalDeposits: Math.round(totalDeposits * 100) / 100,
    estimatedBalance: Math.round(estimatedBalance * 100) / 100,
    monthlyContributions,
  };
}