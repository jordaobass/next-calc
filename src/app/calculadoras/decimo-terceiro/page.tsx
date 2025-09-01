'use client';

import { useState } from 'react';
import { DecimoTerceiroForm } from '@/components/calculators/decimo-terceiro/DecimoTerceiroForm';
import { DecimoTerceiroResult } from '@/components/calculators/decimo-terceiro/DecimoTerceiroResult';
import { calculateThirteenthSalary, ThirteenthSalaryResult } from '@/lib/calculations/decimo-terceiro';
import { ThirteenthSalaryInput } from '@/lib/validations/calculator-schemas';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { exportThirteenthSalaryPDF } from '@/lib/utils/pdf-generator';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { ResponsiveAd } from '@/components/shared/AdPlaceholder';

export default function DecimoTerceiroPage() {
  const [result, setResult] = useState<ThirteenthSalaryResult | null>(null);
  const [inputData, setInputData] = useState<ThirteenthSalaryInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: ThirteenthSalaryInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateThirteenthSalary(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Add to calculation history
      addCalculation(
        'decimo-terceiro',
        `13º Salário - ${data.workedMonths} meses`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.grossValue,
          netValue: calculationResult.totalToPay || calculationResult.netThirteenthSalary,
          description: `${data.workedMonths} meses trabalhados - Salário: ${formatCurrency(data.salary)}`
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
      await exportThirteenthSalaryPDF(result, inputData);
      trackPDFDownload('decimo-terceiro');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de 13º Salário',
        text: `Valor líquido a receber: R$ ${result.netThirteenthSalary.toFixed(2).replace('.', ',')}`,
        url: window.location.href,
      }).then(() => {
        trackShare('decimo-terceiro', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de 13º Salário\nValor líquido: R$ ${result.netThirteenthSalary.toFixed(2).replace('.', ',')}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('decimo-terceiro', 'clipboard');
    });
  };

  const currentYear = new Date().getFullYear();

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: '13º Salário', url: `${siteConfig.url}/calculadoras/decimo-terceiro` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de 13º Salário',
    `Calcule o décimo terceiro salário ${currentYear} com base no tempo trabalhado. Inclui primeira e segunda parcela, com todos os descontos legais.`,
    `${siteConfig.url}/calculadoras/decimo-terceiro`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      <div className="container mx-auto px-4 py-8">
      {/* Ad Above Form */}
      <ResponsiveAd className="mb-8" minHeight={100} />
      
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">Calculadora de 13º Salário</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calcule o décimo terceiro salário {currentYear} com base no tempo trabalhado.
          Inclui primeira e segunda parcela, com todos os descontos legais.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <DecimoTerceiroForm onCalculate={handleCalculate} loading={loading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}
        
        {result && (
          <>
            <DecimoTerceiroResult 
              result={result} 
              onExportPDF={handleExportPDF}
              onShare={handleShare}
            />
            
            {/* Ad After Results */}
            <ResponsiveAd className="my-8" minHeight={120} />
          </>
        )}
        
        {/* Calculation History */}
        <CalculationHistory type="decimo-terceiro" />
      </div>
      </div>
    </>
  );
}