'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { IRRFForm } from '@/components/calculators/irrf/IRRFForm';
import { IRRFResult } from '@/components/calculators/irrf/IRRFResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateIRRF, IRRFResult as IRRFResultType } from '@/lib/calculations/irrf';
import { IRRFInput } from '@/lib/validations/irrf-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function IRRFPage() {
  const [result, setResult] = useState<IRRFResultType | null>(null);
  const [inputData, setInputData] = useState<IRRFInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: IRRFInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateIRRF(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('irrf', { salary: data.salary });
      
      // Add to calculation history
      addCalculation(
        'irrf',
        `IRRF - ${calculationResult.isExempt ? 'Isento' : calculationResult.effectiveRate.toFixed(1) + '%'}`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.grossSalary,
          netValue: calculationResult.netSalary,
          description: calculationResult.isExempt 
            ? `Isento - Base: ${formatCurrency(calculationResult.calculationBasis)}`
            : `IRRF: ${formatCurrency(calculationResult.irrfDiscount)} - Salário: ${formatCurrency(data.salary)}`
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
      trackPDFDownload('irrf');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de IRRF 2024',
        text: result.isExempt 
          ? 'Isento de IRRF'
          : `IRRF: ${formatCurrency(result.irrfDiscount)} (${result.effectiveRate.toFixed(1)}%)`,
        url: window.location.href,
      }).then(() => {
        trackShare('irrf', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de IRRF 2024\\n${result.isExempt ? 'Isento de IRRF' : `IRRF: ${formatCurrency(result.irrfDiscount)}`}\\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('irrf', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'IRRF', url: `${siteConfig.url}/calculadoras/irrf` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de IRRF 2024',
    'Calcule o Imposto de Renda Retido na Fonte com a tabela oficial 2024. Alíquotas progressivas de 7,5% a 27,5% com limite de isenção de R$ 2.112,00.',
    `${siteConfig.url}/calculadoras/irrf`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de IRRF 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o Imposto de Renda Retido na Fonte com a tabela oficial atualizada para 2024. 
            Alíquotas progressivas de 7,5% a 27,5% com limite de isenção de R$ 2.112,00.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <IRRFForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <IRRFResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="irrf" />
          
          {/* Calculation History */}
          <CalculationHistory type="irrf" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/irrf"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}