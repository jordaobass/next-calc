'use client';

import { useState } from 'react';
import { FgtsForm } from '@/components/calculators/fgts/FgtsForm';
import { FgtsResult } from '@/components/calculators/fgts/FgtsResult';
import { calculateFGTS, FGTSResult } from '@/lib/calculations/fgts';
import { FGTSInput } from '@/lib/validations/calculator-schemas';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { exportFGTSPDF } from '@/lib/utils/pdf-generator';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';

export default function FgtsPage() {
  const [result, setResult] = useState<FGTSResult | null>(null);
  const [inputData, setInputData] = useState<FGTSInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: FGTSInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateFGTS(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Add to calculation history
      const serviceTime = calculationResult.details.serviceTime;
      addCalculation(
        'fgts',
        `FGTS - ${serviceTime}`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.totalDeposits,
          netValue: calculationResult.currentBalance,
          description: `Tempo de serviço: ${serviceTime} - Salário: ${formatCurrency(data.salary)}`
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cálculo');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!result || !inputData) return;
    
    try {
      await exportFGTSPDF(result, inputData);
      trackPDFDownload('fgts');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de FGTS',
        text: `Saldo atual: R$ ${result.currentBalance.toFixed(2).replace('.', ',')}`,
        url: window.location.href,
      }).then(() => {
        trackShare('fgts', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de FGTS\nSaldo atual: R$ ${result.currentBalance.toFixed(2).replace('.', ',')}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('fgts', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'FGTS', url: `${siteConfig.url}/calculadoras/fgts` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de FGTS',
    'Calcule o valor do Fundo de Garantia por Tempo de Serviço de forma gratuita. Simule saques e verifique seu saldo.',
    `${siteConfig.url}/calculadoras/fgts`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de FGTS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o valor do Fundo de Garantia por Tempo de Serviço, simule saques
            e descubra quanto você pode receber em diferentes situações.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <FgtsForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <FgtsResult 
              result={result} 
              onExportPDF={handleExportPDF}
              onShare={handleShare}
            />
          )}
          
          {/* Calculation History */}
          <CalculationHistory type="fgts" />
        </div>
      </div>
    </>
  );
}