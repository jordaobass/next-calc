'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Calculator } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { inssInputSchema, INSSInput } from '@/lib/validations/inss-schema';

interface INSSFormProps {
  onCalculate: (data: INSSInput) => void;
  loading?: boolean;
}

export function INSSForm({ onCalculate, loading }: INSSFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<INSSInput>({
    resolver: zodResolver(inssInputSchema),
    defaultValues: {
      salary: 1412, // Valor padrão com salário mínimo 2024
      hasMultipleJobs: false,
      otherJobsSalary: 0,
      calculationType: 'monthly',
      months: 12,
    },
    mode: 'onChange',
  });

  const hasMultipleJobs = watch('hasMultipleJobs');
  const calculationType = watch('calculationType');
  const needsMonths = calculationType === 'annual' || calculationType === 'projection';

  const onSubmit = (data: INSSInput) => {
    onCalculate(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-600" />
          Calculadora de INSS 2024
        </CardTitle>
        <CardDescription>
          Calcule o desconto do INSS com a tabela atualizada para 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Salário</h3>
            
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
                name="calculationType"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Tipo de Cálculo
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="annual">Anual (12 meses)</SelectItem>
                        <SelectItem value="projection">Projeção (X meses)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.calculationType && (
                      <p className="text-sm text-red-500">{errors.calculationType.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {needsMonths && (
              <Controller
                name="months"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2 max-w-xs">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Número de Meses
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="60"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      placeholder="12"
                    />
                    {errors.months && (
                      <p className="text-sm text-red-500">{errors.months.message}</p>
                    )}
                  </div>
                )}
              />
            )}
          </div>

          {/* Múltiplos Empregos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Outros Empregos</h3>
            
            <Controller
              name="hasMultipleJobs"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasMultipleJobs"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                  <Label htmlFor="hasMultipleJobs">
                    Possui outros empregos ou rendimentos
                  </Label>
                </div>
              )}
            />

            {hasMultipleJobs && (
              <Controller
                name="otherJobsSalary"
                control={control}
                render={({ field }) => (
                  <div className="max-w-md">
                    <CurrencyInput
                      label="Total dos Outros Salários"
                      value={(field.value ?? 0).toString()}
                      onChange={(value) => field.onChange(parseFloat(value) || 0)}
                      error={errors.otherJobsSalary?.message}
                      required={hasMultipleJobs}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Soma de todos os outros salários mensais
                    </p>
                  </div>
                )}
              />
            )}
          </div>

          {/* Tabela INSS 2024 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">📋 Tabela INSS 2024</h4>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-700">Faixa Salarial</p>
                  <div className="space-y-1 text-blue-600">
                    <p>Até R$ 1.412,00</p>
                    <p>De R$ 1.412,01 a R$ 2.666,68</p>
                    <p>De R$ 2.666,69 a R$ 4.000,03</p>
                    <p>De R$ 4.000,04 a R$ 7.786,02</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Alíquota</p>
                  <div className="space-y-1 text-blue-600">
                    <p>7,5%</p>
                    <p>9,0%</p>
                    <p>12,0%</p>
                    <p>14,0%</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-2 mt-3">
                <p className="text-xs text-blue-600">
                  <strong>Teto máximo:</strong> R$ 7.786,02 | <strong>Contribuição máxima:</strong> R$ 908,85
                </p>
              </div>
            </div>
          </div>

          {/* Informações importantes */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Informações Importantes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Tabela válida para 2024 conforme Portaria Interministerial</li>
              <li>• Para múltiplos empregos, o desconto é limitado ao teto global</li>
              <li>• Valores acima do teto não sofrem desconto adicional</li>
              <li>• Alíquotas são progressivas (por faixa salarial)</li>
            </ul>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
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
                Calcular INSS
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}