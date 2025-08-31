'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { HorasExtrasForm } from '@/components/calculators/horas-extras/HorasExtrasForm';
import { HorasExtrasResult } from '@/components/calculators/horas-extras/HorasExtrasResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateHorasExtras, HorasExtrasResult as HorasExtrasResultType } from '@/lib/calculations/horas-extras';
import { HorasExtrasInput } from '@/lib/validations/horas-extras-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function HorasExtrasPage() {
  const [result, setResult] = useState<HorasExtrasResultType | null>(null);
  const [inputData, setInputData] = useState<HorasExtrasInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: HorasExtrasInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateHorasExtras(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('horas-extras', { salary: data.salary });
      
      // Add to calculation history
      addCalculation(
        'horas-extras',
        `Horas Extras - ${calculationResult.totalExtraHours}h`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.totalExtraValue,
          netValue: calculationResult.totalWithDSR,
          description: `${calculationResult.totalExtraHours}h extras - Salário: ${formatCurrency(data.salary)}`
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
      trackPDFDownload('horas-extras');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de Horas Extras',
        text: `Total: ${formatCurrency(result.totalWithDSR)}`,
        url: window.location.href,
      }).then(() => {
        trackShare('horas-extras', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Horas Extras\\nTotal: ${formatCurrency(result.totalWithDSR)}\\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('horas-extras', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Horas Extras', url: `${siteConfig.url}/calculadoras/horas-extras` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Horas Extras',
    'Calcule o valor das horas extras com adicional de 50%, trabalho em domingos e feriados (100%) e adicional noturno (20%). Inclui cálculo do DSR.',
    `${siteConfig.url}/calculadoras/horas-extras`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de Horas Extras</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o valor das horas extras com adicional de 50%, trabalho em domingos e feriados (100%) 
            e adicional noturno (20%). Inclui cálculo automático do DSR.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <HorasExtrasForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <HorasExtrasResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="horas-extras" />
          
          {/* Calculation History */}
          <CalculationHistory type="horas-extras" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/horas-extras"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}