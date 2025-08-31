'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import { FGTSResult } from '@/lib/calculations/fgts';
import { formatCurrency } from '@/lib/calculations/utils';

interface FgtsResultProps {
  result: FGTSResult;
  onExportPDF: () => void;
  onShare: () => void;
}

export function FgtsResult({ result, onExportPDF, onShare }: FgtsResultProps) {
  return (
    <div className="space-y-6">
      {/* Resumo Principal */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Resultado do Cálculo FGTS</CardTitle>
              <CardDescription>
                Tempo de serviço: {result.details.serviceTime}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onExportPDF}>
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Depósito Mensal</p>
              <p className="text-2xl font-bold text-emerald-600">
                {formatCurrency(result.monthlyDeposit)}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Depositado</p>
              <p className="text-2xl font-bold">
                {formatCurrency(result.totalDeposits)}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Saldo Atual</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.currentBalance)}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Saldo Projetado</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.projectedBalance)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulação de Saques */}
      <Card>
        <CardHeader>
          <CardTitle>Simulação de Saques</CardTitle>
          <CardDescription>
            Valores disponíveis conforme o tipo de rescisão
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Demissão sem Justa Causa</h4>
                  <p className="text-sm text-red-600">Saldo + 40% de multa</p>
                  <p className="text-xl font-bold text-red-700">
                    {formatCurrency(result.withdrawalSimulation.dismissalWithoutCause)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-800">Acordo Mútuo</h4>
                  <p className="text-sm text-orange-600">Saldo + 20% de multa</p>
                  <p className="text-xl font-bold text-orange-700">
                    {formatCurrency(result.withdrawalSimulation.mutualAgreement)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-gray-50 border-gray-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Pedido de Demissão</h4>
                  <p className="text-sm text-gray-600">Não pode sacar</p>
                  <p className="text-xl font-bold text-gray-700">
                    {formatCurrency(result.withdrawalSimulation.resignationNoWithdrawal)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">Casa Própria</h4>
                  <p className="text-sm text-green-600">Valor total disponível</p>
                  <p className="text-xl font-bold text-green-700">
                    {formatCurrency(result.withdrawalSimulation.homeFinancing)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Cálculo */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo de serviço:</span>
                  <span className="font-medium">{result.details.serviceTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total de meses:</span>
                  <span className="font-medium">{result.details.totalMonths}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rendimento anual:</span>
                  <span className="font-medium">{(result.details.annualYield * 100).toFixed(2)}%</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contribuição mensal:</span>
                  <span className="font-medium">{formatCurrency(result.monthlyDeposit)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total contribuído:</span>
                  <span className="font-medium">{formatCurrency(result.details.companyContribution)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Direito do trabalhador:</span>
                  <span className="font-medium">{formatCurrency(result.details.workerRight)}</span>
                </div>
              </div>
            </div>

            <div className="border-t my-4"></div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Informações Importantes:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• O FGTS rende TR + 3% ao ano</li>
                <li>• Valores são atualizados mensalmente pela Caixa Econômica Federal</li>
                <li>• Para consultar saldo atualizado, acesse o app FGTS ou internet banking da Caixa</li>
                <li>• A multa de 40% é paga pelo empregador em caso de demissão sem justa causa</li>
                <li>• Em acordo mútuo, o trabalhador recebe 50% da multa (20%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}