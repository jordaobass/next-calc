import Link from 'next/link';
import { ArrowRight, Calculator, Download, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ctaCards = [
  {
    title: 'Rescisão Trabalhista',
    description: 'Calcule todos os valores da sua rescisão em segundos',
    icon: Calculator,
    href: '/calculadoras/rescisao',
    highlight: true,
    benefits: ['Aviso prévio', 'Multa FGTS', '13º proporcional', 'Férias + 1/3'],
  },
  {
    title: 'Férias',
    description: 'Descubra quanto você tem direito a receber',
    icon: Download,
    href: '/calculadoras/ferias',
    highlight: false,
    benefits: ['Férias vencidas', 'Férias proporcionais', '1/3 constitucional', 'Abono pecuniário'],
  },
  {
    title: 'FGTS',
    description: 'Calcule seu saldo e simule saques',
    icon: Shield,
    href: '/calculadoras/fgts',
    highlight: false,
    benefits: ['Saldo atual', 'Projeções futuras', 'Saques permitidos', 'Rentabilidade'],
  },
];

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Main CTA */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Calcule seus direitos trabalhistas
            <span className="block text-emerald-200">agora mesmo</span>
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            Mais de 50.000 trabalhadores já descobriram seus direitos. 
            Não perca tempo, calcule grátis em menos de 2 minutos.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ctaCards.map((card, index) => (
            <Card 
              key={index} 
              className={`h-full transition-all duration-300 hover:scale-105 ${
                card.highlight 
                  ? 'ring-4 ring-yellow-400 shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
            >
              <CardContent className="p-6">
                <Link href={card.href} className="block space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      card.highlight ? 'bg-yellow-400' : 'bg-emerald-100'
                    }`}>
                      <card.icon className={`h-6 w-6 ${
                        card.highlight ? 'text-emerald-800' : 'text-emerald-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{card.title}</h3>
                      {card.highlight && (
                        <span className="text-xs bg-yellow-400 text-emerald-800 px-2 py-1 rounded-full font-semibold">
                          MAIS POPULAR
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="space-y-1">
                    {card.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 ${
                      card.highlight 
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-emerald-800' 
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    Calcular Agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex items-center justify-center space-x-3">
            <Clock className="h-6 w-6 text-emerald-200" />
            <div>
              <p className="font-semibold">Resultado em 30s</p>
              <p className="text-sm text-emerald-200">Cálculo instantâneo</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Shield className="h-6 w-6 text-emerald-200" />
            <div>
              <p className="font-semibold">100% Gratuito</p>
              <p className="text-sm text-emerald-200">Sem cadastro ou taxas</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Download className="h-6 w-6 text-emerald-200" />
            <div>
              <p className="font-semibold">Relatório em PDF</p>
              <p className="text-sm text-emerald-200">Profissional e detalhado</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
          >
            <Link href="/calculadoras">
              Ver Todas as Calculadoras
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-emerald-200 text-sm mt-4">
            Acesso ilimitado • Sempre atualizado • 100% confiável
          </p>
        </div>
      </div>
    </section>
  );
}