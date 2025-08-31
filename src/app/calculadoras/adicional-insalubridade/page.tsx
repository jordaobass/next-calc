'use client';

import { useState } from 'react';
import { AdicionalInsalubridadeForm } from '@/components/calculators/adicional-insalubridade/AdicionalInsalubridadeForm';
import { AdicionalInsalubridadeResult } from '@/components/calculators/adicional-insalubridade/AdicionalInsalubridadeResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateAdicionalInsalubridade, AdicionalInsalubridadeResult as AdicionalInsalubridadeResultType } from '@/lib/calculations/adicional-insalubridade';
import { AdicionalInsalubridadeInput } from '@/lib/validations/adicional-insalubridade-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function AdicionalInsalubridadePage() {
  const [result, setResult] = useState<AdicionalInsalubridadeResultType | null>(null);
  const [inputData, setInputData] = useState<AdicionalInsalubridadeInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: AdicionalInsalubridadeInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateAdicionalInsalubridade(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('adicional-insalubridade', calculationResult.additionalValue);
      
      // Add to calculation history
      const gradeName = calculationResult.details.insalubricadeGrade === 'minimum' ? 'Mínimo' : 
                       calculationResult.details.insalubricadeGrade === 'medium' ? 'Médio' : 'Máximo';
      
      addCalculation(
        'adicional-insalubridade',
        `Insalubridade - Grau ${gradeName} (${calculationResult.additionalRate}%)`,
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
      trackPDFDownload('adicional-insalubridade');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      const gradeName = result.details.insalubricadeGrade === 'minimum' ? 'Mínimo' : 
                       result.details.insalubricadeGrade === 'medium' ? 'Médio' : 'Máximo';
      
      navigator.share({
        title: 'Cálculo de Adicional de Insalubridade 2024',
        text: `Adicional de Insalubridade: ${formatCurrency(result.additionalValue)} (Grau ${gradeName} - ${result.additionalRate}%)`,
        url: window.location.href,
      }).then(() => {
        trackShare('adicional-insalubridade', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Adicional de Insalubridade 2024\nAdicional: ${formatCurrency(result.additionalValue)}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('adicional-insalubridade', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Adicional de Insalubridade', url: `${siteConfig.url}/calculadoras/adicional-insalubridade` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Adicional de Insalubridade 2024',
    'Calcule o adicional de insalubridade sobre o salário mínimo conforme grau de exposição: mínimo (10%), médio (20%) ou máximo (40%).',
    `${siteConfig.url}/calculadoras/adicional-insalubridade`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de Adicional de Insalubridade 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o adicional de insalubridade sobre o salário mínimo conforme o grau de exposição. 
            Mínimo: 10% | Médio: 20% | Máximo: 40%. Perícia técnica obrigatória (NR-15).
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <AdicionalInsalubridadeForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <AdicionalInsalubridadeResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="adicional-insalubridade" />
          
          {/* Calculation History */}
          <CalculationHistory type="adicional-insalubridade" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/adicional-insalubridade"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}