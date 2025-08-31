'use client';

import { useState } from 'react';
import { SeguroDesempregoForm } from '@/components/calculators/seguro-desemprego/SeguroDesempregoForm';
import { SeguroDesempregoResult } from '@/components/calculators/seguro-desemprego/SeguroDesempregoResult';
import { RelatedCalculators } from '@/components/calculators/shared/RelatedCalculators';
import { EducationalContent } from '@/components/calculators/shared/EducationalContent';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { calculateSeguroDesemprego, SeguroDesempregoResult as SeguroDesempregoResultType } from '@/lib/calculations/seguro-desemprego';
import { SeguroDesempregoInput } from '@/lib/validations/seguro-desemprego-schema';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { LeaderboardAd, RectangleAd } from '@/components/shared/AdPlaceholder';

export default function SeguroDesempregoPage() {
  const [result, setResult] = useState<SeguroDesempregoResultType | null>(null);
  const [inputData, setInputData] = useState<SeguroDesempregoInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { trackCalculation, trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: SeguroDesempregoInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateSeguroDesemprego(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Track analytics
      trackCalculation('seguro-desemprego', calculationResult.totalValue);
      
      // Add to calculation history
      const eligibilityStatus = calculationResult.isEligible ? 'Elegível' : 'Não Elegível';
      
      addCalculation(
        'seguro-desemprego',
        `Seguro Desemprego - ${eligibilityStatus}`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.totalValue,
          netValue: calculationResult.totalValue,
          description: calculationResult.isEligible 
            ? `${calculationResult.parcelsQuantity} parcelas de ${formatCurrency(calculationResult.parcels[0]?.value || 0)}`
            : `Não elegível - ${calculationResult.details.disqualificationReasons[0] || 'Requisitos não atendidos'}`
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
      trackPDFDownload('seguro-desemprego');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      const shareText = result.isEligible 
        ? `Seguro Desemprego: ${result.parcelsQuantity} parcelas de ${formatCurrency(result.parcels[0]?.value || 0)} = ${formatCurrency(result.totalValue)}`
        : 'Análise de Seguro Desemprego - Consulte os requisitos';
        
      navigator.share({
        title: 'Cálculo de Seguro Desemprego 2024',
        text: shareText,
        url: window.location.href,
      }).then(() => {
        trackShare('seguro-desemprego', 'native');
      }).catch(() => {
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = result.isEligible 
      ? `Cálculo de Seguro Desemprego 2024\nTotal: ${formatCurrency(result.totalValue)}\nCalcule o seu: ${window.location.href}`
      : `Análise de Seguro Desemprego 2024\nConsulte os requisitos: ${window.location.href}`;
      
    navigator.clipboard.writeText(text).then(() => {
      trackShare('seguro-desemprego', 'clipboard');
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Seguro Desemprego', url: `${siteConfig.url}/calculadoras/seguro-desemprego` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Seguro Desemprego 2024',
    'Calcule as parcelas do seguro desemprego conforme Lei 7.998/90. Verifique elegibilidade, valores e cronograma de pagamentos.',
    `${siteConfig.url}/calculadoras/seguro-desemprego`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Calculadora de Seguro Desemprego 2024</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcule as parcelas do seguro desemprego e verifique sua elegibilidade conforme Lei 7.998/90. 
            Até 5 parcelas, máximo R$ 2.313,74 por parcela.
          </p>
        </div>

        {/* Ad Above Form */}
        <LeaderboardAd className="mb-8" />

        <div className="max-w-6xl mx-auto space-y-8">
          <SeguroDesempregoForm onCalculate={handleCalculate} loading={loading} />
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ {error}</p>
            </div>
          )}
          
          {result && (
            <>
              {/* Ad Between Form and Result */}
              <RectangleAd className="mx-auto" />
              
              <SeguroDesempregoResult 
                result={result} 
                onExportPDF={handleExportPDF}
                onShare={handleShare}
              />
            </>
          )}
          
          {/* Educational Content */}
          <EducationalContent calculatorType="seguro-desemprego" />
          
          {/* Calculation History */}
          <CalculationHistory type="seguro-desemprego" />
          
          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="/calculadoras/seguro-desemprego"
            title="Outras Calculadoras Trabalhistas"
          />
        </div>
      </div>
    </>
  );
}