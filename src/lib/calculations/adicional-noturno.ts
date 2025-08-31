/**
 * Cálculos de Adicional Noturno baseados na CLT
 * Atualizado para 2024
 */

export interface AdicionalNoturnoInput {
  salary: number;
  workType: 'urban' | 'rural';
  hasNightWork: boolean;
  nightHours: number;
  totalWorkHours: number;
  calculationType: 'monthly' | 'proportional';
  months?: number;
}

export interface AdicionalNoturnoResult {
  baseSalary: number;
  additionalRate: number;
  additionalValue: number;
  proportionalRate?: number;
  totalSalary: number;
  additionalPercentage: number;
  details: {
    workType: 'urban' | 'rural';
    isFullNight: boolean;
    nightHours: number;
    totalWorkHours: number;
    nightSchedule: string;
    hourValue: number;
    nightHourValue: number;
    proportionCalculation: string;
    legalBasis: string;
    characteristics: string[];
  };
}

// Taxa de adicional noturno - urbano 20%, rural 25%
const NIGHT_ADDITIONAL_RATES = {
  urban: 20, // 20% sobre a hora normal
  rural: 25  // 25% sobre a hora normal
};

// Horários considerados noturnos
const NIGHT_SCHEDULES = {
  urban: '22h às 5h',
  rural: '21h às 5h'
};

// Características do trabalho noturno
const NIGHT_WORK_CHARACTERISTICS = [
  'Horário reduzido: 52min30s = 1 hora noturna',
  'Adicional sobre valor da hora normal',
  'Direito garantido pela CLT Art. 73',
  'Cumulativo com outros adicionais',
  'Base de cálculo: salário contratual',
  'Integra salário para fins previdenciários',
];

export function calculateAdicionalNoturno(input: AdicionalNoturnoInput): AdicionalNoturnoResult {
  const {
    salary,
    workType,
    hasNightWork,
    nightHours,
    totalWorkHours,
    calculationType,
    months = 1,
  } = input;

  if (!hasNightWork) {
    return {
      baseSalary: salary,
      additionalRate: 0,
      additionalValue: 0,
      totalSalary: salary,
      additionalPercentage: 0,
      details: {
        workType,
        isFullNight: false,
        nightHours: 0,
        totalWorkHours,
        nightSchedule: NIGHT_SCHEDULES[workType],
        hourValue: 0,
        nightHourValue: 0,
        proportionCalculation: 'Não há trabalho noturno',
        legalBasis: 'CLT Art. 73',
        characteristics: [],
      },
    };
  }

  const additionalRate = NIGHT_ADDITIONAL_RATES[workType];
  const isFullNight = nightHours >= totalWorkHours;

  // Calcula o valor da hora normal
  const hourValue = salary / totalWorkHours;
  
  // Calcula o valor da hora noturna (hora normal + adicional)
  const nightHourValue = hourValue * (1 + additionalRate / 100);
  
  let additionalValue = 0;
  let proportionalRate: number | undefined;

  if (calculationType === 'proportional' && !isFullNight) {
    // Cálculo proporcional: apenas as horas noturnas recebem o adicional
    const additionalPerHour = hourValue * (additionalRate / 100);
    additionalValue = additionalPerHour * nightHours;
    proportionalRate = (nightHours / totalWorkHours) * additionalRate;
  } else {
    // Adicional integral: aplica o adicional sobre todo o salário
    additionalValue = (salary * additionalRate) / 100;
  }

  // Aplicar multiplicador de meses se necessário
  const finalAdditionalValue = additionalValue * months;
  const finalSalary = salary * months;
  const totalSalary = finalSalary + finalAdditionalValue;

  const proportionCalculation = calculationType === 'proportional' && !isFullNight
    ? `(${nightHours}h × R$ ${(hourValue * (additionalRate / 100)).toFixed(2)}) = R$ ${additionalValue.toFixed(2)}`
    : `${additionalRate}% sobre o salário base`;

  return {
    baseSalary: finalSalary,
    additionalRate,
    additionalValue: finalAdditionalValue,
    proportionalRate,
    totalSalary,
    additionalPercentage: (finalAdditionalValue / finalSalary) * 100,
    details: {
      workType,
      isFullNight,
      nightHours,
      totalWorkHours,
      nightSchedule: NIGHT_SCHEDULES[workType],
      hourValue,
      nightHourValue,
      proportionCalculation,
      legalBasis: 'CLT Art. 73 - Decreto-Lei 5.452/43',
      characteristics: NIGHT_WORK_CHARACTERISTICS,
    },
  };
}

export function formatAdicionalNoturnoReport(result: AdicionalNoturnoResult, input: AdicionalNoturnoInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE ADICIONAL NOTURNO

DADOS INFORMADOS:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Tipo de Trabalho: ${input.workType === 'urban' ? 'Urbano' : 'Rural'}
- Trabalho Noturno: ${input.hasNightWork ? 'Sim' : 'Não'}
- Horas Noturnas: ${details.nightHours}h
- Total de Horas Trabalhadas: ${details.totalWorkHours}h
- Tipo de Cálculo: ${input.calculationType === 'proportional' ? 'Proporcional' : 'Mensal'}

CÁLCULO DO ADICIONAL:
- Horário Noturno: ${details.nightSchedule}
- Taxa do Adicional: ${result.additionalRate}%
- ${details.proportionCalculation}
- Valor do Adicional: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

VALORES POR HORA:
- Valor Hora Normal: ${details.hourValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Valor Hora Noturna: ${details.nightHourValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

RESULTADO:
- Salário Base: ${result.baseSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Adicional Noturno: ${result.additionalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Salário Total: ${result.totalSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

CARACTERÍSTICAS DO TRABALHO NOTURNO:
${details.characteristics.map(characteristic => `• ${characteristic}`).join('\n')}

BASE LEGAL:
- ${details.legalBasis}
- Urbano: 20% das 22h às 5h
- Rural: 25% das 21h às 5h
- Hora noturna reduzida: 52min30s

OBSERVAÇÕES:
- Adicional sobre valor da hora normal
- Cumulativo com outros adicionais
- Hora noturna tem duração reduzida
- Consulte um advogado trabalhista para casos específicos

* Cálculo baseado na legislação trabalhista brasileira
* Valores podem variar conforme convenção coletiva
`.trim();
}