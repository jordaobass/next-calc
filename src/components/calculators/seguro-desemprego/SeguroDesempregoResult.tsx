'use client';

import { Banknote, Download, Share2, Calculator, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/calculations/utils';
import { SeguroDesempregoResult as SeguroDesempregoResultType } from '@/lib/calculations/seguro-desemprego';
import { ResultSharing } from '../shared/ResultSharing';

interface SeguroDesempregoResultProps {
  result: SeguroDesempregoResultType;
  onExportPDF?: () => void;
  onShare?: () => void;
}

export function SeguroDesempregoResult({ result, onExportPDF, onShare }: SeguroDesempregoResultProps) {
  const { details } = result;

  if (!result.isEligible) {
    return (
      <div className="space-y-6">
        {/* Resultado - Não Elegível */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-800 flex items-center justify-center gap-2">
              <XCircle className="h-6 w-6" />
              Não Elegível para Seguro Desemprego
            </CardTitle>
            <CardDescription className="text-red-700 mt-4">
              Baseado nos dados informados, você não atende aos requisitos para receber o seguro desemprego.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Motivos da Inelegibilidade */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              Motivos da Inelegibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {details.disqualificationReasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-2 text-red-700">
                  <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requisitos para Elegibilidade */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Info className="h-5 w-5" />
              Requisitos para Elegibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {details.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start space-x-2 text-blue-700">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{requirement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regras por Solicitação */}
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-gray-800">Tempo Mínimo por Solicitação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {details.eligibilityRules.map((rule, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <span className="text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Informações Legais */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-semibold text-yellow-800">Informações Importantes</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>• <strong>Base legal:</strong> {details.legalBasis}</p>
                  <p>• <strong>Orientação:</strong> Procure o SINE ou acesse gov.br para mais informações</p>
                  <p>• <strong>Documentação:</strong> Mantenha seus documentos trabalhistas em ordem</p>
                  <p>• Este cálculo é uma estimativa. Consulte o órgão competente.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onExportPDF && (
            <Button
              onClick={onExportPDF}
              variant="outline"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar PDF
            </Button>
          )}
          
          {onShare && (
            <Button
              onClick={onShare}
              variant="outline"
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resultado - Elegível */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-800 flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Elegível para Seguro Desemprego
          </CardTitle>
          <div className="text-4xl font-bold text-green-600 mt-2">
            {formatCurrency(result.totalValue)}
          </div>
          <CardDescription className="text-green-700">
            {result.parcelsQuantity} parcelas de {formatCurrency(result.parcels[0]?.value || 0)}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 mb-1">
              {formatCurrency(result.averageSalary)}
            </div>
            <div className="text-sm text-muted-foreground">Média Salarial</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {result.parcelsQuantity}x
            </div>
            <div className="text-sm text-muted-foreground">Parcelas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(result.parcels[0]?.value || 0)}
            </div>
            <div className="text-sm text-muted-foreground">Por Parcela</div>
          </CardContent>
        </Card>
      </div>

      {/* Cronograma de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-emerald-600" />
            Cronograma de Pagamentos
          </CardTitle>
          <CardDescription>
            Valores e datas estimadas das parcelas do seguro desemprego
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.parcels.map((parcel, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {parcel.parcel}
                  </div>
                  <div>
                    <h4 className="font-semibold">{parcel.parcel}ª Parcela</h4>
                    <p className="text-sm text-muted-foreground">{parcel.paymentMonth}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(parcel.value)}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">VALOR TOTAL:</span>
                <span className="font-bold text-xl text-green-600">
                  {formatCurrency(result.totalValue)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes da Elegibilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            Análise de Elegibilidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-sm text-muted-foreground">MESES TRABALHADOS</h5>
              <p className="text-lg font-bold">{details.monthsWorked} meses</p>
            </div>
            <div>
              <h5 className="font-medium text-sm text-muted-foreground">MÍNIMO EXIGIDO</h5>
              <p className="text-lg font-bold">{details.minimumMonthsRequired} meses</p>
            </div>
            <div>
              <h5 className="font-medium text-sm text-muted-foreground">SOLICITAÇÕES ANTERIORES</h5>
              <p className="text-lg font-bold">{details.previousRequests}</p>
            </div>
            <div>
              <h5 className="font-medium text-sm text-muted-foreground">MOTIVO DA DEMISSÃO</h5>
              <p className="text-lg font-bold">{details.dismissalReason}</p>
            </div>
          </div>

          <div className="bg-green-100 p-3 rounded-lg">
            <h5 className="font-semibold mb-2 text-green-800">✅ Requisitos Atendidos:</h5>
            <div className="space-y-1">
              {details.requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-green-700">
                  <CheckCircle className="h-3 w-3 flex-shrink-0" />
                  <span>{requirement}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Como Solicitar */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Info className="h-5 w-5" />
            Como Solicitar o Seguro Desemprego
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-semibold mb-2">ONDE SOLICITAR:</h5>
                <ul className="space-y-1">
                  <li>• SINE (Sistema Nacional de Emprego)</li>
                  <li>• App Carteira de Trabalho Digital</li>
                  <li>• Portal gov.br</li>
                  <li>• Agências da Caixa Econômica Federal</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">DOCUMENTOS NECESSÁRIOS:</h5>
                <ul className="space-y-1">
                  <li>• RG ou CNH</li>
                  <li>• CPF</li>
                  <li>• Carteira de Trabalho</li>
                  <li>• Termo de Rescisão (TRCT)</li>
                  <li>• Comprovante de endereço</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-100 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>⏰ Prazo:</strong> Você tem até 120 dias após a demissão para solicitar o seguro desemprego.
                Não perca o prazo!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Legais */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="font-semibold text-yellow-800">Informações Importantes</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• <strong>Base legal:</strong> {details.legalBasis}</p>
                <p>• <strong>Pagamento:</strong> Caixa Econômica Federal mensalmente</p>
                <p>• <strong>Valor máximo:</strong> R$ 2.313,74 por parcela (2024)</p>
                <p>• <strong>Recadastramento:</strong> Comparecer mensalmente ao SINE</p>
                <p>• <strong>Perda do direito:</strong> Recusa de emprego adequado pode cancelar o benefício</p>
                <p>• Este cálculo é uma simulação. Valores podem variar conforme análise do SINE.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onExportPDF && (
          <Button
            onClick={onExportPDF}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        )}
        
        {onShare && (
          <Button
            onClick={onShare}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        )}
      </div>

      {/* Compartilhamento */}
      <ResultSharing
        title="Cálculo de Seguro Desemprego"
        description={`Calcule as parcelas do seguro desemprego conforme Lei 7.998/90. ${result.parcelsQuantity} parcelas de ${formatCurrency(result.parcels[0]?.value || 0)}.`}
        value={formatCurrency(result.totalValue)}
        calculatorType="seguro-desemprego"
        onExportPDF={onExportPDF}
      />
    </div>
  );
}