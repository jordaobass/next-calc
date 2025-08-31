import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedCalculator {
  title: string;
  description: string;
  href: string;
  popular?: boolean;
  benefits: string[];
}

const allCalculators: RelatedCalculator[] = [
  {
    title: 'Rescisão Trabalhista',
    description: 'Calcule todos os valores da rescisão de acordo com a CLT',
    href: '/calculadoras/rescisao',
    popular: true,
    benefits: ['Aviso prévio', 'Multa FGTS', '13º proporcional', 'Férias + 1/3'],
  },
  {
    title: 'Férias',
    description: 'Calcule férias proporcionais e integrais com 1/3 constitucional',
    href: '/calculadoras/ferias',
    popular: true,
    benefits: ['Férias vencidas', 'Férias proporcionais', '1/3 constitucional', 'Abono pecuniário'],
  },
  {
    title: '13º Salário',
    description: 'Calcule o décimo terceiro salário proporcional e integral',
    href: '/calculadoras/decimo-terceiro',
    popular: true,
    benefits: ['13º integral', '13º proporcional', 'Desconto INSS', 'Desconto IRRF'],
  },
  {
    title: 'FGTS',
    description: 'Calcule o saldo do FGTS e simule saques permitidos',
    href: '/calculadoras/fgts',
    popular: true,
    benefits: ['Saldo atual', 'Multa 40%', 'Saques permitidos', 'Projeções'],
  },
  {
    title: 'Horas Extras',
    description: 'Calcule o valor das horas extras com adicional de 50%',
    href: '/calculadoras/horas-extras',
    benefits: ['50% adicional', '100% feriados', 'DSR proporcional', 'Reflexos'],
  },
  {
    title: 'Adicional Noturno',
    description: 'Calcule o adicional noturno de 20% sobre o salário',
    href: '/calculadoras/adicional-noturno',
    benefits: ['20% adicional', 'Hora reduzida', 'Base de cálculo', 'Reflexos'],
  },
  {
    title: 'INSS',
    description: 'Calcule o desconto do INSS com tabela 2024 atualizada',
    href: '/calculadoras/inss',
    benefits: ['Tabela 2024', 'Faixas progressivas', 'Teto máximo', 'Simulação'],
  },
  {
    title: 'IRRF',
    description: 'Calcule o Imposto de Renda Retido na Fonte',
    href: '/calculadoras/irrf',
    benefits: ['Tabela 2024', 'Dependentes', 'Deduções', 'Alíquotas'],
  },
];

interface RelatedCalculatorsProps {
  currentCalculator?: string;
  maxItems?: number;
  showPopular?: boolean;
  title?: string;
}

export function RelatedCalculators({
  currentCalculator,
  maxItems = 3,
  showPopular = true,
  title = "Outras Calculadoras"
}: RelatedCalculatorsProps) {
  // Filter out current calculator
  const filteredCalculators = allCalculators.filter(calc => 
    calc.href !== currentCalculator
  );

  // Prioritize popular calculators
  const sortedCalculators = showPopular 
    ? filteredCalculators.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return 0;
      })
    : filteredCalculators;

  const relatedCalculators = sortedCalculators.slice(0, maxItems);

  if (relatedCalculators.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-emerald-600" />
          {title}
        </h2>
        <p className="text-muted-foreground">
          Continue calculando seus direitos trabalhistas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedCalculators.map((calculator, index) => (
          <Card 
            key={calculator.href} 
            className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-emerald-600" />
                  {calculator.popular && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-orange-600" />
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                {calculator.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {calculator.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Benefits */}
              <div className="space-y-1">
                {calculator.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                asChild 
                className="w-full bg-emerald-600 hover:bg-emerald-700 group-hover:shadow-md transition-all"
              >
                <Link href={calculator.href}>
                  Calcular Agora
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All CTA */}
      {allCalculators.length > maxItems && (
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/calculadoras">
              Ver Todas as {allCalculators.length} Calculadoras
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-emerald-600">100%</div>
            <div className="text-xs text-muted-foreground">Gratuito</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">2024</div>
            <div className="text-xs text-muted-foreground">Atualizado</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">50K+</div>
            <div className="text-xs text-muted-foreground">Cálculos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4.9★</div>
            <div className="text-xs text-muted-foreground">Avaliação</div>
          </div>
        </div>
      </div>
    </div>
  );
}