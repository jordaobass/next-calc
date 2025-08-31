'use client';

import { AlertTriangle, Download, Share2, Calculator, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';
import { PericulosidadeResult as PericulosidadeResultType } from '@/lib/calculations/adicional-periculosidade';
import { ResultSharing } from '../shared/ResultSharing';

interface PericulosidadeResultProps {
  result: PericulosidadeResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function PericulosidadeResult({ result, onExportPDF, onShare }: PericulosidadeResultProps) {
  const { details } = result;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-800 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Adicional de Periculosidade
          </CardTitle>
          <div className="text-4xl font-bold text-orange-600 mt-2">
            {formatCurrency(result.additionalValue)}
          </div>
          <CardDescription className="text-orange-700">
            {result.additionalRate.toFixed(1)}% sobre o salário base
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
            <div className="text-2xl font-bold text-orange-600 mb-1">
              +{formatCurrency(result.additionalValue)}
            </div>
            <div className="text-sm text-muted-foreground">Adicional Periculosidade</div>
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
            Como foi calculado o adicional de periculosidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-semibold mb-3">Exposição ao Perigo</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">HORAS EM EXPOSIÇÃO</h5>
                <p className="text-lg font-bold">{details.hoursInDanger}h</p>
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
            
            {details.isFullTime && (
              <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>✅ Exposição Integral:</strong> Todo o período de trabalho em atividade perigosa.
                  Direito ao adicional completo de 30%.
                </p>
              </div>
            )}
            
            {!details.isFullTime && result.proportionalRate && (
              <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>📊 Exposição Proporcional:</strong> Adicional calculado proporcionalmente 
                  ao tempo de exposição ({result.proportionalRate.toFixed(2)}%).
                </p>
              </div>
            )}
          </div>

          {/* Resultado Final */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Salário Base:</span>
              <span className="font-bold">{formatCurrency(result.baseSalary)}</span>
            </div>
            
            <div className="flex justify-between text-orange-600">
              <span className="font-semibold">Adicional Periculosidade ({result.additionalRate.toFixed(1)}%):</span>
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

      {/* Atividades Perigosas */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Shield className="h-5 w-5" />
            Principais Atividades Perigosas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {details.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-red-700">
                <AlertTriangle className="h-3 w-3 flex-shrink-0" />
                <span>{activity}</span>
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
                <p>• <strong>Taxa fixa:</strong> 30% sobre o salário contratual (não sobre o mínimo)</p>
                <p>• <strong>Comprovação:</strong> Necessário laudo pericial técnico</p>
                <p>• <strong>Incompatibilidade:</strong> Não cumulativo com adicional de insalubridade</p>
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
        title="Cálculo de Adicional de Periculosidade"
        description="Calcule o adicional de periculosidade de 30% sobre o salário para atividades perigosas conforme CLT Art. 193"
        value={formatCurrency(result.additionalValue)}
        calculatorType="periculosidade"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}