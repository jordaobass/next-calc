'use client';

import { useState } from 'react';
import { RescisaoForm } from '@/components/calculators/rescisao/RescisaoForm';
import { RescisaoResult } from '@/components/calculators/rescisao/RescisaoResult';
import { calculateRescission, RescissionResult } from '@/lib/calculations/rescisao';
import { RescissionInput } from '@/lib/validations/calculator-schemas';
import { JsonLd, calculatorSchema, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { exportRescissionPDF } from '@/lib/utils/pdf-generator';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { useCalculationHistory } from '@/lib/hooks/useCalculationHistory';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';
import { ResponsiveAd } from '@/components/shared/AdPlaceholder';

export default function RescisaoPage() {
  const [result, setResult] = useState<RescissionResult | null>(null);
  const [inputData, setInputData] = useState<RescissionInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackPDFDownload, trackShare } = useAnalytics();
  const { addCalculation } = useCalculationHistory();

  const handleCalculate = async (data: RescissionInput) => {
    setLoading(true);
    setError(null);
    
    try {
      const calculationResult = calculateRescission(data);
      setResult(calculationResult);
      setInputData(data);
      
      // Add to calculation history
      const rescissionTypeLabels: Record<string, string> = {
        'dismissal_without_cause': 'Demissão sem Justa Causa',
        'dismissal_with_cause': 'Demissão com Justa Causa',
        'resignation': 'Pedido de Demissão',
        'mutual_agreement': 'Acordo Mútuo',
        'end_of_contract': 'Fim de Contrato',
      };

      addCalculation(
        'rescisao',
        `Rescisão - ${rescissionTypeLabels[data.rescissionType] || data.rescissionType}`,
        data,
        calculationResult,
        {
          grossValue: calculationResult.grossTotal,
          netValue: calculationResult.netTotal,
          description: `${rescissionTypeLabels[data.rescissionType]} - Salário: ${formatCurrency(data.salary)}`
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
      await exportRescissionPDF(result, inputData);
      trackPDFDownload('rescisao');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      setError('Erro ao gerar PDF. Tente novamente.');
    }
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'Cálculo de Rescisão Trabalhista',
        text: `Valor líquido a receber: R$ ${result.netTotal.toFixed(2).replace('.', ',')}`,
        url: window.location.href,
      }).then(() => {
        trackShare('rescisao', 'native');
      }).catch(() => {
        // Fallback para clipboard
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    
    const text = `Cálculo de Rescisão Trabalhista\nValor líquido: R$ ${result.netTotal.toFixed(2).replace('.', ',')}\nCalcule o seu: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      trackShare('rescisao', 'clipboard');
      // TODO: Mostrar toast de sucesso
    });
  };

  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
    { name: 'Rescisão', url: `${siteConfig.url}/calculadoras/rescisao` },
  ];

  const calculatorSchemaData = calculatorSchema(
    'Calculadora de Rescisão Trabalhista',
    'Calcule todos os valores da rescisão trabalhista de forma gratuita e precisa. Saldo de salário, aviso prévio, férias, 13º salário, FGTS e multa rescisória.',
    `${siteConfig.url}/calculadoras/rescisao`
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={calculatorSchemaData} />
      <div className="container mx-auto px-4 py-8">
      {/* Ad Above Form */}
      <ResponsiveAd className="mb-8" minHeight={100} />
      
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold">Calculadora de Rescisão Trabalhista</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calcule todos os valores da rescisão trabalhista de forma gratuita e precisa.
          Saldo de salário, aviso prévio, férias, 13º salário, FGTS e multa rescisória.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <RescisaoForm onCalculate={handleCalculate} loading={loading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">❌ {error}</p>
          </div>
        )}
        
        {result && (
          <>
            <RescisaoResult 
              result={result} 
              onExportPDF={handleExportPDF}
              onShare={handleShare}
            />
            
            {/* Ad After Results */}
            <ResponsiveAd className="my-8" minHeight={120} />
          </>
        )}
        
        {/* Calculation History */}
        <CalculationHistory type="rescisao" />
      </div>
      </div>
    </>
  );
}