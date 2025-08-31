/**
 * Cálculos de IRRF baseados na tabela 2024
 * Atualizado conforme Receita Federal
 */

export interface IRRFInput {
  salary: number;
  dependents: number;
  inssDiscount?: number;
  otherDeductions?: number;
  pensionAlimony?: number;
  calculationType: 'monthly' | 'annual' | 'projection';
  months?: number;
}

export interface IRRFResult {
  grossSalary: number;
  calculationBasis: number;
  irrfDiscount: number;
  netSalary: number;
  effectiveRate: number;
  marginalRate: number;
  exemptionLimit: number;
  isExempt: boolean;
  details: {
    dependentsDeduction: number;
    inssDeduction: number;
    otherDeductions: number;
    pensionAlimony: number;
    bracketInfo: {
      range: string;
      rate: number;
      deduction: number;
      taxableAmount: number;
    };
    totalDeductions: number;
  };
}

// Tabela IRRF 2024
const IRRF_TABLE_2024 = [
  { min: 0, max: 2112.00, rate: 0, deduction: 0 },
  { min: 2112.01, max: 2826.65, rate: 7.5, deduction: 158.40 },
  { min: 2826.66, max: 3751.05, rate: 15.0, deduction: 370.40 },
  { min: 3751.06, max: 4664.68, rate: 22.5, deduction: 651.73 },
  { min: 4664.69, max: Infinity, rate: 27.5, deduction: 884.96 },
];

const DEPENDENT_DEDUCTION_2024 = 189.59;

export function calculateIRRF(input: IRRFInput): IRRFResult {
  const {
    salary,
    dependents,
    inssDiscount = 0,
    otherDeductions = 0,
    pensionAlimony = 0,
    calculationType,
    months = 12,
  } = input;

  // Calcular dedução por dependentes
  const dependentsDeduction = dependents * DEPENDENT_DEDUCTION_2024;

  // Calcular base de cálculo
  const totalDeductions = inssDiscount + dependentsDeduction + otherDeductions + pensionAlimony;
  const calculationBasis = Math.max(0, salary - totalDeductions);

  // Encontrar a faixa de tributação
  const bracket = IRRF_TABLE_2024.find(
    (bracket) => calculationBasis >= bracket.min && calculationBasis <= bracket.max
  ) || IRRF_TABLE_2024[IRRF_TABLE_2024.length - 1];

  // Calcular IRRF
  let irrfDiscount = 0;
  if (bracket.rate > 0) {
    irrfDiscount = (calculationBasis * bracket.rate / 100) - bracket.deduction;
    irrfDiscount = Math.max(0, irrfDiscount);
  }

  // Aplicar multiplicador conforme tipo de cálculo
  let finalSalary = salary;
  let finalIRRF = irrfDiscount;
  
  if (calculationType === 'annual' && months) {
    finalSalary = salary * months;
    finalIRRF = irrfDiscount * months;
  } else if (calculationType === 'projection' && months) {
    finalSalary = salary * months;
    finalIRRF = irrfDiscount * months;
  }

  const netSalary = finalSalary - finalIRRF;
  const effectiveRate = finalSalary > 0 ? (finalIRRF / finalSalary) * 100 : 0;
  const marginalRate = bracket.rate;

  return {
    grossSalary: finalSalary,
    calculationBasis,
    irrfDiscount: finalIRRF,
    netSalary,
    effectiveRate,
    marginalRate,
    exemptionLimit: IRRF_TABLE_2024[0].max,
    isExempt: calculationBasis <= IRRF_TABLE_2024[0].max,
    details: {
      dependentsDeduction,
      inssDeduction: inssDiscount,
      otherDeductions,
      pensionAlimony,
      bracketInfo: {
        range: bracket.max === Infinity 
          ? `Acima de ${formatCurrency(bracket.min)}`
          : `${formatCurrency(bracket.min)} - ${formatCurrency(bracket.max)}`,
        rate: bracket.rate,
        deduction: bracket.deduction,
        taxableAmount: calculationBasis,
      },
      totalDeductions,
    },
  };
}

export function calculateINSSForIRRF(salary: number): number {
  // Tabela INSS 2024 simplificada para cálculo do IRRF
  const INSS_TABLE = [
    { min: 0, max: 1412.00, rate: 7.5 },
    { min: 1412.01, max: 2666.68, rate: 9.0 },
    { min: 2666.69, max: 4000.03, rate: 12.0 },
    { min: 4000.04, max: 7786.02, rate: 14.0 },
  ];

  let inssTotal = 0;
  let remainingSalary = salary;

  for (const bracket of INSS_TABLE) {
    if (remainingSalary <= 0) break;

    const bracketMax = bracket.max === Infinity ? 7786.02 : bracket.max;
    const salaryInBracket = Math.min(remainingSalary, bracketMax - bracket.min + (bracket.min === 0 ? 0 : 0.01));

    if (salaryInBracket > 0) {
      const inssInBracket = salaryInBracket * (bracket.rate / 100);
      inssTotal += inssInBracket;
      remainingSalary -= salaryInBracket;
    }
  }

  // Aplicar teto do INSS
  return Math.min(inssTotal, 908.85);
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatIRRFReport(result: IRRFResult, input: IRRFInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE CÁLCULO IRRF 2024

DADOS INFORMADOS:
- Salário Bruto: ${formatCurrency(input.salary)}
- Dependentes: ${input.dependents}
- Desconto INSS: ${formatCurrency(details.inssDeduction)}
- Outras Deduções: ${formatCurrency(details.otherDeductions)}
${details.pensionAlimony > 0 ? `- Pensão Alimentícia: ${formatCurrency(details.pensionAlimony)}` : ''}

BASE DE CÁLCULO:
- Salário Bruto: ${formatCurrency(input.salary)}
- (-) Dedução INSS: ${formatCurrency(details.inssDeduction)}
- (-) Dependentes: ${formatCurrency(details.dependentsDeduction)}
- (-) Outras Deduções: ${formatCurrency(details.otherDeductions + details.pensionAlimony)}
= Base Tributável: ${formatCurrency(result.calculationBasis)}

CÁLCULO DO IMPOSTO:
- Faixa: ${details.bracketInfo.range}
- Alíquota: ${details.bracketInfo.rate}%
- Parcela a Deduzir: ${formatCurrency(details.bracketInfo.deduction)}

RESUMO:
- Salário Bruto: ${formatCurrency(result.grossSalary)}
- (-) IRRF: ${formatCurrency(result.irrfDiscount)}
- Salário Líquido: ${formatCurrency(result.netSalary)}
- Alíquota Efetiva: ${result.effectiveRate.toFixed(2)}%
- Limite de Isenção: ${formatCurrency(result.exemptionLimit)}
${result.isExempt ? '- ✅ Isento de IRRF' : ''}

* Tabela IRRF 2024 conforme Receita Federal
* Cálculo para fins informativos - consulte um contador
`.trim();
}