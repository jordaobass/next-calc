'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Calculator, Info } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { irrfInputSchema, IRRFInput } from '@/lib/validations/irrf-schema';
import { calculateINSSForIRRF } from '@/lib/calculations/irrf';

interface IRRFFormProps {
  onCalculate: (data: IRRFInput) => void;
  loading?: boolean;
}

export function IRRFForm({ onCalculate, loading }: IRRFFormProps) {
  const [autoCalculateINSS, setAutoCalculateINSS] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<IRRFInput>({
    resolver: zodResolver(irrfInputSchema),
    defaultValues: {
      salary: 1412,
      dependents: 0,
      inssDiscount: 0,
      otherDeductions: 0,
      pensionAlimony: 0,
      calculationType: 'monthly',
      months: 12,
    },
    mode: 'onChange',
  });

  const salary = watch('salary');
  const calculationType = watch('calculationType');
  const needsMonths = calculationType === 'annual' || calculationType === 'projection';

  // Auto-calcular INSS quando salário muda
  const handleSalaryChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setValue('salary', numValue);
    
    if (autoCalculateINSS && numValue > 0) {
      const inssValue = calculateINSSForIRRF(numValue);
      setValue('inssDiscount', inssValue);
    }
  };

  const onSubmit = (data: IRRFInput) => {
    onCalculate(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Calculadora de IRRF 2024
        </CardTitle>
        <CardDescription>
          Calcule o Imposto de Renda Retido na Fonte com a tabela atualizada para 2024
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
                    onChange={handleSalaryChange}
                    required
                    error={errors.salary?.message}
                  />
                )}
              />

              <Controller
                name="dependents"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Número de Dependentes
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      R$ 189,59 de dedução por dependente
                    </p>
                    {errors.dependents && (
                      <p className="text-sm text-red-500">{errors.dependents.message}</p>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {needsMonths && (
                <Controller
                  name="months"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
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
          </div>

          {/* Deduções */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Deduções Permitidas</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="autoCalculateINSS"
                  checked={autoCalculateINSS}
                  onChange={(e) => setAutoCalculateINSS(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="autoCalculateINSS">
                  Calcular INSS automaticamente
                </Label>
              </div>

              <Controller
                name="inssDiscount"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Desconto INSS"
                    value={(field.value ?? 0).toString()}
                    onChange={(value) => field.onChange(parseFloat(value) || 0)}
                    error={errors.inssDiscount?.message}
                    disabled={autoCalculateINSS}
                  />
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="otherDeductions"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        label="Outras Deduções"
                        value={(field.value ?? 0).toString()}
                        onChange={(value) => field.onChange(parseFloat(value) || 0)}
                        error={errors.otherDeductions?.message}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Previdência privada, plano de saúde, etc.
                      </p>
                    </div>
                  )}
                />

                <Controller
                  name="pensionAlimony"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <CurrencyInput
                        label="Pensão Alimentícia"
                        value={(field.value ?? 0).toString()}
                        onChange={(value) => field.onChange(parseFloat(value) || 0)}
                        error={errors.pensionAlimony?.message}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Valor pago por determinação judicial
                      </p>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Tabela IRRF 2024 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3">📋 Tabela IRRF 2024</h4>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-blue-700">Base de Cálculo</p>
                  <div className="space-y-1 text-blue-600">
                    <p>Até R$ 2.112,00</p>
                    <p>De R$ 2.112,01 a R$ 2.826,65</p>
                    <p>De R$ 2.826,66 a R$ 3.751,05</p>
                    <p>De R$ 3.751,06 a R$ 4.664,68</p>
                    <p>Acima de R$ 4.664,68</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Alíquota</p>
                  <div className="space-y-1 text-blue-600">
                    <p>Isento</p>
                    <p>7,5%</p>
                    <p>15,0%</p>
                    <p>22,5%</p>
                    <p>27,5%</p>
                  </div>
                </div>
              </div>
              <div className="border-t pt-2 mt-3">
                <p className="text-xs text-blue-600">
                  <strong>Dedução por dependente:</strong> R$ 189,59
                </p>
              </div>
            </div>
          </div>

          {/* Informações importantes */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Informações Importantes</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Tabela válida para 2024 conforme Receita Federal</li>
                  <li>• Base de cálculo = Salário - INSS - Dependentes - Outras deduções</li>
                  <li>• Alíquotas são progressivas com parcela a deduzir</li>
                  <li>• Dependentes: cônjuge, filhos até 21 anos ou estudantes até 24</li>
                </ul>
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
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Calcular IRRF
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}