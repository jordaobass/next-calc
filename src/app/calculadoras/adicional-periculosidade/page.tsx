'use client';

import { useState } from 'react';
import { PericulosidadeForm } from '@/components/calculators/periculosidade/PericulosidadeForm';
import { PericulosidadeResult } from '@/components/calculators/periculosidade/PericulosidadeResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculatePericulosidade, PericulosidadeResult as PericulosidadeResultType } from '@/lib/calculations/adicional-periculosidade';
import { PericulosidadeInput } from '@/lib/validations/periculosidade-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function PericulosidadePage() {
  const [result, setResult] = useState<PericulosidadeResultType | null>(null);
  const [inputData, setInputData] = useState<PericulosidadeInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: PericulosidadeInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculatePericulosidade(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('periculosidade', calculationResult.additionalValue);
      
      // Add to calculation history
      addCalculation(
        'periculosidade',
        `Periculosidade - ${calculationResult.additionalRate.toFixed(1)}%`,
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
      trackPDFDownload('periculosidade');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de Adicional de Periculosidade 2024',
        text: `Adicional de Periculosidade: ${formatCurrency(result.additionalValue)} (${result.additionalRate.toFixed(1)}%)`,
        url: window.location.href,
      }).then(() => {
        trackShare('periculosidade', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Adicional de Periculosidade 2024\nAdicional: ${formatCurrency(result.additionalValue)}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('periculosidade', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Adicional de Periculosidade', url: `${siteConfig.url}/calculadoras/adicional-periculosidade` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Adicional de Periculosidade 2024',
    'Calcule o adicional de periculosidade de 30% sobre o salário base para atividades perigosas conforme CLT Art. 193 e NR-16.',
    `${siteConfig.url}/calculadoras/adicional-periculosidade`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de Adicional de Periculosidade 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o adicional de periculosidade de 30% sobre o salário base para atividades perigosas 
            conforme CLT Art. 193 e NR-16. Cálculo integral ou proporcional às horas de exposição.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <PericulosidadeForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <PericulosidadeResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="periculosidade" />
          
          {/* Calculation History */}
          <CalculationHistory type="periculosidade" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/adicional-periculosidade"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}