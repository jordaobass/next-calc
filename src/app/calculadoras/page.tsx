import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';
import { CalculationHistory } from '@/components/calculators/shared/CalculationHistory';

export const metadata: Metadata = {
  title: 'Calculadoras Trabalhistas',
  description: 'Todas as calculadoras trabalhistas em um só lugar. Calcule rescisão, férias, 13º salário, FGTS e muito mais.',
};

const calculators = [
  {
    title: 'Rescisão Trabalhista',
    description: 'Calcule todos os valores da rescisão trabalhista de acordo com a CLT.',
    href: '/calculadoras/rescisao',
    category: 'Principais',
  },
  {
    title: 'Férias',
    description: 'Calcule o valor das férias proporcionais e integrais.',
    href: '/calculadoras/ferias',
    category: 'Principais',
  },
  {
    title: '13º Salário',
    description: 'Calcule o décimo terceiro salário proporcional e integral.',
    href: '/calculadoras/decimo-terceiro',
    category: 'Principais',
  },
  {
    title: 'FGTS',
    description: 'Calcule o valor do Fundo de Garantia por Tempo de Serviço.',
    href: '/calculadoras/fgts',
    category: 'Principais',
  },
  {
    title: 'Horas Extras',
    description: 'Calcule o valor das horas extras trabalhadas.',
    href: '/calculadoras/horas-extras',
    category: 'Adicionais',
  },
  {
    title: 'Adicional Noturno',
    description: 'Calcule o adicional noturno devido ao trabalhador.',
    href: '/calculadoras/adicional-noturno',
    category: 'Adicionais',
  },
  {
    title: 'Adicional de Periculosidade',
    description: 'Calcule o adicional de periculosidade de 30%.',
    href: '/calculadoras/adicional-periculosidade',
    category: 'Adicionais',
  },
  {
    title: 'Adicional de Insalubridade',
    description: 'Calcule o adicional de insalubridade conforme o grau.',
    href: '/calculadoras/adicional-insalubridade',
    category: 'Adicionais',
  },
  {
    title: 'INSS',
    description: 'Calcule o desconto do INSS sobre o salário.',
    href: '/calculadoras/inss',
    category: 'Descontos',
  },
  {
    title: 'IRRF',
    description: 'Calcule o Imposto de Renda Retido na Fonte.',
    href: '/calculadoras/irrf',
    category: 'Descontos',
  },
  {
    title: 'Salário Família',
    description: 'Calcule o valor do salário família devido.',
    href: '/calculadoras/salario-familia',
    category: 'Benefícios',
  },
  {
    title: 'Auxílio Doença',
    description: 'Calcule o valor do auxílio doença previdenciário.',
    href: '/calculadoras/auxilio-doenca',
    category: 'Benefícios',
  },
  {
    title: 'Seguro Desemprego',
    description: 'Calcule as parcelas do seguro desemprego.',
    href: '/calculadoras/seguro-desemprego',
    category: 'Benefícios',
  },
];

const categories = ['Principais', 'Adicionais', 'Descontos', 'Benefícios'];

export default function CalculadorasPage() {
  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Calculadoras', url: `${siteConfig.url}/calculadoras` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Calculadoras Trabalhistas</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Utilize nossas calculadoras gratuitas para calcular seus direitos trabalhistas
          de forma rápida e precisa.
        </p>
      </div>

      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators
              .filter((calc) => calc.category === category)
              .map((calculator) => (
                <Link key={calculator.href} href={calculator.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Calculator className="h-5 w-5 text-emerald-600" />
                        <CardTitle className="text-lg">{calculator.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{calculator.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      ))}
      
      {/* Recent Calculations History */}
      <section className="mb-12">
        <CalculationHistory showAll={false} />
      </section>
      </div>
    </>
  );
}