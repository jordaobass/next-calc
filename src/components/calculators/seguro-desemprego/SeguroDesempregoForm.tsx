'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, Calculator, Info, AlertCircle } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { seguroDesempregoInputSchema, SeguroDesempregoInput } from '@/lib/validations/seguro-desemprego-schema';

interface SeguroDesempregoFormProps {
  onCalculate: (data: SeguroDesempregoInput) => void;
  loading?: boolean;
}

const dismissalReasons = [
  { value: 'dismissal_without_cause', label: 'Demissão sem Justa Causa' },
  { value: 'indirect_dismissal', label: 'Rescisão Indireta' },
  { value: 'end_of_contract', label: 'Fim de Contrato por Prazo Determinado' },
];

export function SeguroDesempregoForm({ onCalculate, loading }: SeguroDesempregoFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SeguroDesempregoInput>({
    resolver: zodResolver(seguroDesempregoInputSchema),
    defaultValues: {
      averageSalary: 1800,
      monthsWorked: 12,
      previousRequests: 0,
      dismissalReason: 'dismissal_without_cause',
      hasWorkingCard: true,
      hasPreviousCLTExperience: true,
      calculationType: 'simple',
    },
    mode: 'onChange',
  });

  const previousRequests = watch('previousRequests');
  const monthsWorked = watch('monthsWorked');

  const onSubmit = (data: SeguroDesempregoInput) => {
    onCalculate(data);
  };

  const getMinimumMonthsRequired = (requests: number) => {
    if (requests === 0) return 12;
    if (requests === 1) return 9; 
    return 6;
  };

  const minMonthsRequired = getMinimumMonthsRequired(previousRequests);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Banknote className="h-5 w-5 text-blue-600" />
          Calculadora de Seguro Desemprego
        </CardTitle>
        <CardDescription>
          Calcule as parcelas do seguro desemprego conforme a Lei 7.998/90
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Trabalhador</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="averageSalary"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Média Salarial (últimos 3 meses)"
                    value={(field.value ?? 0).toString()}
                    onChange={(value) => field.onChange(parseFloat(value) || 0)}
                    required
                    error={errors.averageSalary?.message}
                    description="Média dos últimos 3 salários recebidos"
                  />
                )}
              />

              <Controller
                name="monthsWorked"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Meses Trabalhados
                    </Label>
                    <Input
                      type="number"
                      min="6"
                      max="180"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      placeholder="12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Meses trabalhados no período de referência
                    </p>
                    {errors.monthsWorked && (
                      <p className="text-sm text-red-500">{errors.monthsWorked.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="previousRequests"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Solicitações Anteriores
                    </Label>
                    <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Primeira solicitação</SelectItem>
                        <SelectItem value="1">Segunda solicitação</SelectItem>
                        <SelectItem value="2">Terceira solicitação</SelectItem>
                        <SelectItem value="3">Quarta+ solicitação</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Quantas vezes já solicitou seguro desemprego
                    </p>
                    {errors.previousRequests && (
                      <p className="text-sm text-red-500">{errors.previousRequests.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="dismissalReason"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Motivo da Demissão
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {dismissalReasons.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.dismissalReason && (
                      <p className="text-sm text-red-500">{errors.dismissalReason.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Requisitos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Requisitos</h3>
            
            <div className="space-y-3">
              <Controller
                name="hasWorkingCard"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasWorkingCard"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded"
                    />
                    <Label htmlFor="hasWorkingCard">
                      Possui carteira de trabalho registrada
                    </Label>
                  </div>
                )}
              />

              <Controller
                name="hasPreviousCLTExperience"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasPreviousCLTExperience"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded"
                    />
                    <Label htmlFor="hasPreviousCLTExperience">
                      Possui experiência anterior com carteira assinada
                    </Label>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Aviso sobre tempo mínimo */}
          {monthsWorked < minMonthsRequired && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800">Tempo Insuficiente</h4>
                  <p className="text-sm text-red-700">
                    Para {previousRequests === 0 ? 'primeira' : previousRequests === 1 ? 'segunda' : 'terceira+'} solicitação,
                    é necessário ter trabalhado pelo menos <strong>{minMonthsRequired} meses</strong>.
                    Você informou apenas {monthsWorked} meses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Informações sobre Requisitos */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Requisitos por Solicitação
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div className="bg-white p-3 rounded">
                <h5 className="font-semibold mb-2">1ª SOLICITAÇÃO</h5>
                <p>12 meses trabalhados nos últimos 18 meses</p>
              </div>
              <div className="bg-white p-3 rounded">
                <h5 className="font-semibold mb-2">2ª SOLICITAÇÃO</h5>
                <p>9 meses trabalhados nos últimos 12 meses</p>
              </div>
              <div className="bg-white p-3 rounded">
                <h5 className="font-semibold mb-2">3ª+ SOLICITAÇÃO</h5>
                <p>6 meses trabalhados nos últimos 6 meses</p>
              </div>
            </div>
          </div>

          {/* Informações Importantes */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">📋 Informações Importantes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Prazo:</strong> Até 120 dias após a demissão para solicitar</li>
              <li>• <strong>Pagamento:</strong> Caixa Econômica Federal mensalmente</li>
              <li>• <strong>Teto:</strong> R$ 2.313,74 (valor máximo da parcela em 2024)</li>
              <li>• <strong>Solicitação:</strong> SINE, app Carteira de Trabalho Digital ou site gov.br</li>
              <li>• <strong>Documentos:</strong> RG, CPF, carteira de trabalho e termo de rescisão</li>
            </ul>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading || !isValid}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Calcular Seguro Desemprego
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}