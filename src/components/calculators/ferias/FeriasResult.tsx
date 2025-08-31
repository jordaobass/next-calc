'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResultCard } from '../shared/ResultCard';
import { VacationResult } from '@/lib/calculations/ferias';
import { formatCurrency } from '@/lib/calculations/utils';
import { Download, Share, Info, Calendar, Coins } from 'lucide-react';

interface FeriasResultProps {
  result: VacationResult;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function FeriasResult({ result, onExportPDF, onShare }: FeriasResultProps) {
  const earningsItems = [
    { label: 'Valor das Férias', value: result.vacationValue },
    { label: '1/3 Constitucional', value: result.vacationBonus },
  ];

  // Adicionar venda de dias se aplicável
  if (result.soldDaysValue > 0) {
    earningsItems.push(
      { label: 'Venda de Dias', value: result.soldDaysValue },
      { label: '1/3 sobre Venda', value: result.soldDaysBonus }
    );
  }

  const discountsItems = [
    { label: 'INSS', value: result.inssDiscount },
    { label: 'IRRF', value: result.irrfDiscount },
  ];

  const totalItems = [
    { label: 'Total Bruto', value: result.grossTotal },
    { label: 'Total Descontos', value: result.inssDiscount + result.irrfDiscount },
    { label: 'Total Líquido', value: result.netTotal, highlight: true },
  ];

  const totalVacationDays = result.details.eligibleDays + result.details.remainingDays;
  const soldDays = result.soldDaysValue > 0 ? Math.round(result.soldDaysValue / result.details.dailySalary) : 0;
  const restDays = totalVacationDays - soldDays;

  return (
    <div className="space-y-6">
      {/* Resumo Principal */}
      <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-emerald-700">
            {formatCurrency(result.netTotal)}
          </CardTitle>
          <CardDescription className="text-lg">
            Total líquido a receber nas férias
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
              <Calendar className="h-3 w-3 mr-1" />
              {restDays} dias de descanso
            </Badge>
            {soldDays > 0 && (
              <Badge variant="outline" className="bg-yellow-50">
                <Coins className="h-3 w-3 mr-1" />
                {soldDays} dias vendidos
              </Badge>
            )}
            <Badge variant="outline" className="bg-green-50">
              💰 Salário/dia: {formatCurrency(result.details.dailySalary)}
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

      {/* Período das Férias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Período das Férias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Período Solicitado</p>
                <p className="text-lg font-bold text-blue-800">{result.details.vacationPeriod}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Tempo de serviço:</strong> {result.details.serviceTime}</p>
                <p><strong>Dias de direito:</strong> {result.details.eligibleDays} dias (vencidos)</p>
                {result.details.remainingDays > 0 && (
                  <p><strong>Dias proporcionais:</strong> {result.details.remainingDays} dias</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {soldDays > 0 ? (
                <div className="space-y-2">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Efetivo Descanso</p>
                    <p className="text-lg font-bold text-green-800">{restDays} dias</p>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600 font-medium">Dias Vendidos</p>
                    <p className="text-lg font-bold text-yellow-800">{soldDays} dias</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Total de Descanso</p>
                  <p className="text-lg font-bold text-green-800">{totalVacationDays} dias</p>
                  <p className="text-xs text-green-600 mt-1">Férias completas sem venda</p>
                </div>
              )}
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
                <strong>Pagamento:</strong> As férias devem ser pagas até 2 dias antes do início do período de descanso.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>1/3 Constitucional:</strong> Adicional obrigatório de 1/3 sobre o valor das férias, garantido pela Constituição Federal.
              </p>
            </div>
            {soldDays > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                <p>
                  <strong>Venda de Férias:</strong> Você pode vender até 10 dias de férias (1/3 do período), recebendo o valor + 1/3 adicional sobre os dias vendidos.
                </p>
              </div>
            )}
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
              <p>
                <strong>Prazo:</strong> As férias devem ser gozadas no período de 12 meses após completar o período aquisitivo.
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