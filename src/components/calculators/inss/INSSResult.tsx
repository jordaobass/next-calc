'use client';

import { Shield, Download, Share2, Calculator, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/calculations/utils';
import { INSSResult as INSSResultType } from '@/lib/calculations/inss';
import { ResultSharing } from '../shared/ResultSharing';

interface INSSResultProps {
  result: INSSResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function INSSResult({ result, onExportPDF, onShare }: INSSResultProps) {
  const { details } = result;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-emerald-800 flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            Desconto INSS
          </CardTitle>
          <div className="text-4xl font-bold text-emerald-600 mt-2">
            {formatCurrency(result.inssDiscount)}
          </div>
          <CardDescription className="text-emerald-700">
            Alíquota efetiva: {result.effectiveRate.toFixed(2)}%
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {formatCurrency(result.grossSalary)}
            </div>
            <div className="text-sm text-muted-foreground">Salário Bruto</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              -{formatCurrency(result.inssDiscount)}
            </div>
            <div className="text-sm text-muted-foreground">Desconto INSS</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {formatCurrency(result.netSalary)}
            </div>
            <div className="text-sm text-muted-foreground">Salário Líquido</div>
          </CardContent>
        </Card>
      </div>

      {/* Detalhamento por Faixas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Cálculo por Faixas Progressivas
          </CardTitle>
          <CardDescription>
            INSS é calculado progressivamente conforme a tabela 2024
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {details.brackets.map((bracket, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h4 className="font-semibold">Faixa {index + 1}: {bracket.range}</h4>
                  <p className="text-sm text-muted-foreground">
                    Alíquota: {bracket.rate}%
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">
                    {formatCurrency(bracket.contribution)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sobre {formatCurrency(bracket.salaryPortion)}
                  </div>
                </div>
              </div>
              
              {/* Progress bar visual */}
              <div className="space-y-2">
                <Progress 
                  value={(bracket.salaryPortion / result.grossSalary) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(bracket.salaryPortion)} contributivos</span>
                  <span>{bracket.rate}% = {formatCurrency(bracket.contribution)}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Total */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total INSS:</span>
              <span className="text-emerald-600">{formatCurrency(details.totalCalculated)}</span>
            </div>
            
            {details.totalOtherJobs && (
              <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                <span>INSS outros empregos:</span>
                <span>{formatCurrency(details.totalOtherJobs)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre Teto */}
      <Card className={`${result.isAtCeiling ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            {result.isAtCeiling ? (
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            ) : (
              <TrendingUp className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-2">
              <h4 className={`font-semibold ${result.isAtCeiling ? 'text-yellow-800' : 'text-blue-800'}`}>
                {result.isAtCeiling ? 'Teto de Contribuição Atingido' : 'Informações sobre o Teto'}
              </h4>
              <div className={`text-sm ${result.isAtCeiling ? 'text-yellow-700' : 'text-blue-700'} space-y-1`}>
                <p>• <strong>Teto salarial INSS 2024:</strong> {formatCurrency(result.contributionCeiling)}</p>
                <p>• <strong>Contribuição máxima:</strong> R$ 908,85</p>
                {result.isAtCeiling && (
                  <p>• <strong>Sua situação:</strong> Contribuição limitada ao teto máximo</p>
                )}
                {!result.isAtCeiling && (
                  <p>• <strong>Margem para o teto:</strong> {formatCurrency(result.contributionCeiling - result.grossSalary)}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Legais */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">Informações Importantes</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>• <strong>Base legal:</strong> Lei 8.213/91 e Portaria Interministerial 2024</p>
                <p>• <strong>Alíquotas progressivas:</strong> 7,5%, 9%, 12% e 14%</p>
                <p>• <strong>Múltiplos empregos:</strong> Teto global de R$ 908,85</p>
                <p>• <strong>Atualização:</strong> Valores reajustados anualmente</p>
                <p>• Este cálculo é uma estimativa. Consulte um contador para casos específicos.</p>
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
        title="Cálculo de INSS 2024"
        description="Calcule o desconto do INSS com a tabela atualizada para 2024. Alíquotas progressivas de 7,5% a 14%."
        value={`Desconto: ${formatCurrency(result.inssDiscount)} (${result.effectiveRate.toFixed(1)}%)`}
        calculatorType="inss"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}