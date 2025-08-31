'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Calculator } from 'lucide-react';
import { CurrencyInput } from '../shared/CurrencyInput';
import { horasExtrasInputSchema, HorasExtrasInput } from '@/lib/validations/horas-extras-schema';

interface HorasExtrasFormProps {
  onCalculate: (data: HorasExtrasInput) => void;
  loading?: boolean;
}

export function HorasExtrasForm({ onCalculate, loading }: HorasExtrasFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<HorasExtrasInput>({
    resolver: zodResolver(horasExtrasInputSchema),
    defaultValues: {
      salary: 1412, // Valor padrão com salário mínimo 2024
      hoursPerDay: 8,
      daysPerWeek: 5,
      extraHours: 0,
      extraHoursSunday: 0,
      extraHoursHoliday: 0,
      hasNightShift: false,
      nightHours: 0,
    },
    mode: 'onChange',
  });

  const hasNightShift = watch('hasNightShift');

  const onSubmit = (data: HorasExtrasInput) => {
    onCalculate(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-emerald-600" />
          Calculadora de Horas Extras
        </CardTitle>
        <CardDescription>
          Calcule o valor das horas extras, domingos, feriados e adicional noturno
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Básicos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dados Básicos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    label="Salário Mensal"
                    value={(field.value ?? 0).toString()}
                    onChange={(value) => field.onChange(parseFloat(value) || 0)}
                    required
                    error={errors.salary?.message}
                  />
                )}
              />

              <div className="space-y-4">
                <Controller
                  name="hoursPerDay"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Horas por Dia
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max="12"
                        step="0.5"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="8"
                      />
                      {errors.hoursPerDay && (
                        <p className="text-sm text-red-500">{errors.hoursPerDay.message}</p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="daysPerWeek"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                        Dias por Semana
                      </Label>
                      <Input
                        type="number"
                        min="1"
                        max="6"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="5"
                      />
                      {errors.daysPerWeek && (
                        <p className="text-sm text-red-500">{errors.daysPerWeek.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Horas Extras */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Horas Extras do Período</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="extraHours"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Horas Extras Normais (50%)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Dias úteis após jornada normal
                    </p>
                    {errors.extraHours && (
                      <p className="text-sm text-red-500">{errors.extraHours.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="extraHoursSunday"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Horas aos Domingos (100%)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Trabalho em domingos
                    </p>
                    {errors.extraHoursSunday && (
                      <p className="text-sm text-red-500">{errors.extraHoursSunday.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="extraHoursHoliday"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label>Horas em Feriados (100%)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={field.value ?? ''}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                    <p className="text-xs text-muted-foreground">
                      Trabalho em feriados
                    </p>
                    {errors.extraHoursHoliday && (
                      <p className="text-sm text-red-500">{errors.extraHoursHoliday.message}</p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Adicional Noturno */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Adicional Noturno</h3>
            
            <div className="space-y-4">
              <Controller
                name="hasNightShift"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="hasNightShift"
                      checked={field.value}
                      onChange={field.onChange}
                      className="rounded"
                    />
                    <Label htmlFor="hasNightShift">
                      Possui trabalho noturno (22h às 5h)
                    </Label>
                  </div>
                )}
              />

              {hasNightShift && (
                <Controller
                  name="nightHours"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2 max-w-xs">
                      <Label>Horas Noturnas (20% adicional)</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.5"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="0"
                      />
                      <p className="text-xs text-muted-foreground">
                        Horas trabalhadas das 22h às 5h
                      </p>
                      {errors.nightHours && (
                        <p className="text-sm text-red-500">{errors.nightHours.message}</p>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
          </div>

          {/* Informações importantes */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Informações Importantes</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Horas extras normais: adicional de 50%</li>
              <li>• Domingos e feriados: adicional de 100%</li>
              <li>• Adicional noturno: 20% sobre a hora normal</li>
              <li>• DSR (reflexo) calculado automaticamente</li>
              <li>• Limite de 2h extras por dia (CLT Art. 59)</li>
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
                Calcular Horas Extras
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}