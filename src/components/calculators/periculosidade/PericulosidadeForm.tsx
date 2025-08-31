'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Calculator, Info } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { periculosidadeInputSchema, PericulosidadeInput } from '@/lib/validations/periculosidade-schema';

interface PericulosidadeFormProps {
  onCalculate: (data: PericulosidadeInput) => void;
  loading?: boolean;
}

const dangerousActivities = [
  'Trabalho com explosivos',
  'Trabalho com inflamáveis',
  'Trabalho com radiação ionizante',
  'Trabalho com energia elétrica acima de 250V',
  'Trabalho com motocicletas (mototaxistas, motoboys)',
  'Segurança pessoal ou patrimonial',
  'Trabalho em postos de combustível',
  'Trabalho com material radioativo',
];

export function PericulosidadeForm({ onCalculate, loading }: PericulosidadeFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PericulosidadeInput>({
    resolver: zodResolver(periculosidadeInputSchema),
    defaultValues: {
      salary: 1412,
      hasDangerousActivity: false,
      hoursInDanger: 0,
      totalWorkHours: 220,
      calculationType: 'monthly',
      months: 1,
    },
    mode: 'onChange',
  });

  const hasDangerousActivity = watch('hasDangerousActivity');
  const calculationType = watch('calculationType');

  const onSubmit = (data: PericulosidadeInput) => {
    onCalculate(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          Calculadora de Adicional de Periculosidade
        </CardTitle>
        <CardDescription>
          Calcule o adicional de periculosidade de 30% sobre o salário base
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
                        <SelectItem value="monthly">Adicional Integral (30%)</SelectItem>
                        <SelectItem value="proportional">Proporcional por Horas</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.calculationType && (
                      <p className="text-sm text-red-500">{errors.calculationType.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Exposição ao Perigo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Exposição ao Perigo</h3>
            
            <Controller
              name="hasDangerousActivity"
              control={control}
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasDangerousActivity"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                  <Label htmlFor="hasDangerousActivity">
                    Trabalha com atividades perigosas
                  </Label>
                </div>
              )}
            />

            {hasDangerousActivity && (
              <div className="space-y-4 p-4 border rounded-lg bg-orange-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="hoursInDanger"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                          Horas de Exposição ao Perigo (mês)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          value={field.value ?? ''}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          placeholder="220"
                        />
                        {errors.hoursInDanger && (
                          <p className="text-sm text-red-500">{errors.hoursInDanger.message}</p>
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

                {calculationType === 'proportional' && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Cálculo Proporcional:</strong> O adicional será calculado proporcionalmente 
                      ao tempo de exposição ao perigo.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Atividades Perigosas */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Principais Atividades Perigosas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-yellow-700">
              {dangerousActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                  <span>{activity}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-yellow-600 mt-3">
              <strong>Importante:</strong> A caracterização da periculosidade depende de laudo pericial técnico.
            </p>
          </div>

          {/* Informações Legais */}
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">⚖️ Base Legal</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• <strong>CLT Art. 193:</strong> Adicional de 30% sobre o salário</li>
              <li>• <strong>NR-16:</strong> Atividades e Operações Perigosas</li>
              <li>• <strong>Súmula 364 TST:</strong> Cálculo sobre salário contratual</li>
              <li>• <strong>Incompatível:</strong> Não cumulativo com insalubridade</li>
              <li>• <strong>Requisito:</strong> Laudo pericial para comprovação</li>
            </ul>
          </div>

          {/* Botão de Calcular */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-orange-600 hover:bg-orange-700"
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
                Calcular Adicional de Periculosidade
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}