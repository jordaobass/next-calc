'use client';

import { Moon, Download, Share2, Calculator, Info, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';
import { AdicionalNoturnoResult as AdicionalNoturnoResultType } from '@/lib/calculations/adicional-noturno';
import { ResultSharing } from '../shared/ResultSharing';

interface AdicionalNoturnoResultProps {
  result: AdicionalNoturnoResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function AdicionalNoturnoResult({ result, onExportPDF, onShare }: AdicionalNoturnoResultProps) {
  const { details } = result;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-800 flex items-center justify-center gap-2">
            <Moon className="h-6 w-6" />
            Adicional Noturno
          </CardTitle>
          <div className="text-4xl font-bold text-blue-600 mt-2">
            {formatCurrency(result.additionalValue)}
          </div>
          <CardDescription className="text-blue-700">
            {result.additionalRate}% sobre {details.workType === 'urban' ? 'trabalho urbano' : 'trabalho rural'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {formatCurrency(result.baseSalary)}
            </div>
            <div className="text-sm text-muted-foreground">Salário Base</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              +{formatCurrency(result.additionalValue)}
            </div>
            <div className="text-sm text-muted-foreground">Adicional Noturno</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {formatCurrency(result.totalSalary)}
            </div>
            <div className="text-sm text-muted-foreground">Salário Total</div>
          </CardContent>
        </Card>
      </div>

      {/* Detalhamento do Cálculo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Detalhamento do Cálculo
          </CardTitle>
          <CardDescription>
            Como foi calculado o adicional noturno
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-semibold mb-3">Trabalho Noturno</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">TIPO DE TRABALHO</h5>
                <p className="text-lg font-bold">{details.workType === 'urban' ? 'Urbano' : 'Rural'}</p>
              </div>
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">HORÁRIO NOTURNO</h5>
                <p className="text-lg font-bold">{details.nightSchedule}</p>
              </div>
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">ADICIONAL</h5>
                <p className="text-lg font-bold">{result.additionalRate}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">HORAS NOTURNAS</h5>
                <p className="text-lg font-bold">{details.nightHours}h</p>
              </div>
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">TOTAL DE HORAS</h5>
                <p className="text-lg font-bold">{details.totalWorkHours}h</p>
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg">
              <h5 className="font-semibold mb-2">Cálculo Aplicado:</h5>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {details.proportionCalculation}
              </p>
            </div>
            
            {details.isFullNight && (
              <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>✅ Trabalho Integral Noturno:</strong> Todo o período de trabalho no horário noturno.
                  Direito ao adicional completo de {result.additionalRate}%.
                </p>
              </div>
            )}
            
            {!details.isFullNight && result.proportionalRate && (
              <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <strong>📊 Trabalho Parcial Noturno:</strong> Adicional calculado proporcionalmente 
                  às horas trabalhadas no período noturno ({result.proportionalRate.toFixed(2)}%).
                </p>
              </div>
            )}
          </div>

          {/* Valores por Hora */}
          <div className="p-4 border rounded-lg bg-indigo-50">
            <h4 className="font-semibold mb-3 text-indigo-800">Valores por Hora</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-xl font-bold text-gray-600 mb-1">
                  {formatCurrency(details.hourValue)}
                </div>
                <div className="text-sm text-muted-foreground">Hora Normal</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-xl font-bold text-blue-600 mb-1">
                  {formatCurrency(details.nightHourValue)}
                </div>
                <div className="text-sm text-muted-foreground">Hora Noturna</div>
              </div>
            </div>
          </div>

          {/* Resultado Final */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Salário Base:</span>
              <span className="font-bold">{formatCurrency(result.baseSalary)}</span>
            </div>
            
            <div className="flex justify-between text-blue-600">
              <span className="font-semibold">Adicional Noturno ({result.additionalRate}%):</span>
              <span className="font-bold">{formatCurrency(result.additionalValue)}</span>
            </div>
            
            <div className="flex justify-between text-lg pt-3 border-t">
              <span className="font-bold">SALÁRIO TOTAL:</span>
              <span className="font-bold text-emerald-600 text-xl">
                {formatCurrency(result.totalSalary)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Características do Trabalho Noturno */}
      <Card className="bg-indigo-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800">
            <Clock className="h-5 w-5" />
            Características do Trabalho Noturno
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {details.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-indigo-700">
                <Moon className="h-3 w-3 flex-shrink-0" />
                <span>{characteristic}</span>
              </div>
            ))}
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
                <p>• <strong>Base legal:</strong> {details.legalBasis}</p>
                <p>• <strong>Urbano:</strong> 20% das 22h às 5h</p>
                <p>• <strong>Rural:</strong> 25% das 21h às 5h</p>
                <p>• <strong>Hora reduzida:</strong> 52min30s = 1 hora noturna</p>
                <p>• <strong>Cálculo:</strong> Sobre o valor da hora normal</p>
                <p>• <strong>Cumulativo:</strong> Pode somar com outros adicionais</p>
                <p>• <strong>Integração:</strong> Integra salário para fins de 13º, férias, FGTS e INSS</p>
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
        title="Cálculo de Adicional Noturno"
        description={`Calcule o adicional noturno de ${result.additionalRate}% para trabalho ${details.workType === 'urban' ? 'urbano' : 'rural'} conforme CLT Art. 73`}
        value={formatCurrency(result.additionalValue)}
        calculatorType="adicional-noturno"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}