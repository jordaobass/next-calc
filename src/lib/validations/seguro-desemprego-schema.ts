import { z } from 'zod';

export const seguroDesempregoInputSchema = z.object({
  averageSalary: z.number()
    .min(1320, 'Salário médio deve ser pelo menos o salário mínimo (R$ 1.320)')
    .max(50000, 'Salário muito alto para cálculo')
    .positive('Salário médio deve ser positivo'),
  
  monthsWorked: z.number()
    .min(12, 'Deve ter trabalhado pelo menos 12 meses')
    .max(180, 'Período muito longo para cálculo')
    .int('Meses deve ser um número inteiro'),
    
  previousRequests: z.number()
    .min(0, 'Número de solicitações anteriores não pode ser negativo')
    .max(10, 'Muitas solicitações anteriores')
    .int('Número de solicitações deve ser inteiro'),
  
  dismissalReason: z.enum(['dismissal_without_cause', 'indirect_dismissal', 'end_of_contract']),
  
  hasWorkingCard: z.boolean(),
  
  hasPreviousCLTExperience: z.boolean(),
  
  calculationType: z.enum(['simple', 'detailed']),
});

export type SeguroDesempregoInput = z.infer<typeof seguroDesempregoInputSchema>;