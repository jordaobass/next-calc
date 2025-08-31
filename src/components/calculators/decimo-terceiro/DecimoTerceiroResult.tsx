'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResultCard } from '../shared/ResultCard';
import { ThirteenthSalaryResult } from '@/lib/calculations/decimo-terceiro';
import { formatCurrency } from '@/lib/calculations/utils';
import { Download, Share, Info, Gift, Calendar, Calculator } from 'lucide-react';

interface DecimoTerceiroResultProps {
  result: ThirteenthSalaryResult;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function DecimoTerceiroResult({ result, onExportPDF, onShare }: DecimoTerceiroResultProps) {
  const earningsItems = [
    { label: '13º Salário Bruto', value: result.grossValue },
  ];

  const deductionsItems = [
    { label: 'Adiantamento Recebido', value: result.advanceDeduction },
    { label: 'INSS', value: result.inssDiscount },
    { label: 'IRRF', value: result.irrfDiscount },
  ];

  const totalItems = [
    { label: 'Valor Bruto', value: result.grossValue },
    { label: 'Total de Deduções', value: result.advanceDeduction + result.inssDiscount + result.irrfDiscount },
    { label: 'Valor Líquido a Receber', value: result.totalToPay, highlight: true },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {/* Resumo Principal */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-emerald-700">
            {formatCurrency(result.totalToPay)}
          </CardTitle>
          <CardDescription className="text-lg">
            Valor líquido do 13º salário a receber
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
            <Badge variant="outline" className="bg-white">
              <Gift className="h-3 w-3 mr-1" />
              {result.details.eligibleMonths} {result.details.eligibleMonths === 1 ? 'mês' : 'meses'}
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              <Calculator className="h-3 w-3 mr-1" />
              {(result.details.proportionalRate * 100).toFixed(1)}% do salário anual
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              💰 Base mensal: {formatCurrency(result.details.monthlyBasis)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detalhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proventos */}
        <ResultCard
          title="💰 Valor Bruto"
          items={earningsItems}
        />

        {/* Deduções */}
        <ResultCard
          title="📉 Deduções"
          items={deductionsItems}
        />
      </div>

      {/* Total */}
      <ResultCard
        title="📊 Resumo Final"
        items={totalItems}
        className="bg-muted/30"
      />

      {/* Cronograma de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Cronograma de Pagamento {currentYear}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1ª Parcela */}
            <div className="space-y-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">1ª Parcela - Adiantamento</p>
                <p className="text-lg font-bold text-blue-800">{result.details.paymentDates.firstInstallment}</p>
                <p className="text-xs text-blue-600">Até 30/11/{currentYear}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Valor:</strong> 50% do 13º salário</p>
                <p><strong>Estimativa:</strong> {formatCurrency(result.grossValue / 2)}</p>
                <p><strong>Descontos:</strong> Não há descontos no adiantamento</p>
              </div>
            </div>

            {/* 2ª Parcela */}
            <div className="space-y-3">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">2ª Parcela - Complemento</p>
                <p className="text-lg font-bold text-green-800">{result.details.paymentDates.secondInstallment}</p>
                <p className="text-xs text-green-600">Até 20/12/{currentYear}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Valor líquido:</strong> {formatCurrency(result.totalToPay)}</p>
                <p><strong>INSS:</strong> {formatCurrency(result.inssDiscount)}</p>
                <p><strong>IRRF:</strong> {formatCurrency(result.irrfDiscount)}</p>
                {result.advanceDeduction > 0 && (
                  <p><strong>Desconto adiantamento:</strong> {formatCurrency(result.advanceDeduction)}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Cálculo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Detalhes do Cálculo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p><strong>Tempo de serviço:</strong> {result.details.serviceTime}</p>
              <p><strong>Meses elegíveis:</strong> {result.details.eligibleMonths} de 12 meses</p>
              <p><strong>Base de cálculo:</strong> {formatCurrency(result.details.monthlyBasis)} por mês</p>
              <p><strong>Proporção:</strong> {(result.details.proportionalRate * 100).toFixed(2)}%</p>
            </div>
            <div className="space-y-2">
              <p><strong>Valor bruto:</strong> {formatCurrency(result.grossValue)}</p>
              <p><strong>Valor líquido antes descontos:</strong> {formatCurrency(result.netThirteenthSalary)}</p>
              <p><strong>Total de descontos:</strong> {formatCurrency(result.inssDiscount + result.irrfDiscount)}</p>
              <p><strong>Valor final a receber:</strong> {formatCurrency(result.totalToPay)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>Primeira Parcela:</strong> Deve ser paga até 30 de novembro. É sempre 50% do valor do 13º salário, sem qualquer desconto.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>Segunda Parcela:</strong> Deve ser paga até 20 de dezembro. Sofre descontos de INSS e IRRF, calculados sobre o valor total do 13º.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>Base de Cálculo:</strong> Fração de 15 dias ou mais em cada mês conta como mês completo para o 13º salário.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>Direito Garantido:</strong> Todo trabalhador tem direito ao 13º salário após 15 dias de trabalho no ano.
              </p>
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
                Para cálculos oficiais, consulte sempre o departamento de recursos humanos da empresa.
              </p>
              <p>
                O cálculo considera as tabelas de INSS e IRRF de 2024. Valores podem variar conforme 
                acordos coletivos ou convenções específicas da categoria profissional.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}