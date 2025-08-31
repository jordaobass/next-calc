/**
 * Cálculos de INSS baseados na tabela 2024
 * Atualizado conforme Portaria Interministerial MPS/MF
 */

export interface INSSInput {
  salary: number;
  hasMultipleJobs: boolean;
  otherJobsSalary?: number;
  calculationType: 'monthly' | 'annual' | 'projection';
  months?: number; // Para projeção anual
}

export interface INSSResult {
  grossSalary: number;
  inssDiscount: number;
  netSalary: number;
  effectiveRate: number;
  contributionCeiling: number;
  isAtCeiling: boolean;
  details: {
    brackets: Array<{
      range: string;
      rate: number;
      salaryPortion: number;
      contribution: number;
    }>;
    totalCalculated: number;
    totalOtherJobs?: number;
  };
}

// Tabela INSS 2024
const INSS_TABLE_2024 = [
  { min: 0, max: 1412.00, rate: 7.5 },
  { min: 1412.01, max: 2666.68, rate: 9.0 },
  { min: 2666.69, max: 4000.03, rate: 12.0 },
  { min: 4000.04, max: 7786.02, rate: 14.0 },
];

const INSS_CEILING_2024 = 7786.02;
const MAX_CONTRIBUTION_2024 = 908.85;

export function calculateINSS(input: INSSInput): INSSResult {
  const { salary, hasMultipleJobs, otherJobsSalary = 0, calculationType, months = 12 } = input;
  
  let totalSalary = salary;
  
  // Se tem outros empregos, somar para verificar teto
  if (hasMultipleJobs && otherJobsSalary > 0) {
    totalSalary += otherJobsSalary;
  }
  
  // Calcular INSS principal
  const mainJobINSS = calculateINSSForSalary(salary);
  
  // Calcular INSS outros empregos (se aplicável)
  let otherJobsINSS = 0;
  if (hasMultipleJobs && otherJobsSalary > 0) {
    otherJobsINSS = calculateINSSForSalary(otherJobsSalary);
  }
  
  // Verificar teto global
  let totalINSS = mainJobINSS.totalContribution + otherJobsINSS;
  const isAtGlobalCeiling = totalINSS > MAX_CONTRIBUTION_2024;
  
  if (isAtGlobalCeiling) {
    // Ajustar proporcionalmente se ultrapassou o teto
    const proportion = MAX_CONTRIBUTION_2024 / totalINSS;
    totalINSS = MAX_CONTRIBUTION_2024;
    
    // Ajustar INSS do emprego principal proporcionalmente
    mainJobINSS.totalContribution *= proportion;
  }
  
  // Calcular valores finais baseado no tipo
  let finalSalary = salary;
  let finalINSS = mainJobINSS.totalContribution;
  
  if (calculationType === 'annual' && months) {
    finalSalary = salary * months;
    finalINSS = mainJobINSS.totalContribution * months;
  } else if (calculationType === 'projection' && months) {
    finalSalary = salary * months;
    finalINSS = mainJobINSS.totalContribution * months;
  }
  
  const netSalary = finalSalary - finalINSS;
  const effectiveRate = (finalINSS / finalSalary) * 100;
  
  return {
    grossSalary: finalSalary,
    inssDiscount: finalINSS,
    netSalary,
    effectiveRate,
    contributionCeiling: INSS_CEILING_2024,
    isAtCeiling: mainJobINSS.isAtCeiling || isAtGlobalCeiling,
    details: {
      brackets: mainJobINSS.brackets,
      totalCalculated: mainJobINSS.totalContribution,
      totalOtherJobs: hasMultipleJobs ? otherJobsINSS : undefined,
    },
  };
}

function calculateINSSForSalary(salary: number) {
  const brackets: Array<{
    range: string;
    rate: number;
    salaryPortion: number;
    contribution: number;
  }> = [];
  
  let totalContribution = 0;
  let remainingSalary = salary;
  
  for (let i = 0; i < INSS_TABLE_2024.length; i++) {
    const bracket = INSS_TABLE_2024[i];
    
    if (remainingSalary <= 0) break;
    
    const bracketMax = bracket.max === Infinity ? INSS_CEILING_2024 : bracket.max;
    const salaryInBracket = Math.min(remainingSalary, bracketMax - bracket.min + (i === 0 ? 0 : 0.01));
    
    if (salaryInBracket > 0) {
      const contribution = salaryInBracket * (bracket.rate / 100);
      totalContribution += contribution;
      
      brackets.push({
        range: `${formatCurrency(bracket.min)} - ${formatCurrency(bracketMax)}`,
        rate: bracket.rate,
        salaryPortion: salaryInBracket,
        contribution,
      });
      
      remainingSalary -= salaryInBracket;
    }
  }
  
  // Verificar teto individual
  const isAtCeiling = salary >= INSS_CEILING_2024;
  if (isAtCeiling) {
    totalContribution = Math.min(totalContribution, MAX_CONTRIBUTION_2024);
  }
  
  return {
    totalContribution,
    brackets,
    isAtCeiling,
  };
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatINSSReport(result: INSSResult, input: INSSInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE CÁLCULO INSS 2024

DADOS INFORMADOS:
- Salário Bruto: ${formatCurrency(input.salary)}
${input.hasMultipleJobs && input.otherJobsSalary ? `- Outros Empregos: ${formatCurrency(input.otherJobsSalary)}` : ''}
- Tipo de Cálculo: ${input.calculationType === 'monthly' ? 'Mensal' : input.calculationType === 'annual' ? 'Anual' : 'Projeção'}
${input.months && input.calculationType !== 'monthly' ? `- Período: ${input.months} meses` : ''}

CÁLCULO POR FAIXAS:
${details.brackets.map(bracket => 
  `Faixa ${bracket.range} (${bracket.rate}%): ${formatCurrency(bracket.contribution)}`
).join('\n')}

RESUMO:
- Salário Base: ${formatCurrency(result.grossSalary)}
- Desconto INSS: ${formatCurrency(result.inssDiscount)}
- Salário Líquido: ${formatCurrency(result.netSalary)}
- Alíquota Efetiva: ${result.effectiveRate.toFixed(2)}%
- Teto INSS 2024: ${formatCurrency(result.contributionCeiling)}
${result.isAtCeiling ? '- ⚠️ Atingiu o teto de contribuição' : ''}

* Tabela INSS 2024 conforme Portaria Interministerial
* Cálculo para fins informativos - consulte um contador
`.trim();
}