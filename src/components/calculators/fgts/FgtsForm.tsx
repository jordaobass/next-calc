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
import { fgtsInputSchema, FGTSInput } from '@/lib/validations/calculator-schemas';
import { Calculator } from 'lucide-react';

interface FgtsFormProps {
  onCalculate: (data: FGTSInput) => void;
  loading?: boolean;
}

export function FgtsForm({ onCalculate, loading = false }: FgtsFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(fgtsInputSchema),
    defaultValues: {
      salary: 0,
      admissionDate: new Date('2023-01-01'),
      referenceDate: new Date(),
      currentBalance: 0,
      averageSalary: 0,
      includeBonus13th: true,
      includeVacationBonus: true,
    },
    mode: 'onChange',
  });

  const salary = watch('salary');

  const onSubmit = (data: any) => {
    onCalculate(data as FGTSInput);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-600" />
          Calcular FGTS
        </CardTitle>
        <CardDescription>
          Preencha os dados para calcular o saldo do FGTS e simular saques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="salary"
              control={control}
              render={({ field, fieldState }) => (
                <CurrencyInput
                  label="Salário Atual *"
                  value={(field.value ?? 0).toString()}
                  onChange={(value) => field.onChange(parseFloat(value) || 0)}
                  required
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="averageSalary"
              control={control}
              render={({ field, fieldState }) => (
                <CurrencyInput
                  label="Salário Médio (opcional)"
                  value={(field.value ?? 0).toString()}
                  onChange={(value) => field.onChange(parseFloat(value) || 0)}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="admissionDate"
              control={control}
              render={({ field, fieldState }) => (
                <DateInput
                  label="Data de Admissão *"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={fieldState.error?.message}
                  max={new Date().toISOString().split('T')[0]}
                />
              )}
            />

            <Controller
              name="referenceDate"
              control={control}
              render={({ field, fieldState }) => (
                <DateInput
                  label="Data de Referência *"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="currentBalance"
            control={control}
            render={({ field, fieldState }) => (
              <CurrencyInput
                label="Saldo Atual FGTS (opcional)"
                value={(field.value ?? 0).toString()}
                onChange={(value) => field.onChange(parseFloat(value) || 0)}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Configurações Avançadas */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full"
            >
              {showAdvanced ? 'Ocultar' : 'Mostrar'} Configurações Avançadas
            </Button>

            {showAdvanced && (
              <div className="space-y-4 border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="includeBonus13th"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Input
                          id="includeBonus13th"
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="includeBonus13th">
                          Incluir 13º Salário no cálculo
                        </Label>
                      </div>
                    )}
                  />

                  <Controller
                    name="includeVacationBonus"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Input
                          id="includeVacationBonus"
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="includeVacationBonus">
                          Incluir 1/3 de Férias no cálculo
                        </Label>
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Dica:</strong> O FGTS é depositado mensalmente pelo empregador 
              no valor de 8% do salário bruto. Se você não souber o saldo atual, 
              deixe em branco para calcular uma estimativa.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !salary}
          >
            {loading ? 'Calculando...' : 'Calcular FGTS'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}