/**
 * Cálculos de Adicional de Insalubridade baseados na CLT
 * Atualizado para 2024
 */

export interface AdicionalInsalubridadeInput {
  salary: number;
  insalubricadeGrade: 'minimum' | 'medium' | 'maximum';
  hasInsalubrious: boolean;
  hoursInInsalubrious: number;
  totalWorkHours: number;
  calculationType: 'monthly' | 'proportional';
  months?: number;
}

export interface AdicionalInsalubridadeResult {
  baseSalary: number;
  additionalRate: number;
  additionalValue: number;
  proportionalRate?: number;
  totalSalary: number;
  additionalPercentage: number;
  details: {
    insalubricadeGrade: 'minimum' | 'medium' | 'maximum';
    isFullTime: boolean;
    hoursInInsalubrious: number;
    totalWorkHours: number;
    proportionCalculation: string;
    legalBasis: string;
    activities: string[];
    gradeDescription: string;
  };
}

// Taxa de adicional de insalubridade baseado no salário mínimo
const INSALUBRIDADE_RATES = {
  minimum: 10,  // 10% do salário mínimo
  medium: 20,   // 20% do salário mínimo  
  maximum: 40   // 40% do salário mínimo
};

// Salário mínimo nacional 2024
const MINIMUM_WAGE_2024 = 1412;

// Atividades consideradas insalubres por grau
const INSALUBRIOUS_ACTIVITIES = {
  minimum: [
    'Ruído contínuo ou intermitente acima de 85 dB',
    'Calor em ambiente fechado sem ventilação',
    'Umidade em locais alagados',
    'Poeira em pequenas quantidades',
    'Trabalho em frigoríficos (até -18°C)',
  ],
  medium: [
    'Ruído de impacto acima de 120 dB',
    'Exposição a agentes químicos nocivos',
    'Radiação não ionizante',
    'Vibrações localizadas ou de corpo inteiro',
    'Frio intensivo (abaixo de -18°C)',
    'Trabalho em minas subterrâneas',
  ],
  maximum: [
    'Exposição a asbesto (amianto)',
    'Benzeno e seus homólogos',
    'Carvão mineral e derivados',
    'Radiação ionizante',
    'Trabalho em espaços confinados com gases tóxicos',
    'Chumbo e seus compostos',
  ]
};

const GRADE_DESCRIPTIONS = {
  minimum: 'Grau Mínimo - 10% do salário mínimo',
  medium: 'Grau Médio - 20% do salário mínimo',
  maximum: 'Grau Máximo - 40% do salário mínimo'
};

export function calculateAdicionalInsalubridade(input: AdicionalInsalubridadeInput): AdicionalInsalubridadeResult {
  const {
    salary,
    insalubricadeGrade,
    hasInsalubrious,
    hoursInInsalubrious,
    totalWorkHours,
    calculationType,
    months = 1,
  } = input;

  if (!hasInsalubrious) {
    return {
      baseSalary: salary,
      additionalRate: 0,
      additionalValue: 0,
      totalSalary: salary,
      additionalPercentage: 0,
      details: {
        insalubricadeGrade,
        isFullTime: false,
        hoursInInsalubrious: 0,
        totalWorkHours,
        proportionCalculation: 'Não há exposição a agentes insalubres',
        legalBasis: 'CLT Art. 192',
        activities: [],
        gradeDescription: GRADE_DESCRIPTIONS[insalubricadeGrade],
      },
    };
  }

  const additionalRate = INSALUBRIDADE_RATES[insalubricadeGrade];
  const isFullTime = hoursInInsalubrious >= totalWorkHours;

  // Insalubridade é calculada sobre o salário mínimo, não sobre o salário base
  const baseForCalculation = MINIMUM_WAGE_2024;
  let additionalValue = (baseForCalculation * additionalRate) / 100;
  let proportionalRate: number | undefined;

  if (calculationType === 'proportional' && !isFullTime) {
    // Cálculo proporcional baseado no tempo de exposição
    proportionalRate = (hoursInInsalubrious / totalWorkHours) * additionalRate;
    additionalValue = (baseForCalculation * proportionalRate) / 100;
  }

  // Aplicar multiplicador de meses se necessário
  const finalAdditionalValue = additionalValue * months;
  const finalSalary = salary * months;
  const totalSalary = finalSalary + finalAdditionalValue;

  const proportionCalculation = calculationType === 'proportional' && !isFullTime
    ? `(${hoursInInsalubrious}h ÷ ${totalWorkHours}h) × ${additionalRate}% do SM = ${(proportionalRate || 0).toFixed(2)}% do SM`
    : `${additionalRate}% do salário mínimo (R$ ${MINIMUM_WAGE_2024.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`;

  return {
    baseSalary: finalSalary,
    additionalRate,
    additionalValue: finalAdditionalValue,
    proportionalRate,
    totalSalary,
    additionalPercentage: (finalAdditionalValue / finalSalary) * 100,
    details: {
      insalubricadeGrade,
      isFullTime,
      hoursInInsalubrious,
      totalWorkHours,
      proportionCalculation,
      legalBasis: 'CLT Art. 192 - Lei 6.514/77',
      activities: INSALUBRIOUS_ACTIVITIES[insalubricadeGrade],
      gradeDescription: GRADE_DESCRIPTIONS[insalubricadeGrade],
    },
  };
}

export function formatAdicionalInsalubridadeReport(result: AdicionalInsalubridadeResult, input: AdicionalInsalubridadeInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE ADICIONAL DE INSALUBRIDADE

DADOS INFORMADOS:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Atividade Insalubre: ${input.hasInsalubrious ? 'Sim' : 'Não'}
- Grau de Insalubridade: ${details.gradeDescription}
- Horas em Exposição: ${details.hoursInInsalubrious}h
- Total de Horas Trabalhadas: ${details.totalWorkHours}h
- Tipo de Cálculo: ${input.calculationType === 'proportional' ? 'Proporcional' : 'Mensal'}

CÁLCULO DO ADICIONAL:
- Base de Cálculo: Salário Mínimo (R$ ${MINIMUM_WAGE_2024.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
- Taxa: ${result.additionalRate}% do salário mínimo
- ${details.proportionCalculation}
- Valor do Adicional: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

RESULTADO:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Adicional Insalubridade: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Salário Total: ${result.totalSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

ATIVIDADES INSALUBRES (${details.gradeDescription}):
${details.activities.map(activity => `• ${activity}`).join('\n')}

BASE LEGAL:
- ${details.legalBasis}
- NR-15 - Atividades e Operações Insalubres
- Súmula 17 TST (cálculo sobre salário mínimo)
- Súmula 448 TST (caracterização por perícia)

OBSERVAÇÕES:
- Adicional calculado sobre o salário mínimo nacional
- Incompatível com adicional de periculosidade  
- Direito reconhecido mediante perícia técnica (NR-15)
- Não integra salário para cálculo de horas extras
- Consulte um advogado trabalhista para casos específicos

* Cálculo baseado na legislação trabalhista brasileira
* Valores podem variar conforme laudo pericial
`.trim();
}