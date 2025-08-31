'use client';

import { FileText, Download, Share2, Calculator, Info, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/calculations/utils';
import { IRRFResult as IRRFResultType } from '@/lib/calculations/irrf';
import { ResultSharing } from '../shared/ResultSharing';

interface IRRFResultProps {
  result: IRRFResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function IRRFResult({ result, onExportPDF, onShare }: IRRFResultProps) {
  const { details } = result;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className={`${result.isExempt ? 'border-green-200 bg-green-50' : 'border-emerald-200 bg-emerald-50'}`}>
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl flex items-center justify-center gap-2 ${result.isExempt ? 'text-green-800' : 'text-emerald-800'}`}>
            {result.isExempt ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <FileText className="h-6 w-6" />
            )}
            {result.isExempt ? 'Isento de IRRF' : 'Imposto de Renda'}
          </CardTitle>
          <div className={`text-4xl font-bold mt-2 ${result.isExempt ? 'text-green-600' : 'text-emerald-600'}`}>
            {result.isExempt ? 'R$ 0,00' : formatCurrency(result.irrfDiscount)}
          </div>
          <CardDescription className={result.isExempt ? 'text-green-700' : 'text-emerald-700'}>
            {result.isExempt 
              ? 'Base de cálculo abaixo do limite de isenção'
              : `Alíquota efetiva: ${result.effectiveRate.toFixed(2)}%`
            }
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
            <div className={`text-2xl font-bold mb-1 ${result.isExempt ? 'text-green-600' : 'text-red-600'}`}>
              {result.isExempt ? 'Isento' : `-${formatCurrency(result.irrfDiscount)}`}
            </div>
            <div className="text-sm text-muted-foreground">IRRF</div>
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

      {/* Base de Cálculo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Base de Cálculo do IRRF
          </CardTitle>
          <CardDescription>
            Discriminativo das deduções permitidas por lei
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Salário Bruto:</span>
              <span className="font-semibold">+ {formatCurrency(result.grossSalary)}</span>
            </div>
            
            {details.inssDeduction > 0 && (
              <div className="flex justify-between items-center text-blue-600">
                <span>(-) Desconto INSS:</span>
                <span className="font-semibold">- {formatCurrency(details.inssDeduction)}</span>
              </div>
            )}
            
            {details.dependentsDeduction > 0 && (
              <div className="flex justify-between items-center text-purple-600">
                <span>(-) Dependentes:</span>
                <span className="font-semibold">- {formatCurrency(details.dependentsDeduction)}</span>
              </div>
            )}
            
            {details.otherDeductions > 0 && (
              <div className="flex justify-between items-center text-orange-600">
                <span>(-) Outras Deduções:</span>
                <span className="font-semibold">- {formatCurrency(details.otherDeductions)}</span>
              </div>
            )}
            
            {details.pensionAlimony > 0 && (
              <div className="flex justify-between items-center text-red-600">
                <span>(-) Pensão Alimentícia:</span>
                <span className="font-semibold">- {formatCurrency(details.pensionAlimony)}</span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Base Tributável:</span>
                <span className="text-emerald-600">= {formatCurrency(result.calculationBasis)}</span>
              </div>
            </div>
          </div>

          {/* Progress bar visual da base */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Deduções</span>
              <span>Base Tributável</span>
            </div>
            <Progress 
              value={(result.calculationBasis / result.grossSalary) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatCurrency(details.totalDeductions)} deduzidos</span>
              <span>{((result.calculationBasis / result.grossSalary) * 100).toFixed(1)}% tributável</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações da Faixa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Faixa de Tributação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">FAIXA</h4>
                <p className="text-lg font-bold">{details.bracketInfo.range}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">ALÍQUOTA</h4>
                <p className="text-lg font-bold text-emerald-600">
                  {details.bracketInfo.rate}%
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground">PARCELA A DEDUZIR</h4>
                <p className="text-lg font-bold text-blue-600">
                  {formatCurrency(details.bracketInfo.deduction)}
                </p>
              </div>
            </div>
            
            {!result.isExempt && (
              <div className="mt-4 p-3 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Cálculo:</h4>
                <div className="text-sm space-y-1">
                  <p>({formatCurrency(result.calculationBasis)} × {details.bracketInfo.rate}%) - {formatCurrency(details.bracketInfo.deduction)}</p>
                  <p className="font-semibold text-emerald-600">
                    = {formatCurrency(result.irrfDiscount)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status da Tributação */}
      <Card className={`${result.isExempt ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            {result.isExempt ? (
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-2">
              <h4 className={`font-semibold ${result.isExempt ? 'text-green-800' : 'text-blue-800'}`}>
                {result.isExempt ? 'Situação: Isento' : 'Situação: Tributável'}
              </h4>
              <div className={`text-sm space-y-1 ${result.isExempt ? 'text-green-700' : 'text-blue-700'}`}>
                <p>• <strong>Limite de isenção 2024:</strong> {formatCurrency(result.exemptionLimit)}</p>
                <p>• <strong>Sua base de cálculo:</strong> {formatCurrency(result.calculationBasis)}</p>
                {result.isExempt ? (
                  <p>• <strong>Resultado:</strong> Não há incidência de IRRF</p>
                ) : (
                  <>
                    <p>• <strong>Alíquota marginal:</strong> {result.marginalRate}%</p>
                    <p>• <strong>Alíquota efetiva:</strong> {result.effectiveRate.toFixed(2)}%</p>
                  </>
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
                <p>• <strong>Base legal:</strong> Lei 7.713/88 e IN RFB 2018</p>
                <p>• <strong>Dependentes:</strong> R$ 189,59 por dependente em 2024</p>
                <p>• <strong>Deduções:</strong> INSS, previdência privada, planos de saúde</p>
                <p>• <strong>Atualização:</strong> Tabela reajustada anualmente</p>
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
        title="Cálculo de IRRF 2024"
        description="Calcule o Imposto de Renda Retido na Fonte com a tabela oficial 2024. Alíquotas de 7,5% a 27,5%."
        value={result.isExempt 
          ? 'Isento de IRRF' 
          : `IRRF: ${formatCurrency(result.irrfDiscount)} (${result.effectiveRate.toFixed(1)}%)`
        }
        calculatorType="irrf"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}