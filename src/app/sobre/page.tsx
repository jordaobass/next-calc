import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Shield, Users, Target, Award, Clock } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Sobre o NextCalc',
  description: 'Conheça o NextCalc, plataforma gratuita com calculadoras trabalhistas precisas e atualizadas conforme CLT. Criado para simplificar cálculos complexos.',
  keywords: [
    'sobre nextcalc',
    'calculadora trabalhista gratuita',
    'direitos trabalhistas',
    'CLT',
    'cálculos trabalhistas',
    'rescisão',
    'férias',
    '13º salário'
  ],
};

export default function SobrePage() {
  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Sobre', url: `${siteConfig.url}/sobre` },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Cálculos Precisos',
      description: 'Algoritmos baseados na CLT e legislação trabalhista brasileira atualizada para 2024.'
    },
    {
      icon: Shield,
      title: 'Totalmente Gratuito',
      description: 'Todas as calculadoras são 100% gratuitas, sem limites de uso ou cadastro obrigatório.'
    },
    {
      icon: Clock,
      title: 'Sempre Atualizado',
      description: 'Valores e regras atualizados conforme mudanças na legislação e salário mínimo.'
    },
    {
      icon: Users,
      title: 'Interface Intuitiva',
      description: 'Design responsivo e fácil de usar, desenvolvido pensando na experiência do usuário.'
    }
  ];

  const calculators = [
    'Rescisão Trabalhista',
    'Férias',
    '13º Salário',
    'FGTS',
    'Horas Extras',
    'INSS',
    'IRRF',
    'Adicional Noturno',
    'Adicional de Periculosidade',
    'Adicional de Insalubridade',
    'Seguro Desemprego'
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Sobre o NextCalc</h1>
            <p className="text-xl text-muted-foreground">
              Plataforma gratuita com calculadoras trabalhistas precisas e atualizadas
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Target className="h-6 w-6 text-emerald-600" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                Democratizar o acesso ao conhecimento sobre direitos trabalhistas, oferecendo 
                ferramentas gratuitas e precisas para cálculos complexos baseados na CLT.
              </p>
              <p className="text-muted-foreground">
                Acreditamos que todo trabalhador deve ter acesso fácil e gratuito a informações 
                sobre seus direitos, sem precisar recorrer a consultorias caras ou planilhas complicadas.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Available Calculators */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Calculadoras Disponíveis
              </CardTitle>
              <CardDescription>
                Mais de 10 calculadoras trabalhistas especializadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {calculators.map((calculator) => (
                  <div
                    key={calculator}
                    className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <Calculator className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium">{calculator}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technology */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                Tecnologia e Precisão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Base Legal</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CLT (Consolidação das Leis do Trabalho)</li>
                    <li>• Lei 8.036/90 (FGTS)</li>
                    <li>• Lei 8.212/91 (INSS)</li>
                    <li>• Súmulas do TST</li>
                    <li>• Portarias e Decretos atualizados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tecnologia</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Next.js 15 com App Router</li>
                    <li>• TypeScript para maior confiabilidade</li>
                    <li>• Validação rigorosa com Zod</li>
                    <li>• Interface responsiva (Tailwind CSS)</li>
                    <li>• SEO otimizado</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">⚖️ Aviso Legal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-yellow-700">
              <p>
                <strong>NextCalc</strong> é uma ferramenta educacional e informativa que oferece 
                simulações baseadas na legislação trabalhista brasileira vigente.
              </p>
              <p>
                Os cálculos apresentados são <strong>estimativas</strong> e podem variar conforme:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Convenções coletivas específicas</li>
                <li>Acordos individuais de trabalho</li>
                <li>Mudanças na legislação</li>
                <li>Interpretações jurisprudenciais</li>
                <li>Particularidades de cada caso</li>
              </ul>
              <p>
                Para casos específicos, sempre <strong>consulte um advogado trabalhista</strong> 
                ou contador especializado.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Dúvidas, sugestões ou encontrou algum erro?
            </p>
            <a
              href="mailto:contato@nextcalc.com.br"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Entre em contato: contato@nextcalc.com.br
            </a>
          </div>
        </div>
      </div>
    </>
  );
}