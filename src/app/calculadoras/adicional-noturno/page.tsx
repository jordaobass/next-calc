'use client';

import { useState } from 'react';
import { AdicionalNoturnoForm } from '@/components/calculators/adicional-noturno/AdicionalNoturnoForm';
import { AdicionalNoturnoResult } from '@/components/calculators/adicional-noturno/AdicionalNoturnoResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateAdicionalNoturno, AdicionalNoturnoResult as AdicionalNoturnoResultType } from '@/lib/calculations/adicional-noturno';
import { AdicionalNoturnoInput } from '@/lib/validations/adicional-noturno-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function AdicionalNoturnoPage() {
  const [result, setResult] = useState<AdicionalNoturnoResultType | null>(null);
  const [inputData, setInputData] = useState<AdicionalNoturnoInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: AdicionalNoturnoInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateAdicionalNoturno(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('adicional-noturno', calculationResult.additionalValue);
      
      // Add to calculation history
      addCalculation(
        'adicional-noturno',
        `Adicional Noturno - ${calculationResult.additionalRate}% (${calculationResult.details.workType === 'urban' ? 'Urbano' : 'Rural'})`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.baseSalary,
          netValue: calculationResult.totalSalary,
          description: `Adicional: ${formatCurrency(calculationResult.additionalValue)} - Salário: ${formatCurrency(data.salary)}`
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
      // TODO: Implement PDF export
      trackPDFDownload('adicional-noturno');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de Adicional Noturno 2024',
        text: `Adicional Noturno: ${formatCurrency(result.additionalValue)} (${result.additionalRate}% - ${result.details.workType === 'urban' ? 'Urbano' : 'Rural'})`,
        url: window.location.href,
      }).then(() => {
        trackShare('adicional-noturno', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Adicional Noturno 2024\nAdicional: ${formatCurrency(result.additionalValue)}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('adicional-noturno', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Adicional Noturno', url: `${siteConfig.url}/calculadoras/adicional-noturno` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Adicional Noturno 2024',
    'Calcule o adicional noturno de 20% (urbano) ou 25% (rural) para trabalho no período noturno conforme CLT Art. 73.',
    `${siteConfig.url}/calculadoras/adicional-noturno`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de Adicional Noturno 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o adicional noturno de 20% (urbano) ou 25% (rural) para trabalho no período noturno. 
            Urbano: 22h às 5h | Rural: 21h às 5h | Hora reduzida: 52min30s.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <AdicionalNoturnoForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <AdicionalNoturnoResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="adicional-noturno" />
          
          {/* Calculation History */}
          <CalculationHistory type="adicional-noturno" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/adicional-noturno"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}