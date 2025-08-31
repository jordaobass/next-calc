/**
 * Cálculos de Seguro Desemprego baseados na Lei 7.998/90
 * Atualizado para 2024
 */

export interface SeguroDesempregoInput {
  averageSalary: number;
  monthsWorked: number;
  previousRequests: number;
  dismissalReason: 'dismissal_without_cause' | 'indirect_dismissal' | 'end_of_contract';
  hasWorkingCard: boolean;
  hasPreviousCLTExperience: boolean;
  calculationType: 'simple' | 'detailed';
}

export interface SeguroDesempregoResult {
  isEligible: boolean;
  parcelsQuantity: number;
  parcels: {
    parcel: number;
    value: number;
    paymentMonth: string;
  }[];
  totalValue: number;
  averageSalary: number;
  details: {
    monthsWorked: number;
    previousRequests: number;
    minimumMonthsRequired: number;
    dismissalReason: string;
    eligibilityRules: string[];
    disqualificationReasons: string[];
    legalBasis: string;
    requirements: string[];
  };
}

// Salário mínimo nacional 2024
const MINIMUM_WAGE_2024 = 1412;

// Teto do seguro desemprego 2024
const MAX_UNEMPLOYMENT_BENEFIT = 2313.74;

// Requisitos por número de solicitações anteriores
const MINIMUM_MONTHS_REQUIREMENTS = {
  0: 12, // Primeira solicitação: 12 meses nos últimos 18 meses
  1: 9,  // Segunda solicitação: 9 meses nos últimos 12 meses
  2: 6   // Terceira+ solicitação: 6 meses nos últimos 6 meses
};

// Número de parcelas por tempo trabalhado
const PARCEL_CALCULATION = [
  { minMonths: 6, maxMonths: 11, parcels: 3 },
  { minMonths: 12, maxMonths: 23, parcels: 4 },
  { minMonths: 24, maxMonths: Infinity, parcels: 5 }
];

const DISMISSAL_REASONS = {
  'dismissal_without_cause': 'Demissão sem Justa Causa',
  'indirect_dismissal': 'Rescisão Indireta',
  'end_of_contract': 'Fim de Contrato por Prazo Determinado'
};

const REQUIREMENTS = [
  'Ter sido dispensado sem justa causa ou rescisão indireta',
  'Possuir carteira de trabalho registrada',
  'Ter tempo mínimo de trabalho conforme solicitações anteriores',
  'Não estar recebendo auxílio-doença ou aposentadoria',
  'Não possuir renda própria suficiente para manutenção própria e familiar'
];

const ELIGIBILITY_RULES = [
  'Primeira solicitação: 12 meses trabalhados nos últimos 18 meses',
  'Segunda solicitação: 9 meses trabalhados nos últimos 12 meses',  
  'Terceira solicitação: 6 meses trabalhados nos últimos 6 meses'
];

const DISQUALIFICATION_REASONS = [
  'Demissão por justa causa',
  'Pedido de demissão',
  'Recebimento de benefício previdenciário',
  'Renda própria de qualquer natureza suficiente',
  'Recusa de emprego adequado'
];

function calculateParcelValue(averageSalary: number): number {
  // Cálculo conforme Decreto 10.283/20
  if (averageSalary <= MINIMUM_WAGE_2024) {
    return averageSalary;
  }
  
  if (averageSalary <= MINIMUM_WAGE_2024 * 1.5) {
    return MINIMUM_WAGE_2024 + (averageSalary - MINIMUM_WAGE_2024) * 0.8;
  }
  
  const baseValue = MINIMUM_WAGE_2024 + (MINIMUM_WAGE_2024 * 0.5) * 0.8;
  const excessValue = (averageSalary - MINIMUM_WAGE_2024 * 1.5) * 0.5;
  const calculatedValue = baseValue + excessValue;
  
  return Math.min(calculatedValue, MAX_UNEMPLOYMENT_BENEFIT);
}

function calculateParcelsQuantity(monthsWorked: number): number {
  for (const range of PARCEL_CALCULATION) {
    if (monthsWorked >= range.minMonths && monthsWorked <= range.maxMonths) {
      return range.parcels;
    }
  }
  return 3; // Minimum parcels
}

function getMinimumMonthsRequired(previousRequests: number): number {
  if (previousRequests >= 2) return MINIMUM_MONTHS_REQUIREMENTS[2];
  return MINIMUM_MONTHS_REQUIREMENTS[previousRequests as 0 | 1] || MINIMUM_MONTHS_REQUIREMENTS[2];
}

function generatePaymentSchedule(parcelsQuantity: number, parcelValue: number): Array<{parcel: number, value: number, paymentMonth: string}> {
  const parcels = [];
  const currentDate = new Date();
  
  for (let i = 1; i <= parcelsQuantity; i++) {
    const paymentDate = new Date(currentDate);
    paymentDate.setMonth(paymentDate.getMonth() + i);
    
    parcels.push({
      parcel: i,
      value: parcelValue,
      paymentMonth: paymentDate.toLocaleDateString('pt-BR', { 
        month: 'long', 
        year: 'numeric' 
      })
    });
  }
  
  return parcels;
}

export function calculateSeguroDesemprego(input: SeguroDesempregoInput): SeguroDesempregoResult {
  const {
    averageSalary,
    monthsWorked,
    previousRequests,
    dismissalReason,
    hasWorkingCard,
    hasPreviousCLTExperience,
  } = input;

  const minimumMonthsRequired = getMinimumMonthsRequired(previousRequests);
  
  // Verificar elegibilidade
  let isEligible = true;
  const disqualificationReasons: string[] = [];

  // Verificar se tem carteira de trabalho
  if (!hasWorkingCard) {
    isEligible = false;
    disqualificationReasons.push('Não possui carteira de trabalho registrada');
  }

  // Verificar motivo da demissão
  if (!['dismissal_without_cause', 'indirect_dismissal', 'end_of_contract'].includes(dismissalReason)) {
    isEligible = false;
    disqualificationReasons.push('Motivo da demissão não elegível');
  }

  // Verificar tempo mínimo trabalhado
  if (monthsWorked < minimumMonthsRequired) {
    isEligible = false;
    disqualificationReasons.push(`Tempo trabalhado insuficiente (mínimo ${minimumMonthsRequired} meses)`);
  }

  // Se não elegível, retornar resultado sem benefício
  if (!isEligible) {
    return {
      isEligible: false,
      parcelsQuantity: 0,
      parcels: [],
      totalValue: 0,
      averageSalary,
      details: {
        monthsWorked,
        previousRequests,
        minimumMonthsRequired,
        dismissalReason: DISMISSAL_REASONS[dismissalReason],
        eligibilityRules: ELIGIBILITY_RULES,
        disqualificationReasons,
        legalBasis: 'Lei 7.998/90 - Decreto 10.283/20',
        requirements: REQUIREMENTS,
      },
    };
  }

  // Calcular benefício
  const parcelsQuantity = calculateParcelsQuantity(monthsWorked);
  const parcelValue = calculateParcelValue(averageSalary);
  const parcels = generatePaymentSchedule(parcelsQuantity, parcelValue);
  const totalValue = parcelValue * parcelsQuantity;

  return {
    isEligible: true,
    parcelsQuantity,
    parcels,
    totalValue,
    averageSalary,
    details: {
      monthsWorked,
      previousRequests,
      minimumMonthsRequired,
      dismissalReason: DISMISSAL_REASONS[dismissalReason],
      eligibilityRules: ELIGIBILITY_RULES,
      disqualificationReasons: [],
      legalBasis: 'Lei 7.998/90 - Decreto 10.283/20',
      requirements: REQUIREMENTS,
    },
  };
}

export function formatSeguroDesempregoReport(result: SeguroDesempregoResult, input: SeguroDesempregoInput): string {
  const { details } = result;
  
  if (!result.isEligible) {
    return `
RELATÓRIO DE SEGURO DESEMPREGO - NÃO ELEGÍVEL

DADOS INFORMADOS:
- Salário Médio: ${result.averageSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Meses Trabalhados: ${details.monthsWorked} meses
- Solicitações Anteriores: ${details.previousRequests}
- Motivo da Demissão: ${details.dismissalReason}

ANÁLISE DE ELEGIBILIDADE:
❌ NÃO ELEGÍVEL PARA SEGURO DESEMPREGO

MOTIVOS DA INELEGIBILIDADE:
${details.disqualificationReasons.map(reason => `• ${reason}`).join('\n')}

REQUISITOS PARA ELEGIBILIDADE:
${details.requirements.map(req => `• ${req}`).join('\n')}

BASE LEGAL:
- ${details.legalBasis}
- Resolução CODEFAT nº 467/05

* Consulte o SINE ou Ministério do Trabalho para orientações específicas
`.trim();
  }

  return `
RELATÓRIO DE SEGURO DESEMPREGO

DADOS INFORMADOS:
- Salário Médio: ${result.averageSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Meses Trabalhados: ${details.monthsWorked} meses
- Solicitações Anteriores: ${details.previousRequests}
- Motivo da Demissão: ${details.dismissalReason}

ELEGIBILIDADE:
✅ ELEGÍVEL PARA SEGURO DESEMPREGO

BENEFÍCIO CONCEDIDO:
- Número de Parcelas: ${result.parcelsQuantity}
- Valor por Parcela: ${result.parcels[0]?.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- Valor Total: ${result.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}

CRONOGRAMA DE PAGAMENTOS:
${result.parcels.map(parcel => 
  `${parcel.parcel}ª Parcela: ${parcel.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} - ${parcel.paymentMonth}`
).join('\n')}

REGRAS DE ELEGIBILIDADE:
${details.eligibilityRules.map(rule => `• ${rule}`).join('\n')}

REQUISITOS ATENDIDOS:
${details.requirements.map(req => `• ${req}`).join('\n')}

BASE LEGAL:
- ${details.legalBasis}
- Resolução CODEFAT nº 467/05
- Teto máximo: R$ 2.313,74 (2024)

OBSERVAÇÕES:
- Benefício pago mensalmente pela Caixa Econômica Federal
- Prazo para solicitação: até 120 dias da demissão
- Necessário comparecimento ao SINE para retirada das parcelas
- Consulte o SINE ou app Carteira de Trabalho Digital

* Simulação baseada na legislação vigente em 2024
`.trim();
}