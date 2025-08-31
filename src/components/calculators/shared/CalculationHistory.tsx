'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  History, 
  Trash2, 
  Eye, 
  Calendar,
  TrendingUp,
  BarChart3,
  Clock
} from 'lucide-react';
import { useCalculationHistory, CalculationHistoryItem } from '@/lib/hooks/useCalculationHistory';
import { formatCurrency } from '@/lib/calculations/utils';

interface CalculationHistoryProps {
  type?: CalculationHistoryItem['type'];
  showAll?: boolean;
  onSelectCalculation?: (item: CalculationHistoryItem) => void;
}

export function CalculationHistory({ 
  type, 
  showAll = false, 
  onSelectCalculation 
}: CalculationHistoryProps) {
  const {
    history,
    isLoading,
    removeCalculation,
    clearHistory,
    getHistoryByType,
    getRecentCalculations,
    formatDate,
    getTypeLabel,
    getTypeIcon,
    getStatistics,
  } = useCalculationHistory();

  const [showFullHistory, setShowFullHistory] = useState(showAll);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            <span className="ml-2 text-sm text-muted-foreground">Carregando histórico...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayHistory = type 
    ? getHistoryByType(type)
    : showFullHistory 
      ? history 
      : getRecentCalculations();

  const stats = getStatistics();

  if (displayHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Cálculos
          </CardTitle>
          <CardDescription>
            Seus cálculos anteriores aparecerão aqui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mx-auto h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <History className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {type 
                ? `Nenhum cálculo de ${getTypeLabel(type)} encontrado`
                : 'Nenhum cálculo realizado ainda'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Statistics Summary */}
      {!type && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(stats.totalCalculatedValue)}
                  </p>
                  <p className="text-xs text-muted-foreground">Calculado</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.byType.rescisao}</p>
                  <p className="text-xs text-muted-foreground">Rescisões</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.byType.ferias}</p>
                  <p className="text-xs text-muted-foreground">Férias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* History List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <CardTitle>
                {type ? `Histórico de ${getTypeLabel(type)}` : 'Histórico de Cálculos'}
              </CardTitle>
            </div>
            <div className="flex gap-2">
              {!type && history.length > 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFullHistory(!showFullHistory)}
                >
                  {showFullHistory ? 'Mostrar Menos' : 'Ver Todos'}
                </Button>
              )}
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpar
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getTypeIcon(item.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(item.type)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.summary.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {item.summary.netValue && (
                    <div className="text-right mr-4">
                      <p className="font-semibold text-emerald-600">
                        {formatCurrency(item.summary.netValue)}
                      </p>
                      <p className="text-xs text-muted-foreground">Líquido</p>
                    </div>
                  )}
                  
                  <div className="flex gap-1">
                    {onSelectCalculation && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectCalculation(item)}
                        title="Visualizar detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCalculation(item.id)}
                      title="Remover cálculo"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {!showFullHistory && history.length > 5 && (
            <div className="text-center mt-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowFullHistory(true)}
              >
                Ver mais {history.length - 5} cálculos...
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}