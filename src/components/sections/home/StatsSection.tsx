import { 
  Calculator, 
  Users, 
  FileText, 
  Award,
  TrendingUp,
  Clock,
  Shield,
  Smartphone
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const mainStats = [
  {
    icon: Users,
    value: '15K+',
    label: 'Usuários Ativos',
    description: 'Trabalhadores que já calcularam seus direitos',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Calculator,
    value: '50K+',
    label: 'Cálculos Realizados',
    description: 'Total de simulações feitas na plataforma',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    icon: FileText,
    value: '12K+',
    label: 'PDFs Gerados',
    description: 'Relatórios profissionais baixados',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Avaliação',
    description: 'Nota média dos usuários',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
];

const features = [
  {
    icon: Clock,
    title: '< 30 segundos',
    subtitle: 'Tempo médio de cálculo',
  },
  {
    icon: Shield,
    title: '100% Seguro',
    subtitle: 'Dados não armazenados',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    subtitle: 'Funciona em qualquer dispositivo',
  },
  {
    icon: TrendingUp,
    title: '2024 Atualizado',
    subtitle: 'Tabelas sempre atuais',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Números que impressionam
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nossa plataforma já ajudou milhares de brasileiros a conhecerem 
            seus direitos trabalhistas de forma gratuita e precisa.
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                    <p className="font-semibold text-lg mb-2">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statement */}
        <div className="text-center mt-12">
          <div className="bg-emerald-600 text-white rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              R$ 2.8 milhões
            </h3>
            <p className="text-lg opacity-90">
              Valor estimado em direitos trabalhistas já calculados pelos nossos usuários.
              <br />
              <span className="text-sm opacity-75">
                *Baseado na soma dos valores líquidos calculados nas rescisões
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}