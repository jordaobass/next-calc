'use client';

import { useState } from 'react';
import { FeriasForm } from '@/components/calculators/ferias/FeriasForm';
import { FeriasResult } from '@/components/calculators/ferias/FeriasResult';
import { calculateVacation, VacationResult } from '@/lib/calculations/ferias';
import { VacationInput } from '@/lib/validations/calculator-schemas';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { exportVacationPDF } from '@/lib/utils/pdf-generator';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';

export default function FeriasPage() {
  const [result, setResult] = useState<VacationResult | null>(null);
  const [inputData, setInputData] = useState<VacationInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: VacationInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateVacation(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Add to calculation history
      addCalculation(
        'ferias',
        `Férias - ${data.vacationDays} dias`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.grossTotal,
          netValue: calculationResult.netTotal,
          description: `${data.vacationDays} dias de férias - Salário: ${formatCurrency(data.salary)}`
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
      await exportVacationPDF(result, inputData);
      trackPDFDownload('ferias');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de Férias',
        text: `Valor líquido a receber: R$ ${result.netTotal.toFixed(2).replace('.', ',')}`,
        url: window.location.href,
      }).then(() => {
        trackShare('ferias', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Férias\nValor líquido: R$ ${result.netTotal.toFixed(2).replace('.', ',')}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('ferias', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Férias', url: `${siteConfig.url}/calculadoras/ferias` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Férias',
    'Calcule o valor das suas férias vencidas, proporcionais e a venda de até 10 dias. Inclui 1/3 constitucional e todos os descontos legais.',
    `${siteConfig.url}/calculadoras/ferias`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">Calculadora de Férias</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calcule o valor das suas férias vencidas, proporcionais e a venda de até 10 dias.
          Inclui 1/3 constitucional e todos os descontos legais.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <FeriasForm onCalculate={handleCalculate} loading={loading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}
        
        {result && (
          <FeriasResult 
            result={result} 
            onExportPDF={handleExportPDF}
            onShare={handleShare}
          />
        )}
        
        {/* Calculation History */}
        <CalculationHistory type="ferias" />
      </div>
      </div>
    </>
  );
}