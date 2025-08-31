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
import { thirteenthSalaryInputSchema, ThirteenthSalaryInput } from '@/lib/validations/calculator-schemas';
import { Gift } from 'lucide-react';

interface DecimoTerceiroFormProps {
  onCalculate: (data: ThirteenthSalaryInput) => void;
  loading?: boolean;
}

export function DecimoTerceiroForm({ onCalculate, loading }: DecimoTerceiroFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculationType, setCalculationType] = useState<'automatic' | 'manual'>('automatic');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(thirteenthSalaryInputSchema),
    defaultValues: {
      salary: 1412, // Valor padrão com salário mínimo 2024
      admissionDate: new Date('2024-01-01'),
      referenceDate: new Date(),
      dependents: 0,
      advanceReceived: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    onCalculate(data as ThirteenthSalaryInput);
  };

  const currentYear = new Date().getFullYear();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-emerald-600" />
          Dados do 13º Salário
        </CardTitle>
        <CardDescription>
          Preencha as informações para calcular seu 13º salário
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
              name="referenceDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  label="Data de Referência"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : (field.value?.toString() || '')}
                  onChange={(value) => field.onChange(new Date(value))}
                  required
                  error={errors.referenceDate?.message}
                  max={new Date().toISOString().split('T')[0]}
                />
              )}
            />
          </div>

          {/* Tipo de Cálculo */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Tipo de Cálculo</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-colors ${
                  calculationType === 'automatic' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:bg-muted/50'
                }`}
                onClick={() => setCalculationType('automatic')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="automatic"
                      checked={calculationType === 'automatic'}
                      onChange={() => setCalculationType('automatic')}
                      className="text-emerald-600"
                    />
                    <div>
                      <Label htmlFor="automatic" className="font-medium cursor-pointer">
                        Cálculo Automático
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Baseado nas datas de admissão e referência
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-colors ${
                  calculationType === 'manual' ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:bg-muted/50'
                }`}
                onClick={() => setCalculationType('manual')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="manual"
                      checked={calculationType === 'manual'}
                      onChange={() => setCalculationType('manual')}
                      className="text-emerald-600"
                    />
                    <div>
                      <Label htmlFor="manual" className="font-medium cursor-pointer">
                        Informar Meses
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Informar diretamente os meses trabalhados
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Datas ou Meses */}
          {calculationType === 'automatic' ? (
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

              <div className="space-y-2">
                <Label>Ano de Referência</Label>
                <Input
                  type="text"
                  value={currentYear}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Calculando 13º do ano {currentYear}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="workedMonths"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Meses Trabalhados em {currentYear}
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      placeholder="12"
                    />
                    <p className="text-xs text-muted-foreground">
                      Informe quantos meses trabalhou no ano
                    </p>
                    {errors.workedMonths && (
                      <p className="text-sm text-red-500">{errors.workedMonths.message}</p>
                    )}
                  </div>
                )}
              />

              <div className="space-y-2">
                <Label>Informação</Label>
                <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <p className="font-medium">💡 Dica:</p>
                  <p>Fração de 15 dias ou mais = 1 mês completo de 13º salário</p>
                </div>
              </div>
            </div>
          )}

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
              name="advanceReceived"
              control={control}
              render={({ field }) => (
                <CurrencyInput
                  label="Adiantamento Recebido"
                  value={(field.value ?? 0).toString()}
                  onChange={(value) => field.onChange(parseFloat(value) || 0)}
                  error={errors.advanceReceived?.message}
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
                  Para salários variáveis, informe a média dos últimos 12 meses. 
                  Deixe em branco se o salário é fixo.
                </p>
              </div>
            )}
          </div>

          {/* Informações do Pagamento */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">📅 Prazos de Pagamento {currentYear}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <p className="font-medium">1ª Parcela (Adiantamento)</p>
                <p>Até 30 de novembro de {currentYear}</p>
                <p className="text-xs">50% do 13º sem descontos</p>
              </div>
              <div>
                <p className="font-medium">2ª Parcela (Complemento)</p>
                <p>Até 20 de dezembro de {currentYear}</p>
                <p className="text-xs">Restante com descontos de INSS e IRRF</p>
              </div>
            </div>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={loading || !isValid}
          >
            {loading ? 'Calculando...' : 'Calcular 13º Salário'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}