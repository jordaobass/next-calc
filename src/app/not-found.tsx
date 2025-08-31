import Link from 'next/link';
import { Calculator, Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  const popularCalculators = [
    { name: 'Rescisão Trabalhista', href: '/calculadoras/rescisao' },
    { name: 'Férias', href: '/calculadoras/ferias' },
    { name: '13º Salário', href: '/calculadoras/decimo-terceiro' },
    { name: 'FGTS', href: '/calculadoras/fgts' },
    { name: 'Horas Extras', href: '/calculadoras/horas-extras' },
    { name: 'INSS', href: '/calculadoras/inss' },
  ];

  return (
    <div className="container mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-emerald-600 mb-4">404</div>
          <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
          <p className="text-muted-foreground text-lg">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Search Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Search className="h-5 w-5 text-emerald-600" />
              Que tal tentar uma dessas opções?
            </CardTitle>
            <CardDescription>
              Calculadoras mais procuradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {popularCalculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <Calculator className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">{calc.name}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" asChild>
            <Link href="/calculadoras">
              <Calculator className="h-4 w-4 mr-2" />
              Ver Todas as Calculadoras
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Se você chegou aqui através de um link, pode ser que ele esteja quebrado ou desatualizado.
          </p>
          <p className="mt-2">
            Em caso de dúvidas, entre em contato:{' '}
            <a 
              href="mailto:contato@nextcalc.com.br" 
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