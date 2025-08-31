import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  FileText, 
  Download, 
  Share2, 
  Clock, 
  Bookmark, 
  TrendingUp,
  Shield,
  Zap,
  Users
} from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Ferramentas - NextCalc',
  description: 'Ferramentas gratuitas para cálculos trabalhistas: histórico de cálculos, comparador de resultados, exportação PDF, simuladores e muito mais.',
  keywords: [
    'ferramentas trabalhistas',
    'simulador trabalhista',
    'comparador cálculos',
    'histórico cálculos',
    'ferramenta CLT',
    'nextcalc ferramentas'
  ],
};

export default function FerramentasPage() {
  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Ferramentas', url: `${siteConfig.url}/ferramentas` },
  ];

  const tools = [
    {
      title: 'Calculadoras Trabalhistas',
      description: 'Mais de 10 calculadoras especializadas baseadas na CLT',
      icon: Calculator,
      href: '/calculadoras',
      color: 'bg-emerald-600 hover:bg-emerald-700',
      features: [
        '11 calculadoras diferentes',
        'Baseadas na legislação atual',
        'Resultados detalhados',
        'Totalmente gratuitas'
      ]
    },
    {
      title: 'Histórico de Cálculos',
      description: 'Mantenha registro de todos os seus cálculos anteriores',
      icon: Clock,
      href: '/calculadoras',
      color: 'bg-blue-600 hover:bg-blue-700',
      features: [
        'Armazenamento local seguro',
        'Acesso rápido aos resultados',
        'Comparação entre cálculos',
        'Organização por tipo'
      ]
    },
    {
      title: 'Exportação de Relatórios',
      description: 'Gere relatórios em PDF com todos os detalhes legais',
      icon: FileText,
      href: '/calculadoras',
      color: 'bg-purple-600 hover:bg-purple-700',
      features: [
        'Relatórios profissionais',
        'Base legal incluída',
        'Formatação padrão',
        'Download instantâneo'
      ],
      badge: 'Em breve'
    },
    {
      title: 'Compartilhamento',
      description: 'Compartilhe resultados de forma segura e profissional',
      icon: Share2,
      href: '/calculadoras',
      color: 'bg-green-600 hover:bg-green-700',
      features: [
        'Links seguros',
        'Redes sociais',
        'Email profissional',
        'Sem dados pessoais'
      ]
    },
    {
      title: 'Simulador de Cenários',
      description: 'Compare diferentes situações trabalhistas lado a lado',
      icon: TrendingUp,
      href: '#',
      color: 'bg-orange-600 hover:bg-orange-700',
      features: [
        'Múltiplos cenários',
        'Comparação visual',
        'Análise de impacto',
        'Recomendações'
      ],
      badge: 'Em desenvolvimento'
    },
    {
      title: 'Favoritos',
      description: 'Salve suas calculadoras mais utilizadas para acesso rápido',
      icon: Bookmark,
      href: '/calculadoras',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      features: [
        'Acesso personalizado',
        'Organização própria',
        'Atalhos rápidos',
        'Interface customizada'
      ],
      badge: 'Em breve'
    }
  ];

  const features = [
    {
      title: 'Gratuito para Sempre',
      description: 'Todas as ferramentas são 100% gratuitas',
      icon: Shield
    },
    {
      title: 'Rápido e Preciso',
      description: 'Cálculos instantâneos com alta precisão',
      icon: Zap
    },
    {
      title: 'Fácil de Usar',
      description: 'Interface intuitiva para todos os usuários',
      icon: Users
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Ferramentas Trabalhistas</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conjunto completo de ferramentas gratuitas para cálculos trabalhistas, 
              análises e simulações baseadas na CLT
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-emerald-600 mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {tools.map((tool) => (
              <Card key={tool.title} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${tool.color}`}>
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        {tool.badge && (
                          <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full mt-1">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="h-1.5 w-1.5 bg-emerald-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tool.href !== '#' ? (
                    <Button asChild className="w-full">
                      <Link href={tool.href}>
                        Usar Ferramenta
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Em Breve
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Acesso Rápido às Calculadoras</CardTitle>
              <CardDescription className="text-center">
                As calculadoras mais utilizadas para começar agora mesmo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" asChild className="h-16 flex-col">
                  <Link href="/calculadoras/rescisao">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">Rescisão</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-16 flex-col">
                  <Link href="/calculadoras/ferias">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">Férias</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-16 flex-col">
                  <Link href="/calculadoras/decimo-terceiro">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">13º Salário</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-16 flex-col">
                  <Link href="/calculadoras/fgts">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">FGTS</span>
                  </Link>
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <Button asChild variant="outline">
                  <Link href="/calculadoras">
                    Ver Todas as Calculadoras
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <CardHeader className="text-center">
              <CardTitle className="text-emerald-800">Próximas Funcionalidades</CardTitle>
              <CardDescription className="text-emerald-700">
                Estamos sempre trabalhando em novas ferramentas para facilitar sua vida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4">
                  <FileText className="h-8 w-8 mx-auto text-emerald-600 mb-3" />
                  <h4 className="font-semibold text-emerald-800">Gerador de Relatórios</h4>
                  <p className="text-sm text-emerald-700">
                    Relatórios profissionais em PDF com base legal completa
                  </p>
                </div>
                <div className="text-center p-4">
                  <TrendingUp className="h-8 w-8 mx-auto text-emerald-600 mb-3" />
                  <h4 className="font-semibold text-emerald-800">Simulador Avançado</h4>
                  <p className="text-sm text-emerald-700">
                    Compare diferentes cenários e tome decisões informadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground mb-6">
              Escolha uma ferramenta e comece a calcular seus direitos trabalhistas agora mesmo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/calculadoras">
                  <Calculator className="h-4 w-4 mr-2" />
                  Ver Calculadoras
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sobre">
                  Sobre o NextCalc
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}