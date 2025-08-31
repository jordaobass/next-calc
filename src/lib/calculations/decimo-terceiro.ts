import { calculateNetSalary, calculateMonthsDifference, isValidDate } from './utils';

export interface ThirteenthSalaryInput {
  salary: number;
  admissionDate: Date;
  referenceDate: Date; // Data de referência para o cálculo
  workedMonths?: number; // Meses trabalhados (se específico)
  dependents?: number;
  averageSalary?: number; // Para casos de salário variável
  advanceReceived?: number; // Adiantamento recebido
}

export interface ThirteenthSalaryResult {
  // Valores principais
  grossValue: number;
  advanceDeduction: number;
  netThirteenthSalary: number;
  
  // Descontos
  inssDiscount: number;
  irrfDiscount: number;
  
  // Totais
  totalToPay: number;
  
  // Detalhes
  details: {
    eligibleMonths: number;
    serviceTime: string;
    monthlyBasis: number;
    proportionalRate: number;
    paymentDates: {
      firstInstallment: string; // 30 de novembro
      secondInstallment: string; // 20 de dezembro
    };
  };
}

/**
 * Calcula meses elegíveis para 13º salário
 * Considerando que fração igual ou superior a 15 dias = 1 mês
 */
function calculateEligibleMonths(
  admissionDate: Date,
  referenceDate: Date,
  workedMonths?: number
): { months: number; proportionalRate: number } {
  // Se meses específicos foram informados
  if (workedMonths && workedMonths > 0 && workedMonths <= 12) {
    return {
      months: workedMonths,
      proportionalRate: workedMonths / 12
    };
  }

  // Cálculo automático baseado em datas
  let months = 0;
  const startYear = referenceDate.getFullYear();
  const yearStartDate = new Date(startYear, 0, 1); // 1º de janeiro
  
  // Data efetiva de início (admissão ou início do ano)
  const effectiveStartDate = admissionDate > yearStartDate ? admissionDate : yearStartDate;
  
  // Calcular mês por mês
  const currentDate = new Date(effectiveStartDate);
  const endDate = new Date(referenceDate);
  
  while (currentDate <= endDate) {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Período trabalhado no mês
    const workStart = currentDate > monthStart ? currentDate : monthStart;
    const workEnd = endDate < monthEnd ? endDate : monthEnd;
    
    // Calcular dias trabalhados no mês
    const workedDays = Math.floor((workEnd.getTime() - workStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // 15 dias ou mais = direito a 1 mês de 13º
    if (workedDays >= 15) {
      months++;
    }
    
    // Próximo mês
    currentDate.setMonth(currentDate.getMonth() + 1);
    currentDate.setDate(1);
  }

  // Máximo 12 meses
  months = Math.min(months, 12);
  
  return {
    months,
    proportionalRate: months / 12
  };
}

/**
 * Calcula datas de pagamento do 13º salário
 */
function getPaymentDates(referenceYear: number): {
  firstInstallment: string;
  secondInstallment: string;
} {
  const firstInstallment = `30/11/${referenceYear}`;
  const secondInstallment = `20/12/${referenceYear}`;
  
  return {
    firstInstallment,
    secondInstallment
  };
}

/**
 * Calcula tempo de serviço formatado
 */
function formatServiceTime(admissionDate: Date, referenceDate: Date): string {
  const totalMonths = calculateMonthsDifference(admissionDate, referenceDate);
  const years = Math.floor(totalMonths / 12);
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
 * Função principal para calcular 13º salário
 */
export function calculateThirteenthSalary(input: ThirteenthSalaryInput): ThirteenthSalaryResult {
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

  if (input.workedMonths && (input.workedMonths < 0 || input.workedMonths > 12)) {
    throw new Error('Meses trabalhados deve estar entre 0 e 12');
  }

  if (input.advanceReceived && input.advanceReceived < 0) {
    throw new Error('Adiantamento não pode ser negativo');
  }

  // Cálculo dos meses elegíveis
  const eligibilityData = calculateEligibleMonths(
    input.admissionDate,
    input.referenceDate,
    input.workedMonths
  );

  // Salário base para cálculo (pode ser média se informada)
  const baseSalary = input.averageSalary || input.salary;
  const monthlyBasis = baseSalary / 12;

  // Valor bruto do 13º salário
  const grossValue = baseSalary * eligibilityData.proportionalRate;

  // Dedução do adiantamento
  const advanceDeduction = Math.min(input.advanceReceived || 0, grossValue);

  // Valor líquido antes dos descontos
  const netBeforeDiscounts = grossValue - advanceDeduction;

  // Cálculo dos descontos (INSS e IRRF sobre valor bruto)
  const netSalaryData = calculateNetSalary(grossValue, input.dependents || 0);

  // Valor final a pagar
  const totalToPay = Math.max(0, netBeforeDiscounts - netSalaryData.inssDiscount - netSalaryData.irrfDiscount);

  return {
    grossValue: Math.round(grossValue * 100) / 100,
    advanceDeduction,
    netThirteenthSalary: Math.round(netBeforeDiscounts * 100) / 100,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    totalToPay: Math.round(totalToPay * 100) / 100,
    details: {
      eligibleMonths: eligibilityData.months,
      serviceTime: formatServiceTime(input.admissionDate, input.referenceDate),
      monthlyBasis: Math.round(monthlyBasis * 100) / 100,
      proportionalRate: Math.round(eligibilityData.proportionalRate * 10000) / 10000,
      paymentDates: getPaymentDates(input.referenceDate.getFullYear()),
    },
  };
}

/**
 * Calcula 13º salário apenas com base proporcional (para rescisão)
 */
export function calculateProportionalThirteenthSalary(
  salary: number,
  monthsWorked: number,
  dependents: number = 0,
  averageSalary?: number
): {
  grossValue: number;
  inssDiscount: number;
  irrfDiscount: number;
  netValue: number;
} {
  if (monthsWorked < 0 || monthsWorked > 12) {
    throw new Error('Meses trabalhados deve estar entre 0 e 12');
  }

  const baseSalary = averageSalary || salary;
  const grossValue = (baseSalary / 12) * monthsWorked;
  
  if (grossValue === 0) {
    return {
      grossValue: 0,
      inssDiscount: 0,
      irrfDiscount: 0,
      netValue: 0,
    };
  }

  const netSalaryData = calculateNetSalary(grossValue, dependents);

  return {
    grossValue: Math.round(grossValue * 100) / 100,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    netValue: Math.round(netSalaryData.netSalary * 100) / 100,
  };
}

/**
 * Calcula antecipação do 13º salário (primeira parcela em novembro)
 */
export function calculateThirteenthAdvance(
  salary: number,
  monthsEligible: number = 12,
  averageSalary?: number
): number {
  const baseSalary = averageSalary || salary;
  const annualSalary = baseSalary * (monthsEligible / 12);
  
  // Primeira parcela = 50% do 13º (sem descontos)
  const advance = annualSalary / 2;
  
  return Math.round(advance * 100) / 100;
}

/**
 * Calcula complemento do 13º salário (segunda parcela em dezembro)
 */
export function calculateThirteenthComplement(
  salary: number,
  monthsEligible: number,
  advanceReceived: number,
  dependents: number = 0,
  averageSalary?: number
): {
  totalThirteenth: number;
  advanceDeduction: number;
  inssDiscount: number;
  irrfDiscount: number;
  complementValue: number;
} {
  const baseSalary = averageSalary || salary;
  const totalThirteenth = baseSalary * (monthsEligible / 12);
  
  // Descontos incidem sobre valor total
  const netSalaryData = calculateNetSalary(totalThirteenth, dependents);
  
  // Complemento = total - adiantamento - descontos
  const complementValue = Math.max(0, 
    totalThirteenth - advanceReceived - netSalaryData.inssDiscount - netSalaryData.irrfDiscount
  );

  return {
    totalThirteenth: Math.round(totalThirteenth * 100) / 100,
    advanceDeduction: advanceReceived,
    inssDiscount: netSalaryData.inssDiscount,
    irrfDiscount: netSalaryData.irrfDiscount,
    complementValue: Math.round(complementValue * 100) / 100,
  };
}