'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResultCard } from '../shared/ResultCard';
import { RescissionResult } from '@/lib/calculations/rescisao';
import { formatCurrency } from '@/lib/calculations/utils';
import { Download, Share, Info, CheckCircle, XCircle } from 'lucide-react';

interface RescisaoResultProps {
  result: RescissionResult;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function RescisaoResult({ result, onExportPDF, onShare }: RescisaoResultProps) {
  const earningsItems = [
    { label: 'Saldo de Salário', value: result.salaryBalance },
    { label: 'Aviso Prévio', value: result.priorNotice },
    { label: 'Férias', value: result.vacationValue },
    { label: '1/3 sobre Férias', value: result.vacationBonus },
    { label: '13º Salário', value: result.thirteenthSalary },
    { label: 'FGTS (Saque)', value: result.fgtsWithdrawal },
    { label: 'Multa FGTS (40%)', value: result.fgtsFine },
  ];

  const discountsItems = [
    { label: 'INSS', value: result.inssDiscount },
    { label: 'IRRF', value: result.irrfDiscount },
  ];

  const totalItems = [
    { label: 'Total Bruto', value: result.grossTotal },
    { label: 'Total Descontos', value: result.inssDiscount + result.irrfDiscount },
    { label: 'Total Líquido', value: result.netTotal, highlight: true },
  ];

  return (
    <div className="space-y-6">
      {/* Resumo Principal */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-emerald-700">
            {formatCurrency(result.netTotal)}
          </CardTitle>
          <CardDescription className="text-lg">
            Total líquido a receber na rescisão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={onExportPDF} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Baixar PDF
            </Button>
            <Button onClick={onShare} variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
          
          {/* Badges de Informações */}
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant={result.details.eligibleForFgtsFine ? 'default' : 'secondary'}>
              {result.details.eligibleForFgtsFine ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              Multa FGTS 40%
            </Badge>
            <Badge variant={result.details.eligibleForUnemploymentInsurance ? 'default' : 'secondary'}>
              {result.details.eligibleForUnemploymentInsurance ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              Seguro Desemprego
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proventos */}
        <ResultCard
          title="💰 Proventos"
          items={earningsItems}
        />

        {/* Descontos */}
        <ResultCard
          title="📉 Descontos"
          items={discountsItems}
        />
      </div>

      {/* Total */}
      <ResultCard
        title="📊 Resumo Final"
        items={totalItems}
        className="bg-muted/30"
      />

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Informações do Cálculo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Tempo de serviço:</strong> {result.details.serviceTime}</p>
              <p><strong>Dias trabalhados (mês rescisão):</strong> {result.details.workedDays} dias</p>
              <p><strong>Dias de férias:</strong> {result.details.vacationDays} dias</p>
              <p><strong>Tipo de aviso prévio:</strong> {
                result.details.priorNoticeType === 'worked' ? 'Trabalhado' :
                result.details.priorNoticeType === 'paid' ? 'Indenizado' : 'Não aplicável'
              }</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {result.details.eligibleForFgtsFine ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span>
                  {result.details.eligibleForFgtsFine 
                    ? 'Tem direito à multa de 40% do FGTS'
                    : 'Não tem direito à multa do FGTS'
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                {result.details.eligibleForUnemploymentInsurance ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <span>
                  {result.details.eligibleForUnemploymentInsurance
                    ? 'Tem direito ao seguro desemprego'
                    : 'Não tem direito ao seguro desemprego'
                  }
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-2">⚠️ Aviso Legal</p>
              <p className="mb-2">
                Os valores calculados são estimativas baseadas na legislação trabalhista vigente. 
                Para cálculos oficiais, consulte sempre um advogado trabalhista ou o departamento 
                de recursos humanos da empresa.
              </p>
              <p>
                Este cálculo considera as tabelas de INSS e IRRF de 2024 e pode variar conforme 
                acordos coletivos, convenções específicas ou particularidades do contrato de trabalho.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}