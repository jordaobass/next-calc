'use client';

import { Clock, Download, Share2, Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';
import { HorasExtrasResult as HorasExtrasResultType } from '@/lib/calculations/horas-extras';
import { ResultSharing } from '../shared/ResultSharing';

interface HorasExtrasResultProps {
  result: HorasExtrasResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function HorasExtrasResult({ result, onExportPDF, onShare }: HorasExtrasResultProps) {
  const { details } = result;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-emerald-800 flex items-center justify-center gap-2">
            <Clock className="h-6 w-6" />
            Valor Total das Horas Extras
          </CardTitle>
          <div className="text-4xl font-bold text-emerald-600 mt-2">
            {formatCurrency(result.totalWithDSR)}
          </div>
          <CardDescription className="text-emerald-700">
            Incluindo DSR (Descanso Semanal Remunerado)
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Detalhamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Detalhamento do Cálculo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Valor da Hora Base */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Valor da Hora Base</h3>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(result.baseHourValue)}
            </div>
            <p className="text-sm text-muted-foreground">
              Calculado com base no salário mensal
            </p>
          </div>

          {/* Horas Extras Normais */}
          {details.regularHours > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">HORAS EXTRAS (50%)</h4>
                <p className="text-lg font-bold">{details.regularHours}h</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">VALOR/HORA</h4>
                <p className="text-lg font-bold">
                  {formatCurrency(result.baseHourValue * details.calculations.regular.rate)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ADICIONAL</h4>
                <p className="text-lg font-bold text-emerald-600">50%</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">TOTAL</h4>
                <p className="text-lg font-bold text-emerald-600">
                  {formatCurrency(result.regularExtraValue)}
                </p>
              </div>
            </div>
          )}

          {/* Horas Extras Domingos */}
          {details.sundayHours > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">DOMINGOS (100%)</h4>
                <p className="text-lg font-bold">{details.sundayHours}h</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">VALOR/HORA</h4>
                <p className="text-lg font-bold">
                  {formatCurrency(result.baseHourValue * details.calculations.sunday.rate)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ADICIONAL</h4>
                <p className="text-lg font-bold text-orange-600">100%</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">TOTAL</h4>
                <p className="text-lg font-bold text-orange-600">
                  {formatCurrency(result.sundayExtraValue)}
                </p>
              </div>
            </div>
          )}

          {/* Horas Extras Feriados */}
          {details.holidayHours > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">FERIADOS (100%)</h4>
                <p className="text-lg font-bold">{details.holidayHours}h</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">VALOR/HORA</h4>
                <p className="text-lg font-bold">
                  {formatCurrency(result.baseHourValue * details.calculations.holiday.rate)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ADICIONAL</h4>
                <p className="text-lg font-bold text-purple-600">100%</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">TOTAL</h4>
                <p className="text-lg font-bold text-purple-600">
                  {formatCurrency(result.holidayExtraValue)}
                </p>
              </div>
            </div>
          )}

          {/* Adicional Noturno */}
          {details.nightHours > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-indigo-50">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">NOTURNO (20%)</h4>
                <p className="text-lg font-bold">{details.nightHours}h</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">VALOR/HORA</h4>
                <p className="text-lg font-bold">
                  {formatCurrency(result.baseHourValue * details.calculations.night.rate)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ADICIONAL</h4>
                <p className="text-lg font-bold text-indigo-600">20%</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">TOTAL</h4>
                <p className="text-lg font-bold text-indigo-600">
                  {formatCurrency(result.nightExtraValue)}
                </p>
              </div>
            </div>
          )}

          {/* Totais */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal Horas Extras:</span>
              <span className="font-bold">{formatCurrency(result.totalExtraValue)}</span>
            </div>
            
            <div className="flex justify-between text-blue-600">
              <span className="font-semibold">DSR sobre Horas Extras:</span>
              <span className="font-bold">{formatCurrency(result.dsrValue)}</span>
            </div>
            
            <div className="flex justify-between text-lg pt-3 border-t">
              <span className="font-bold">TOTAL GERAL:</span>
              <span className="font-bold text-emerald-600 text-xl">
                {formatCurrency(result.totalWithDSR)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Legais */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-800">Informações Importantes</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• <strong>DSR:</strong> Descanso Semanal Remunerado sobre horas extras (CLT Art. 7º)</p>
                <p>• <strong>Limite Legal:</strong> Máximo 2h extras por dia (CLT Art. 59)</p>
                <p>• <strong>Adicional Noturno:</strong> 20% para trabalho entre 22h e 5h</p>
                <p>• <strong>Domingos/Feriados:</strong> 100% de adicional quando trabalhados</p>
                <p>• Este cálculo é uma estimativa. Consulte um advogado trabalhista.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onExportPDF && (
          <Button
            onClick={onExportPDF}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        )}
        
        {onShare && (
          <Button
            onClick={onShare}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        )}
      </div>

      {/* Compartilhamento */}
      <ResultSharing
        title="Cálculo de Horas Extras"
        description="Calcule suas horas extras com adicional de 50%, trabalho em domingos e feriados (100%) e adicional noturno (20%)"
        value={formatCurrency(result.totalWithDSR)}
        calculatorType="horas-extras"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}