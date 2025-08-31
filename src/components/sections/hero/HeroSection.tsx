import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const popularCalculators = [
  {
    title: 'Rescisão Trabalhista',
    description: 'Calcule todos os valores de rescisão',
    href: '/calculadoras/rescisao',
    icon: Calculator,
  },
  {
    title: 'Férias',
    description: 'Calcule o valor das suas férias',
    href: '/calculadoras/ferias',
    icon: Calculator,
  },
  {
    title: '13º Salário',
    description: 'Calcule o décimo terceiro salário',
    href: '/calculadoras/decimo-terceiro',
    icon: Calculator,
  },
  {
    title: 'FGTS',
    description: 'Calcule o valor do FGTS',
    href: '/calculadoras/fgts',
    icon: Calculator,
  },
];

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Content */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Calculadora{' '}
            <span className="text-emerald-600">Trabalhista</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Calcule seus direitos trabalhistas de forma gratuita e precisa.
            Rescisão, férias, 13º salário, FGTS e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/calculadoras">
                Ver Todas as Calculadoras
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/sobre">
                Saiba Mais
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCalculators.map((calculator) => (
            <Card key={calculator.href} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Link href={calculator.href} className="block space-y-4">
                  <div className="flex items-center space-x-3">
                    <calculator.icon className="h-6 w-6 text-emerald-600" />
                    <h3 className="font-semibold">{calculator.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {calculator.description}
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}