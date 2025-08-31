'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from '../shared/CurrencyInput';
import { DateInput } from '../shared/DateInput';
import { rescissionInputSchema, RescissionInput } from '@/lib/validations/calculator-schemas';
import { RESCISSION_TYPES } from '@/lib/calculations/constants';
import { Calculator } from 'lucide-react';

interface RescisaoFormProps {
  onCalculate: (data: RescissionInput) => void;
  loading?: boolean;
}

const rescissionTypeLabels = {
  [RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE]: 'Demissão sem justa causa',
  [RESCISSION_TYPES.DISMISSAL_WITH_CAUSE]: 'Demissão com justa causa',
  [RESCISSION_TYPES.RESIGNATION]: 'Pedido de demissão',
  [RESCISSION_TYPES.MUTUAL_AGREEMENT]: 'Acordo mútuo',
  [RESCISSION_TYPES.END_OF_CONTRACT]: 'Fim do contrato',
} as const;

export function RescisaoForm({ onCalculate, loading }: RescisaoFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(rescissionInputSchema),
    defaultValues: {
      salary: 1412, // Valor padrão com salário mínimo 2024
      admissionDate: new Date('2023-01-01'),
      dismissalDate: new Date(),
      rescissionType: RESCISSION_TYPES.DISMISSAL_WITHOUT_CAUSE,
      dependents: 0,
      hasVacationPending: false,
      vacationDays: 0,
      has13thSalaryPending: false,
      workedMonths13th: 0,
      fgtsBalance: 0,
    },
    mode: 'onChange',
  });

  const hasVacationPending = watch('hasVacationPending');
  const has13thSalaryPending = watch('has13thSalaryPending');

  const onSubmit = (data: any) => {
    onCalculate(data as RescissionInput);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-600" />
          Dados da Rescisão
        </CardTitle>
        <CardDescription>
          Preencha as informações para calcular sua rescisão trabalhista
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
              name="rescissionType"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Tipo de Rescisão
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de rescisão" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(rescissionTypeLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.rescissionType && (
                    <p className="text-sm text-red-500">{errors.rescissionType.message}</p>
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
              name="dismissalDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  label="Data de Demissão"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={errors.dismissalDate?.message}
                  max={new Date().toISOString().split('T')[0]}
                />
              )}
            />
          </div>

          {/* Dependentes */}
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
              name="fgtsBalance"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  label="Saldo FGTS (atual)"
                  value={(field.value ?? 0).toString()}
                  onChange={(value) => field.onChange(parseFloat(value) || 0)}
                  error={errors.fgtsBalance?.message}
                />
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
                {/* Férias Pendentes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="hasVacationPending"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="hasVacationPending"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded"
                        />
                      )}
                    />
                    <Label htmlFor="hasVacationPending">Possui férias vencidas pendentes</Label>
                  </div>

                  {hasVacationPending && (
                    <Controller
                      name="vacationDays"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Dias de férias vencidas</Label>
                          <Input
                            type="number"
                            min="1"
                            max="30"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            placeholder="30"
                          />
                          {errors.vacationDays && (
                            <p className="text-sm text-red-500">{errors.vacationDays.message}</p>
                          )}
                        </div>
                      )}
                    />
                  )}
                </div>

                {/* 13º Salário Pendente */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="has13thSalaryPending"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="has13thSalaryPending"
                          checked={field.value}
                          onChange={field.onChange}
                          className="rounded"
                        />
                      )}
                    />
                    <Label htmlFor="has13thSalaryPending">Possui 13º salário do ano anterior pendente</Label>
                  </div>

                  {has13thSalaryPending && (
                    <Controller
                      name="workedMonths13th"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Meses trabalhados no ano anterior</Label>
                          <Input
                            type="number"
                            min="1"
                            max="12"
                            value={field.value || ''}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            placeholder="12"
                          />
                          {errors.workedMonths13th && (
                            <p className="text-sm text-red-500">{errors.workedMonths13th.message}</p>
                          )}
                        </div>
                      )}
                    />
                  )}
                </div>

                {/* Salário Médio */}
                <Controller
                  name="avgSalaryLast3Months"
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      label="Média salarial (últimos 3 meses)"
                      value={field.value?.toString() || '0'}
                      onChange={(value) => field.onChange(parseFloat(value) || undefined)}
                      error={errors.avgSalaryLast3Months?.message}
                    />
                  )}
                />
              </div>
            )}
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading || !isValid}
          >
            {loading ? 'Calculando...' : 'Calcular Rescisão'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}