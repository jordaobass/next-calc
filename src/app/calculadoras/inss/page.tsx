'use client';

import { useState } from 'react';
import { INSSForm } from '@/components/calculators/inss/INSSForm';
import { INSSResult } from '@/components/calculators/inss/INSSResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateINSS, INSSResult as INSSResultType } from '@/lib/calculations/inss';
import { INSSInput } from '@/lib/validations/inss-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function INSSPage() {
  const [result, setResult] = useState<INSSResultType | null>(null);
  const [inputData, setInputData] = useState<INSSInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: INSSInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateINSS(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('inss', { salary: data.salary });
      
      // Add to calculation history
      addCalculation(
        'inss',
        `INSS - ${calculationResult.effectiveRate.toFixed(1)}%`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.grossSalary,
          netValue: calculationResult.netSalary,
          description: `Desconto: ${formatCurrency(calculationResult.inssDiscount)} - Salário: ${formatCurrency(data.salary)}`
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
      trackPDFDownload('inss');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de INSS 2024',
        text: `Desconto: ${formatCurrency(result.inssDiscount)} (${result.effectiveRate.toFixed(1)}%)`,
        url: window.location.href,
      }).then(() => {
        trackShare('inss', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de INSS 2024\\nDesconto: ${formatCurrency(result.inssDiscount)}\\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('inss', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'INSS', url: `${siteConfig.url}/calculadoras/inss` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de INSS 2024',
    'Calcule o desconto do INSS com a tabela atualizada para 2024. Alíquotas progressivas de 7,5% a 14% com teto de R$ 7.786,02.',
    `${siteConfig.url}/calculadoras/inss`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de INSS 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule o desconto do INSS com a tabela oficial atualizada para 2024. 
            Alíquotas progressivas de 7,5% a 14% com teto de contribuição de R$ 7.786,02.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <INSSForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <INSSResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="inss" />
          
          {/* Calculation History */}
          <CalculationHistory type="inss" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/inss"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}