/**
 * Cálculos de Adicional de Periculosidade baseados na CLT
 * Atualizado para 2024
 */

export interface PericulosidadeInput {
  salary: number;
  hasDangerousActivity: boolean;
  hoursInDanger: number;
  totalWorkHours: number;
  calculationType: 'monthly' | 'proportional';
  months?: number;
}

export interface PericulosidadeResult {
  baseSalary: number;
  additionalRate: number;
  additionalValue: number;
  proportionalRate?: number;
  totalSalary: number;
  additionalPercentage: number;
  details: {
    isFullTime: boolean;
    hoursInDanger: number;
    totalWorkHours: number;
    proportionCalculation: string;
    legalBasis: string;
    activities: string[];
  };
}

// Taxa padrão de periculosidade - 30%
const PERICULOSIDADE_RATE = 30; // 30% sobre o salário base

// Atividades consideradas perigosas (exemplos principais)
const DANGEROUS_ACTIVITIES = [
  'Trabalho com explosivos',
  'Trabalho com inflamáveis',
  'Trabalho com radiação ionizante',
  'Trabalho com energia elétrica acima de 250V',
  'Trabalho com motocicletas (mototaxistas, motoboys)',
  'Segurança pessoal ou patrimonial',
  'Trabalho em postos de combustível',
  'Trabalho com material radioativo',
];

export function calculatePericulosidade(input: PericulosidadeInput): PericulosidadeResult {
  const {
    salary,
    hasDangerousActivity,
    hoursInDanger,
    totalWorkHours,
    calculationType,
    months = 1,
  } = input;

  if (!hasDangerousActivity) {
    return {
      baseSalary: salary,
      additionalRate: 0,
      additionalValue: 0,
      totalSalary: salary,
      additionalPercentage: 0,
      details: {
        isFullTime: false,
        hoursInDanger: 0,
        totalWorkHours,
        proportionCalculation: 'Não há exposição a atividades perigosas',
        legalBasis: 'CLT Art. 193',
        activities: [],
      },
    };
  }

  let additionalRate = PERICULOSIDADE_RATE;
  let proportionalRate: number | undefined;
  let additionalValue = 0;

  const isFullTime = hoursInDanger >= totalWorkHours;

  if (calculationType === 'proportional' && !isFullTime) {
    // Cálculo proporcional baseado no tempo de exposição
    proportionalRate = (hoursInDanger / totalWorkHours) * PERICULOSIDADE_RATE;
    additionalRate = proportionalRate;
    additionalValue = (salary * proportionalRate) / 100;
  } else {
    // Adicional integral (30% do salário)
    additionalValue = (salary * PERICULOSIDADE_RATE) / 100;
  }

  // Aplicar multiplicador de meses se necessário
  const finalAdditionalValue = additionalValue * months;
  const finalSalary = salary * months;
  const totalSalary = finalSalary + finalAdditionalValue;

  const proportionCalculation = calculationType === 'proportional' && !isFullTime
    ? `(${hoursInDanger}h ÷ ${totalWorkHours}h) × 30% = ${additionalRate.toFixed(2)}%`
    : '30% integral sobre o salário base';

  return {
    baseSalary: finalSalary,
    additionalRate,
    additionalValue: finalAdditionalValue,
    proportionalRate,
    totalSalary,
    additionalPercentage: (finalAdditionalValue / finalSalary) * 100,
    details: {
      isFullTime,
      hoursInDanger,
      totalWorkHours,
      proportionCalculation,
      legalBasis: 'CLT Art. 193 - Lei 6.514/77',
      activities: DANGEROUS_ACTIVITIES,
    },
  };
}

export function formatPericulosidadeReport(result: PericulosidadeResult, input: PericulosidadeInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE ADICIONAL DE PERICULOSIDADE

DADOS INFORMADOS:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Atividade Perigosa: ${input.hasDangerousActivity ? 'Sim' : 'Não'}
- Horas em Exposição: ${details.hoursInDanger}h
- Total de Horas Trabalhadas: ${details.totalWorkHours}h
- Tipo de Cálculo: ${input.calculationType === 'proportional' ? 'Proporcional' : 'Mensal'}

CÁLCULO DO ADICIONAL:
- Taxa Base: 30% (conforme CLT Art. 193)
- ${details.proportionCalculation}
- Valor do Adicional: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

RESULTADO:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Adicional Periculosidade: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Salário Total: ${result.totalSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

ATIVIDADES PERIGOSAS (Exemplos):
${details.activities.map(activity => `• ${activity}`).join('\n')}

BASE LEGAL:
- ${details.legalBasis}
- NR-16 - Atividades e Operações Perigosas
- Súmula 364 TST (adicional sobre salário base)

OBSERVAÇÕES:
- Adicional de 30% sobre o salário contratual
- Incompatível com adicional de insalubridade
- Direito reconhecido mediante perícia técnica
- Consulte um advogado trabalhista para casos específicos

* Cálculo baseado na legislação trabalhista brasileira
* Valores podem variar conforme laudo pericial
`.trim();
}