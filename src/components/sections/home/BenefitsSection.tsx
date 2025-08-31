import { Check, Calculator, Clock, FileText, Shield, Smartphone, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Calculator,
    title: 'Cálculos Precisos',
    description: 'Fórmulas atualizadas conforme a CLT e tabelas oficiais do governo para 2024.',
  },
  {
    icon: Clock,
    title: 'Resultado em Segundos',
    description: 'Obtenha seus cálculos trabalhistas em menos de 30 segundos, sem burocracia.',
  },
  {
    icon: FileText,
    title: 'Relatórios em PDF',
    description: 'Exporte relatórios profissionais para impressão ou envio por email.',
  },
  {
    icon: Shield,
    title: '100% Gratuito',
    description: 'Todas as calculadoras são gratuitas, sem cadastro ou taxas ocultas.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsivo',
    description: 'Funciona perfeitamente no celular, tablet ou desktop.',
  },
  {
    icon: TrendingUp,
    title: 'Histórico de Cálculos',
    description: 'Salve e acompanhe seus cálculos anteriores automaticamente.',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Por que escolher nosso sistema?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Desenvolvido especialmente para o trabalhador brasileiro, 
            com a precisão que seus direitos merecem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-emerald-600">10K+</div>
              <div className="text-sm text-muted-foreground">Cálculos Realizados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">4</div>
              <div className="text-sm text-muted-foreground">Calculadoras Principais</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-sm text-muted-foreground">Gratuito</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">2024</div>
              <div className="text-sm text-muted-foreground">Tabelas Atualizadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}