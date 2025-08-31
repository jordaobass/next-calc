'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '../shared/CurrencyInput';
import { DateInput } from '../shared/DateInput';
import { vacationInputSchema, VacationInput } from '@/lib/validations/calculator-schemas';
import { Calendar } from 'lucide-react';

interface FeriasFormProps {
  onCalculate: (data: VacationInput) => void;
  loading?: boolean;
}

export function FeriasForm({ onCalculate, loading }: FeriasFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(vacationInputSchema),
    defaultValues: {
      salary: 0,
      admissionDate: new Date('2023-01-01'),
      vacationStartDate: new Date(),
      vacationDays: 30,
      dependents: 0,
      sellDays: 0,
    },
    mode: 'onChange',
  });

  const vacationDays = watch('vacationDays');

  const onSubmit = (data: any) => {
    onCalculate(data as VacationInput);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-600" />
          Dados das Férias
        </CardTitle>
        <CardDescription>
          Preencha as informações para calcular suas férias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  label="Salário Bruto Mensal"
                  value={(field.value ?? 0).toString()}
                  onChange={(value) => field.onChange(parseFloat(value) || 0)}
                  required
                  error={errors.salary?.message}
                />
              )}
            />

            <Controller
              name="vacationDays"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Dias de Férias
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="30"
                    value={field.value ?? 30}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                    placeholder="30"
                  />
                  {errors.vacationDays && (
                    <p className="text-sm text-red-500">{errors.vacationDays.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="admissionDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  label="Data de Admissão"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={errors.admissionDate?.message}
                  max={new Date().toISOString().split('T')[0]}
                />
              )}
            />

            <Controller
              name="vacationStartDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  label="Data de Início das Férias"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={errors.vacationStartDate?.message}
                  min={new Date().toISOString().split('T')[0]}
                />
              )}
            />
          </div>

          {/* Dependentes e Venda de Dias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="dependents"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Número de Dependentes (para IRRF)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {errors.dependents && (
                    <p className="text-sm text-red-500">{errors.dependents.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="sellDays"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Dias a Vender (máx. 10)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Você pode vender até 10 dias (1/3 das férias)
                  </p>
                  {errors.sellDays && (
                    <p className="text-sm text-red-500">{errors.sellDays.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Configurações Avançadas */}
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mb-4"
            >
              {showAdvanced ? 'Ocultar' : 'Mostrar'} Configurações Avançadas
            </Button>

            {showAdvanced && (
              <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                <Controller
                  name="averageSalary"
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      label="Média salarial (últimos 12 meses)"
                      value={(field.value ?? 0).toString()}
                      onChange={(value) => field.onChange(parseFloat(value) || undefined)}
                      error={errors.averageSalary?.message}
                    />
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  Deixe em branco se o salário não é variável. Para salários variáveis, 
                  informe a média dos últimos 12 meses.
                </p>
              </div>
            )}
          </div>

          {/* Resumo da Solicitação */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Resumo da Solicitação</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Período de férias:</strong> {vacationDays} dias</p>
              <p><strong>Dias efetivos de descanso:</strong> {(vacationDays || 30) - (watch('sellDays') || 0)} dias</p>
              {(watch('sellDays') || 0) > 0 && (
                <p><strong>Dias vendidos:</strong> {watch('sellDays') || 0} dias (receberá em dinheiro)</p>
              )}
            </div>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading || !isValid}
          >
            {loading ? 'Calculando...' : 'Calcular Férias'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}