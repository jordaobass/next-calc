'use client';

import { Shield, Download, Share2, Calculator, Info, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';
import { AdicionalInsalubridadeResult as AdicionalInsalubridadeResultType } from '@/lib/calculations/adicional-insalubridade';
import { ResultSharing } from '../shared/ResultSharing';

interface AdicionalInsalubridadeResultProps {
  result: AdicionalInsalubridadeResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function AdicionalInsalubridadeResult({ result, onExportPDF, onShare }: AdicionalInsalubridadeResultProps) {
  const { details } = result;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'minimum': return 'border-yellow-200 bg-yellow-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'maximum': return 'border-red-200 bg-red-50';
      default: return 'border-orange-200 bg-orange-50';
    }
  };

  const getGradeTextColor = (grade: string) => {
    switch (grade) {
      case 'minimum': return 'text-yellow-800';
      case 'medium': return 'text-orange-800';
      case 'maximum': return 'text-red-800';
      default: return 'text-orange-800';
    }
  };

  const getGradeValueColor = (grade: string) => {
    switch (grade) {
      case 'minimum': return 'text-yellow-600';
      case 'medium': return 'text-orange-600';
      case 'maximum': return 'text-red-600';
      default: return 'text-orange-600';
    }
  };

  const gradeName = details.insalubricadeGrade === 'minimum' ? 'Mínimo' : 
                   details.insalubricadeGrade === 'medium' ? 'Médio' : 'Máximo';

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className={getGradeColor(details.insalubricadeGrade)}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl ${getGradeTextColor(details.insalubricadeGrade)} flex items-center justify-center gap-2`}>
            <Shield className="h-6 w-6" />
            Adicional de Insalubridade
          </CardTitle>
          <div className={`text-4xl font-bold ${getGradeValueColor(details.insalubricadeGrade)} mt-2`}>
            {formatCurrency(result.additionalValue)}
          </div>
          <CardDescription className={getGradeTextColor(details.insalubricadeGrade)}>
            Grau {gradeName} - {result.additionalRate}% do salário mínimo
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
            <div className={`text-2xl font-bold ${getGradeValueColor(details.insalubricadeGrade)} mb-1`}>
              +{formatCurrency(result.additionalValue)}
            </div>
            <div className="text-sm text-muted-foreground">Adicional Insalubridade</div>
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
            Como foi calculado o adicional de insalubridade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-semibold mb-3">Exposição à Insalubridade</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">GRAU DE INSALUBRIDADE</h5>
                <p className="text-lg font-bold">{details.gradeDescription}</p>
              </div>
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">BASE DE CÁLCULO</h5>
                <p className="text-lg font-bold">Salário Mínimo</p>
                <p className="text-sm text-muted-foreground">R$ 1.412,00</p>
              </div>
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">ADICIONAL</h5>
                <p className="text-lg font-bold">{result.additionalRate}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium text-sm text-muted-foreground">HORAS INSALUBRES</h5>
                <p className="text-lg font-bold">{details.hoursInInsalubrious}h</p>
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
              <div className={`mt-3 p-3 ${getGradeColor(details.insalubricadeGrade)} rounded-lg`}>
                <p className={`text-sm ${getGradeTextColor(details.insalubricadeGrade)}`}>
                  <strong>✅ Exposição Integral:</strong> Todo o período de trabalho em ambiente insalubre.
                  Direito ao adicional completo de {result.additionalRate}%.
                </p>
              </div>
            )}
            
            {!details.isFullTime && result.proportionalRate && (
              <div className="mt-3 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>📊 Exposição Proporcional:</strong> Adicional calculado proporcionalmente 
                  ao tempo de exposição ({result.proportionalRate.toFixed(2)}% do salário mínimo).
                </p>
              </div>
            )}
          </div>

          {/* Diferencial da Insalubridade */}
          <div className="p-4 border rounded-lg bg-blue-50">
            <h4 className="font-semibold mb-3 text-blue-800">💡 Diferencial da Insalubridade</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-semibold mb-2">INSALUBRIDADE:</h5>
                <ul className="space-y-1">
                  <li>• Base: Salário mínimo</li>
                  <li>• Valor fixo por grau</li>
                  <li>• Caracterização: NR-15</li>
                  <li>• Perícia obrigatória</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">PERICULOSIDADE:</h5>
                <ul className="space-y-1">
                  <li>• Base: Salário contratual</li>
                  <li>• 30% do salário</li>
                  <li>• Caracterização: NR-16</li>
                  <li>• Perícia técnica</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resultado Final */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Salário Base:</span>
              <span className="font-bold">{formatCurrency(result.baseSalary)}</span>
            </div>
            
            <div className={`flex justify-between ${getGradeValueColor(details.insalubricadeGrade)}`}>
              <span className="font-semibold">Adicional Insalubridade ({result.additionalRate}% SM):</span>
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

      {/* Atividades Insalubres */}
      <Card className={getGradeColor(details.insalubricadeGrade)}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${getGradeTextColor(details.insalubricadeGrade)}`}>
            <AlertCircle className="h-5 w-5" />
            Atividades Insalubres - Grau {gradeName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {details.activities.map((activity, index) => (
              <div key={index} className={`flex items-center space-x-2 text-sm ${getGradeTextColor(details.insalubricadeGrade)}`}>
                <Shield className="h-3 w-3 flex-shrink-0" />
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
                <p>• <strong>Base de cálculo:</strong> Salário mínimo nacional (R$ 1.412,00)</p>
                <p>• <strong>Graus:</strong> Mínimo (10%), Médio (20%), Máximo (40%)</p>
                <p>• <strong>Incompatibilidade:</strong> Não cumulativo com adicional de periculosidade</p>
                <p>• <strong>Perícia técnica:</strong> Obrigatória para caracterização (NR-15)</p>
                <p>• <strong>Integração:</strong> Não integra salário para cálculo de horas extras</p>
                <p>• <strong>FGTS e INSS:</strong> Integra base de cálculo para contribuições</p>
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
        title="Cálculo de Adicional de Insalubridade"
        description={`Calcule o adicional de insalubridade grau ${gradeName.toLowerCase()} de ${result.additionalRate}% sobre o salário mínimo conforme CLT Art. 192`}
        value={formatCurrency(result.additionalValue)}
        calculatorType="adicional-insalubridade"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}