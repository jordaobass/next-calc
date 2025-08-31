'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Calculator, Info, AlertCircle } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { adicionalInsalubridadeInputSchema, AdicionalInsalubridadeInput } from '@/lib/validations/adicional-insalubridade-schema';

interface AdicionalInsalubridadeFormProps {
  onCalculate: (data: AdicionalInsalubridadeInput) => void;
  loading?: boolean;
}

const insalubriousActivitiesExamples = {
  minimum: [
    'Ruído contínuo acima de 85 dB',
    'Calor em ambiente fechado',
    'Umidade em locais alagados',
    'Trabalho em frigoríficos',
  ],
  medium: [
    'Ruído de impacto acima de 120 dB',
    'Agentes químicos nocivos',
    'Radiação não ionizante',
    'Frio intensivo (abaixo de -18°C)',
  ],
  maximum: [
    'Exposição a asbesto (amianto)',
    'Benzeno e seus homólogos',
    'Radiação ionizante',
    'Chumbo e seus compostos',
  ]
};

export function AdicionalInsalubridadeForm({ onCalculate, loading }: AdicionalInsalubridadeFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<AdicionalInsalubridadeInput>({
    resolver: zodResolver(adicionalInsalubridadeInputSchema),
    defaultValues: {
      salary: 1412,
      insalubricadeGrade: 'medium',
      hasInsalubrious: false,
      hoursInInsalubrious: 0,
      totalWorkHours: 220,
      calculationType: 'monthly',
      months: 1,
    },
    mode: 'onChange',
  });

  const hasInsalubrious = watch('hasInsalubrious');
  const insalubricadeGrade = watch('insalubricadeGrade');
  const calculationType = watch('calculationType');

  const onSubmit = (data: AdicionalInsalubridadeInput) => {
    onCalculate(data);
  };

  const getGradeInfo = (grade: string) => {
    switch (grade) {
      case 'minimum': return { rate: '10%', color: 'text-yellow-600' };
      case 'medium': return { rate: '20%', color: 'text-orange-600' };
      case 'maximum': return { rate: '40%', color: 'text-red-600' };
      default: return { rate: '20%', color: 'text-orange-600' };
    }
  };

  const gradeInfo = getGradeInfo(insalubricadeGrade);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-600" />
          Calculadora de Adicional de Insalubridade
        </CardTitle>
        <CardDescription>
          Calcule o adicional de insalubridade sobre o salário mínimo conforme grau de exposição
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
                name="insalubricadeGrade"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Grau de Insalubridade
                    </Label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grau" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimum">Grau Mínimo (10%)</SelectItem>
                        <SelectItem value="medium">Grau Médio (20%)</SelectItem>
                        <SelectItem value="maximum">Grau Máximo (40%)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className={`text-sm ${gradeInfo.color} font-semibold`}>
                      {gradeInfo.rate} do salário mínimo (R$ 1.412,00)
                    </p>
                    {errors.insalubricadeGrade && (
                      <p className="text-sm text-red-500">{errors.insalubricadeGrade.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Exposição à Insalubridade */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Exposição à Insalubridade</h3>
            
            <Controller
              name="hasInsalubrious"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasInsalubrious"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                  <Label htmlFor="hasInsalubrious">
                    Trabalha com atividades ou agentes insalubres
                  </Label>
                </div>
              )}
            />

            {hasInsalubrious && (
              <div className="space-y-4 p-4 border rounded-lg bg-red-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="hoursInInsalubrious"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Horas de Exposição Insalubre (mês)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          placeholder="220"
                        />
                        {errors.hoursInInsalubrious && (
                          <p className="text-sm text-red-500">{errors.hoursInInsalubrious.message}</p>
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
                          <SelectItem value="monthly">Adicional Integral ({gradeInfo.rate})</SelectItem>
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
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Cálculo Proporcional:</strong> O adicional será calculado proporcionalmente 
                      ao tempo de exposição aos agentes insalubres.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Exemplos de Atividades Insalubres */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Exemplos de Atividades Insalubres - {insalubricadeGrade === 'minimum' ? 'Grau Mínimo' : insalubricadeGrade === 'medium' ? 'Grau Médio' : 'Grau Máximo'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              {insalubriousActivitiesExamples[insalubricadeGrade].map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <AlertCircle className="h-3 w-3 flex-shrink-0" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3">
              <strong>Importante:</strong> A caracterização da insalubridade depende de laudo pericial técnico (NR-15).
            </p>
          </div>

          {/* Informações sobre Cálculo */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📊 Base de Cálculo</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p><strong>Diferente da periculosidade:</strong> Insalubridade é calculada sobre o salário mínimo nacional (R$ 1.412,00), não sobre o salário do trabalhador.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                <div className="bg-white p-2 rounded">
                  <strong>Grau Mínimo:</strong><br/>
                  10% × R$ 1.412 = R$ 141,20
                </div>
                <div className="bg-white p-2 rounded">
                  <strong>Grau Médio:</strong><br/>
                  20% × R$ 1.412 = R$ 282,40
                </div>
                <div className="bg-white p-2 rounded">
                  <strong>Grau Máximo:</strong><br/>
                  40% × R$ 1.412 = R$ 564,80
                </div>
              </div>
            </div>
          </div>

          {/* Informações Legais */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">⚖️ Base Legal</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• <strong>CLT Art. 192:</strong> Adicional sobre salário mínimo</li>
              <li>• <strong>NR-15:</strong> Atividades e Operações Insalubres</li>
              <li>• <strong>Súmula 17 TST:</strong> Cálculo sobre salário mínimo</li>
              <li>• <strong>Súmula 448 TST:</strong> Caracterização por perícia técnica</li>
              <li>• <strong>Incompatível:</strong> Não cumulativo com periculosidade</li>
              <li>• <strong>Perícia:</strong> Obrigatória para caracterização (NR-15)</li>
            </ul>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-red-600 hover:bg-red-700"
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
                Calcular Adicional de Insalubridade
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}