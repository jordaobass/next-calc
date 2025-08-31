/**
 * Cálculos de Horas Extras baseados na CLT
 * Atualizado para 2024
 */

export interface HorasExtrasInput {
  salary: number;
  hoursPerDay: number;
  daysPerWeek: number;
  extraHours: number;
  extraHoursSunday: number;
  extraHoursHoliday: number;
  hasNightShift: boolean;
  nightHours?: number;
}

export interface HorasExtrasResult {
  baseHourValue: number;
  regularExtraValue: number; // 50%
  sundayExtraValue: number; // 100%
  holidayExtraValue: number; // 100%
  nightExtraValue: number; // 20% adicional noturno
  totalExtraHours: number;
  totalExtraValue: number;
  dsrValue: number; // Descanso Semanal Remunerado
  totalWithDSR: number;
  details: {
    regularHours: number;
    sundayHours: number;
    holidayHours: number;
    nightHours: number;
    calculations: {
      regular: { hours: number; rate: number; value: number };
      sunday: { hours: number; rate: number; value: number };
      holiday: { hours: number; rate: number; value: number };
      night: { hours: number; rate: number; value: number };
      dsr: { percentage: number; value: number };
    };
  };
}

export function calculateHorasExtras(input: HorasExtrasInput): HorasExtrasResult {
  const {
    salary,
    hoursPerDay,
    daysPerWeek,
    extraHours,
    extraHoursSunday,
    extraHoursHoliday,
    hasNightShift,
    nightHours = 0,
  } = input;

  // Calcular valor da hora normal
  const monthlyHours = (hoursPerDay * daysPerWeek * 52) / 12; // Horas mensais médias
  const baseHourValue = salary / monthlyHours;

  // Calcular valores das horas extras
  const regularExtraRate = 1.5; // 50% adicional
  const sundayHolidayExtraRate = 2.0; // 100% adicional
  const nightExtraRate = 1.2; // 20% adicional noturno

  const regularExtraValue = extraHours * baseHourValue * regularExtraRate;
  const sundayExtraValue = extraHoursSunday * baseHourValue * sundayHolidayExtraRate;
  const holidayExtraValue = extraHoursHoliday * baseHourValue * sundayHolidayExtraRate;
  const nightExtraValue = hasNightShift 
    ? nightHours * baseHourValue * nightExtraRate 
    : 0;

  const totalExtraHours = extraHours + extraHoursSunday + extraHoursHoliday + (hasNightShift ? nightHours : 0);
  const totalExtraValue = regularExtraValue + sundayExtraValue + holidayExtraValue + nightExtraValue;

  // Calcular DSR (Descanso Semanal Remunerado)
  // DSR = (Valor das horas extras / dias úteis) × domingos e feriados
  const workDaysPerWeek = daysPerWeek;
  const restDaysPerWeek = 7 - workDaysPerWeek;
  const dsrPercentage = restDaysPerWeek / workDaysPerWeek;
  const dsrValue = totalExtraValue * dsrPercentage;

  const totalWithDSR = totalExtraValue + dsrValue;

  return {
    baseHourValue,
    regularExtraValue,
    sundayExtraValue,
    holidayExtraValue,
    nightExtraValue,
    totalExtraHours,
    totalExtraValue,
    dsrValue,
    totalWithDSR,
    details: {
      regularHours: extraHours,
      sundayHours: extraHoursSunday,
      holidayHours: extraHoursHoliday,
      nightHours: hasNightShift ? nightHours : 0,
      calculations: {
        regular: {
          hours: extraHours,
          rate: regularExtraRate,
          value: regularExtraValue,
        },
        sunday: {
          hours: extraHoursSunday,
          rate: sundayHolidayExtraRate,
          value: sundayExtraValue,
        },
        holiday: {
          hours: extraHoursHoliday,
          rate: sundayHolidayExtraRate,
          value: holidayExtraValue,
        },
        night: {
          hours: hasNightShift ? nightHours : 0,
          rate: nightExtraRate,
          value: nightExtraValue,
        },
        dsr: {
          percentage: dsrPercentage,
          value: dsrValue,
        },
      },
    },
  };
}

export function formatExtraHoursReport(result: HorasExtrasResult, input: HorasExtrasInput): string {
  const { details } = result;
  
  return `
RELATÓRIO DE HORAS EXTRAS

DADOS INFORMADOS:
- Salário Base: ${input.salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Horas/dia: ${input.hoursPerDay}h
- Dias/semana: ${input.daysPerWeek}
- Valor da Hora: ${result.baseHourValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

HORAS EXTRAS CALCULADAS:
${details.regularHours > 0 ? `- Horas extras normais (50%): ${details.regularHours}h × ${details.calculations.regular.rate} = ${details.calculations.regular.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
${details.sundayHours > 0 ? `- Horas extras domingos (100%): ${details.sundayHours}h × ${details.calculations.sunday.rate} = ${details.calculations.sunday.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
${details.holidayHours > 0 ? `- Horas extras feriados (100%): ${details.holidayHours}h × ${details.calculations.holiday.rate} = ${details.calculations.holiday.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}
${details.nightHours > 0 ? `- Adicional noturno (20%): ${details.nightHours}h × ${details.calculations.night.rate} = ${details.calculations.night.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}` : ''}

TOTAL HORAS EXTRAS: ${result.totalExtraValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
DSR s/ Horas Extras: ${result.dsrValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

VALOR TOTAL: ${result.totalWithDSR.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

* Cálculo baseado na CLT - Artigos 59 a 61
* Consulte um advogado trabalhista para casos específicos
`.trim();
}