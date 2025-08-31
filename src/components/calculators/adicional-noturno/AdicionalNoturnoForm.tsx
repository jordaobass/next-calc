'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Moon, Calculator, Info, Clock } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { adicionalNoturnoInputSchema, AdicionalNoturnoInput } from '@/lib/validations/adicional-noturno-schema';

interface AdicionalNoturnoFormProps {
  onCalculate: (data: AdicionalNoturnoInput) => void;
  loading?: boolean;
}

export function AdicionalNoturnoForm({ onCalculate, loading }: AdicionalNoturnoFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AdicionalNoturnoInput>({
    resolver: zodResolver(adicionalNoturnoInputSchema),
    defaultValues: {
      salary: 1412,
      workType: 'urban',
      hasNightWork: false,
      nightHours: 0,
      totalWorkHours: 220,
      calculationType: 'monthly',
      months: 1,
    },
    mode: 'onChange',
  });

  const hasNightWork = watch('hasNightWork');
  const workType = watch('workType');
  const calculationType = watch('calculationType');

  const onSubmit = (data: AdicionalNoturnoInput) => {
    onCalculate(data);
  };

  const nightSchedule = workType === 'urban' ? '22h às 5h' : '21h às 5h';
  const additionalRate = workType === 'urban' ? '20%' : '25%';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-blue-600" />
          Calculadora de Adicional Noturno
        </CardTitle>
        <CardDescription>
          Calcule o adicional noturno de {additionalRate} para trabalho urbano ou rural
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados do Trabalhador</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Salário Base Mensal"
                    value={(field.value ?? 0).toString()}
                    onChange={(value) => field.onChange(parseFloat(value) || 0)}
                    required
                    error={errors.salary?.message}
                  />
                )}
              />

              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Tipo de Trabalho
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urban">Urbano (20%)</SelectItem>
                        <SelectItem value="rural">Rural (25%)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.workType && (
                      <p className="text-sm text-red-500">{errors.workType.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Trabalho Noturno */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trabalho Noturno</h3>
            
            <Controller
              name="hasNightWork"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasNightWork"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                  <Label htmlFor="hasNightWork">
                    Trabalha no período noturno ({nightSchedule})
                  </Label>
                </div>
              )}
            />

            {hasNightWork && (
              <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
                <div className="bg-blue-100 p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">Horário Noturno {workType === 'urban' ? 'Urbano' : 'Rural'}</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    <strong>Período:</strong> {nightSchedule}<br/>
                    <strong>Adicional:</strong> {additionalRate} sobre o valor da hora normal<br/>
                    <strong>Hora reduzida:</strong> 52min30s = 1 hora noturna
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="nightHours"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Horas Noturnas (mês)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          placeholder="88"
                        />
                        {errors.nightHours && (
                          <p className="text-sm text-red-500">{errors.nightHours.message}</p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="totalWorkHours"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Total de Horas Trabalhadas (mês)
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          step="0.5"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          placeholder="220"
                        />
                        {errors.totalWorkHours && (
                          <p className="text-sm text-red-500">{errors.totalWorkHours.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

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
                          <SelectItem value="monthly">Adicional Integral ({additionalRate})</SelectItem>
                          <SelectItem value="proportional">Proporcional por Horas</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.calculationType && (
                        <p className="text-sm text-red-500">{errors.calculationType.message}</p>
                      )}
                    </div>
                  )}
                />

                {calculationType === 'proportional' && (
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <strong>Cálculo Proporcional:</strong> O adicional será calculado apenas 
                      sobre as horas efetivamente trabalhadas no período noturno.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Informações sobre Trabalho Noturno */}
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Trabalho Noturno
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700">
              <div>
                <h5 className="font-semibold mb-2">URBANO:</h5>
                <ul className="space-y-1">
                  <li>• Horário: 22h às 5h</li>
                  <li>• Adicional: 20%</li>
                  <li>• Hora reduzida: 52min30s</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">RURAL:</h5>
                <ul className="space-y-1">
                  <li>• Horário: 21h às 5h</li>
                  <li>• Adicional: 25%</li>
                  <li>• Hora reduzida: 52min30s</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Informações Legais */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">⚖️ Base Legal</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>CLT Art. 73:</strong> Adicional noturno de no mínimo 20%</li>
              <li>• <strong>Portaria 417/66:</strong> Hora noturna reduzida (52min30s)</li>
              <li>• <strong>Súmula 60 TST:</strong> Cálculo sobre salário base</li>
              <li>• <strong>Cumulativo:</strong> Pode ser somado com outros adicionais</li>
              <li>• <strong>Integração:</strong> Compõe salário para 13º, férias e FGTS</li>
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
                Calcular Adicional Noturno
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}