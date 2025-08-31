import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, AlertCircle } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Termos de Uso - NextCalc',
  description: 'Termos de uso da plataforma NextCalc. Condições de utilização das calculadoras trabalhistas gratuitas.',
  keywords: ['termos de uso', 'condições de uso', 'nextcalc', 'calculadora trabalhista'],
  robots: 'index, follow',
};

export default function TermosDeUsoPage() {
  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Termos de Uso', url: `${siteConfig.url}/termos-de-uso` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Termos de Uso</h1>
            <p className="text-xl text-muted-foreground">
              Condições de utilização da plataforma NextCalc
            </p>
            <p className="text-sm text-muted-foreground">
              Última atualização: Janeiro de 2025
            </p>
          </div>

          {/* Aviso importante */}
          <Card className="bg-yellow-50 border-yellow-200 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Importante</h3>
                  <p className="text-yellow-700 text-sm">
                    Ao utilizar a plataforma NextCalc, você concorda integralmente com estes Termos de Uso. 
                    Se você não concorda com alguma disposição, não deve utilizar nossos serviços.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* 1. Aceitação dos Termos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600" />
                  1. Aceitação dos Termos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Ao acessar e usar o NextCalc, você aceita e concorda em ficar vinculado aos 
                  termos e condições deste acordo. Se você não concorda com todos os termos 
                  e condições deste acordo, então você não pode acessar o site ou usar qualquer serviço.
                </p>
                <p>
                  Estes Termos de Uso aplicam-se a todos os visitantes, usuários e outras pessoas 
                  que acessam ou usam o serviço.
                </p>
              </CardContent>
            </Card>

            {/* 2. Descrição do Serviço */}
            <Card>
              <CardHeader>
                <CardTitle>2. Descrição do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  O NextCalc é uma plataforma online gratuita que oferece calculadoras trabalhistas 
                  baseadas na legislação brasileira vigente, especificamente:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Calculadora de Rescisão Trabalhista</li>
                  <li>Calculadora de Férias</li>
                  <li>Calculadora de 13º Salário</li>
                  <li>Calculadora de FGTS</li>
                  <li>Calculadora de Horas Extras</li>
                  <li>Calculadoras de Adicionais (Noturno, Periculosidade, Insalubridade)</li>
                  <li>Calculadoras de Descontos (INSS, IRRF)</li>
                  <li>Calculadora de Seguro Desemprego</li>
                </ul>
                <p>
                  Os serviços são oferecidos &quot;como estão&quot; e destinam-se exclusivamente 
                  para fins informativos e educacionais.
                </p>
              </CardContent>
            </Card>

            {/* 3. Uso Permitido */}
            <Card>
              <CardHeader>
                <CardTitle>3. Uso Permitido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>Você pode usar nossa plataforma para:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Realizar cálculos trabalhistas para fins informativos</li>
                  <li>Consultar estimativas de direitos trabalhistas</li>
                  <li>Estudar e compreender conceitos da legislação trabalhista</li>
                  <li>Compartilhar resultados de cálculos de forma responsável</li>
                </ul>
                
                <p className="font-semibold mt-4">É vedado:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-red-600">
                  <li>Usar os resultados como base definitiva para ações judiciais</li>
                  <li>Reproduzir, copiar ou redistribuir o conteúdo sem autorização</li>
                  <li>Tentar acessar áreas restritas da plataforma</li>
                  <li>Interferir no funcionamento normal do sistema</li>
                  <li>Usar a plataforma para fins comerciais sem autorização</li>
                </ul>
              </CardContent>
            </Card>

            {/* 4. Limitações e Responsabilidades */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-emerald-600" />
                  4. Limitações e Responsabilidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">AVISO IMPORTANTE</h4>
                  <p className="text-red-700">
                    Os cálculos fornecidos pelo NextCalc são <strong>estimativas</strong> baseadas 
                    na legislação trabalhista brasileira vigente e NÃO substituem a consulta a 
                    profissionais qualificados (advogados trabalhistas, contadores ou consultores especializados).
                  </p>
                </div>
                
                <p>
                  <strong>O NextCalc NÃO se responsabiliza por:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Decisões tomadas com base nos cálculos apresentados</li>
                  <li>Variações nos valores devido a particularidades não contempladas</li>
                  <li>Mudanças na legislação não atualizadas imediatamente na plataforma</li>
                  <li>Interpretações divergentes da legislação</li>
                  <li>Convenções coletivas específicas não consideradas</li>
                  <li>Perdas ou danos decorrentes do uso da plataforma</li>
                </ul>
              </CardContent>
            </Card>

            {/* 5. Propriedade Intelectual */}
            <Card>
              <CardHeader>
                <CardTitle>5. Propriedade Intelectual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Todo o conteúdo da plataforma NextCalc, incluindo mas não se limitando a 
                  textos, gráficos, logotipos, ícones, imagens, algoritmos de cálculo e software, 
                  é de propriedade do NextCalc e está protegido por leis de direitos autorais.
                </p>
                <p>
                  O uso da plataforma não concede ao usuário qualquer direito sobre a propriedade 
                  intelectual, exceto o direito limitado de uso conforme estabelecido nestes Termos.
                </p>
              </CardContent>
            </Card>

            {/* 6. Privacidade e Dados */}
            <Card>
              <CardHeader>
                <CardTitle>6. Privacidade e Coleta de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  O NextCalc coleta apenas dados essenciais para o funcionamento da plataforma:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Dados de navegação para análise de uso (Google Analytics)</li>
                  <li>Histórico de cálculos armazenado localmente no seu dispositivo</li>
                  <li>Cookies técnicos necessários para funcionamento</li>
                </ul>
                <p>
                  <strong>NÃO coletamos:</strong> dados pessoais, informações de identificação, 
                  dados financeiros reais ou qualquer informação sensível.
                </p>
                <p>
                  Para mais informações, consulte nossa 
                  <a href="/politica-de-privacidade" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    {' '}Política de Privacidade
                  </a>.
                </p>
              </CardContent>
            </Card>

            {/* 7. Disponibilidade do Serviço */}
            <Card>
              <CardHeader>
                <CardTitle>7. Disponibilidade do Serviço</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Embora nos esforcemos para manter a plataforma disponível 24/7, não garantimos 
                  que o serviço será ininterrupto ou livre de erros. Podemos:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Realizar manutenções programadas com aviso prévio quando possível</li>
                  <li>Suspender temporariamente o serviço por questões técnicas</li>
                  <li>Atualizar funcionalidades sem aviso prévio</li>
                  <li>Modificar ou descontinuar recursos específicos</li>
                </ul>
              </CardContent>
            </Card>

            {/* 8. Modificações dos Termos */}
            <Card>
              <CardHeader>
                <CardTitle>8. Modificações dos Termos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                  Alterações significativas serão comunicadas através de:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Aviso na página principal da plataforma</li>
                  <li>Atualização da data de &quot;última modificação&quot;</li>
                  <li>Notificação por email quando aplicável</li>
                </ul>
                <p>
                  O uso continuado da plataforma após as modificações constitui aceitação 
                  dos novos termos.
                </p>
              </CardContent>
            </Card>

            {/* 9. Lei Aplicável */}
            <Card>
              <CardHeader>
                <CardTitle>9. Lei Aplicável e Foro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. 
                  Qualquer disputa relacionada a estes termos será submetida à jurisdição 
                  dos tribunais brasileiros competentes.
                </p>
                <p>
                  Em caso de conflito entre estes termos e a legislação brasileira aplicável, 
                  prevalecerá a legislação.
                </p>
              </CardContent>
            </Card>

            {/* 10. Contato */}
            <Card>
              <CardHeader>
                <CardTitle>10. Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Para dúvidas, sugestões ou questões relacionadas a estes Termos de Uso, 
                  entre em contato conosco:
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:contato@nextcalc.com.br" className="text-emerald-600 hover:text-emerald-700">
                      contato@nextcalc.com.br
                    </a>
                  </p>
                  <p><strong>Site:</strong> {siteConfig.url}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              NextCalc - Calculadoras Trabalhistas Gratuitas
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Estes termos foram atualizados pela última vez em Janeiro de 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}