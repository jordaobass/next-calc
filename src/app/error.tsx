'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro para monitoramento
    console.error('Application error:', error);
  }, [error]);

  const handleRetry = () => {
    // Limpa o localStorage em caso de dados corrompidos
    try {
      localStorage.removeItem('nextcalc-history');
      localStorage.removeItem('nextcalc-preferences');
    } catch (e) {
      console.warn('Erro ao limpar localStorage:', e);
    }
    
    reset();
  };

  const errorMessage = error.message || 'Ocorreu um erro inesperado';
  const isNetworkError = errorMessage.toLowerCase().includes('fetch') || 
                        errorMessage.toLowerCase().includes('network');

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2 text-red-700">Ops! Algo deu errado</h1>
          <p className="text-muted-foreground text-lg">
            {isNetworkError 
              ? 'Parece que houve um problema de conexão.'
              : 'Encontramos um erro inesperado. Nossa equipe já foi notificada.'
            }
          </p>
        </div>

        {/* Error Details */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle className="text-red-600 text-sm">Detalhes do Erro (Desenvolvimento)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-red-600 whitespace-pre-wrap break-all">
                {error.message}
                {error.digest && ` (ID: ${error.digest})`}
              </pre>
            </CardContent>
          </Card>
        )}

        {/* Solutions Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5 text-emerald-600" />
              O que você pode fazer?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <RefreshCw className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Tente novamente</h4>
                <p className="text-sm text-muted-foreground">
                  Clique no botão &quot;Tentar Novamente&quot; abaixo para recarregar a página.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Limpe o cache</h4>
                <p className="text-sm text-muted-foreground">
                  Pressione Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac) para forçar recarregamento.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calculator className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">Use outra calculadora</h4>
                <p className="text-sm text-muted-foreground">
                  Enquanto isso, experimente outras calculadoras que estão funcionando normalmente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleRetry} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar Novamente
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/calculadoras">
              <Calculator className="h-4 w-4 mr-2" />
              Outras Calculadoras
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <p className="mb-2">
            <strong>Problema persistente?</strong>
          </p>
          <p>
            Se o erro continuar acontecendo, entre em contato conosco com uma descrição 
            do que você estava fazendo quando o erro ocorreu:
          </p>
          <p className="mt-2">
            <a 
              href={`mailto:contato@nextcalc.com.br?subject=Erro na plataforma&body=Erro: ${encodeURIComponent(errorMessage)}%0A%0AO que eu estava fazendo: %0A%0ANavegador: ${encodeURIComponent(navigator.userAgent)}`}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              contato@nextcalc.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}