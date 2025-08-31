import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, Lock, Users, AlertTriangle } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: 'Política de Privacidade - NextCalc',
  description: 'Política de privacidade do NextCalc. Como coletamos, usamos e protegemos seus dados conforme LGPD.',
  keywords: ['política de privacidade', 'LGPD', 'proteção de dados', 'nextcalc', 'privacidade'],
  robots: 'index, follow',
};

export default function PoliticaPrivacidadePage() {
  const breadcrumbs = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Política de Privacidade', url: `${siteConfig.url}/politica-de-privacidade` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Política de Privacidade</h1>
            <p className="text-xl text-muted-foreground">
              Como protegemos e tratamos seus dados pessoais
            </p>
            <p className="text-sm text-muted-foreground">
              Última atualização: Janeiro de 2025 | Conforme LGPD (Lei 13.709/2018)
            </p>
          </div>

          {/* LGPD Compliance */}
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Conformidade com a LGPD</h3>
                  <p className="text-blue-700 text-sm">
                    Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção 
                    de Dados (LGPD - Lei 13.709/2018) e explica como coletamos, usamos, armazenamos 
                    e protegemos suas informações pessoais.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* 1. Informações que Coletamos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-600" />
                  1. Informações que Coletamos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ O que coletamos</h4>
                  <ul className="list-disc list-inside space-y-1 text-green-700">
                    <li><strong>Dados de navegação:</strong> IP, navegador, dispositivo, páginas visitadas</li>
                    <li><strong>Dados de uso:</strong> Calculadoras utilizadas, tempo de permanência</li>
                    <li><strong>Cookies técnicos:</strong> Preferências de interface e funcionamento</li>
                    <li><strong>Dados analíticos:</strong> Estatísticas agregadas via Google Analytics</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ O que NÃO coletamos</h4>
                  <ul className="list-disc list-inside space-y-1 text-red-700">
                    <li>Nome, CPF, RG ou outros documentos de identificação</li>
                    <li>Dados financeiros reais (salários, valores de rescisão reais)</li>
                    <li>Informações de contato (telefone, endereço, email pessoal)</li>
                    <li>Dados bancários ou cartão de crédito</li>
                    <li>Informações sensíveis sobre saúde, orientação sexual, etc.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* 2. Como Usamos suas Informações */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-emerald-600" />
                  2. Como Usamos suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>Utilizamos as informações coletadas exclusivamente para:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Funcionalidade da Plataforma</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Processar cálculos trabalhistas</li>
                      <li>Armazenar histórico local de cálculos</li>
                      <li>Personalizar interface de usuário</li>
                      <li>Garantir funcionamento adequado</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Melhoria do Serviço</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Análise de uso para melhorias</li>
                      <li>Identificação de problemas técnicos</li>
                      <li>Desenvolvimento de novas funcionalidades</li>
                      <li>Otimização de performance</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-700">
                    <strong>Importante:</strong> Nunca vendemos, alugamos ou compartilhamos 
                    suas informações com terceiros para fins comerciais.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 3. Base Legal para Tratamento */}
            <Card>
              <CardHeader>
                <CardTitle>3. Base Legal para Tratamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  O tratamento dos seus dados está fundamentado nas seguintes bases legais 
                  da LGPD (Art. 7º):
                </p>
                
                <div className="space-y-3">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold">Legítimo Interesse (Art. 7º, IX)</h4>
                    <p>Para análise de uso e melhoria da plataforma, sempre respeitando os direitos do titular.</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Execução de Serviço (Art. 7º, V)</h4>
                    <p>Para fornecimento dos cálculos trabalhistas solicitados pelo usuário.</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">Consentimento (Art. 7º, I)</h4>
                    <p>Para cookies não essenciais e análise detalhada de comportamento (Google Analytics).</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 4. Cookies e Tecnologias */}
            <Card>
              <CardHeader>
                <CardTitle>4. Cookies e Tecnologias de Rastreamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Cookies Essenciais</h4>
                    <p className="text-muted-foreground mb-2">Necessários para funcionamento:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Preferências de interface</li>
                      <li>Histórico de cálculos (localStorage)</li>
                      <li>Configurações de acessibilidade</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Cookies Analíticos</h4>
                    <p className="text-muted-foreground mb-2">Para melhorias (podem ser desabilitados):</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Google Analytics (estatísticas de uso)</li>
                      <li>Dados de performance</li>
                      <li>Padrões de navegação agregados</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p>
                    <strong>Gerenciamento:</strong> Você pode gerenciar cookies através das 
                    configurações do seu navegador ou através das preferências de cookies 
                    da plataforma (quando disponível).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 5. Compartilhamento de Dados */}
            <Card>
              <CardHeader>
                <CardTitle>5. Compartilhamento de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>Seus dados podem ser compartilhados apenas nas seguintes situações:</p>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Prestadores de Serviços</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Google Analytics:</strong> Estatísticas agregadas de uso</li>
                      <li><strong>Vercel:</strong> Hospedagem da plataforma</li>
                      <li><strong>Google AdSense:</strong> Exibição de anúncios relevantes</li>
                    </ul>
                    <p className="text-muted-foreground mt-2 text-xs">
                      Todos os prestadores possuem acordos de proteção de dados e seguem padrões internacionais.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                    <h4 className="font-semibold mb-2 text-red-800">Situações Legais</h4>
                    <p className="text-red-700">
                      Podemos divulgar informações quando requerido por lei, ordem judicial 
                      ou para proteger nossos direitos legais, sempre dentro dos limites legais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 6. Segurança e Retenção */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-emerald-600" />
                  6. Segurança e Retenção de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Medidas de Segurança</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Conexão HTTPS criptografada</li>
                      <li>Armazenamento local no dispositivo</li>
                      <li>Não armazenamos dados sensíveis</li>
                      <li>Anonimização de dados analíticos</li>
                      <li>Controles de acesso rigorosos</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Retenção de Dados</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Dados de navegação: 26 meses (Google Analytics)</li>
                      <li>Histórico de cálculos: Armazenado localmente</li>
                      <li>Cookies técnicos: Até serem removidos</li>
                      <li>Logs de acesso: 12 meses</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7. Seus Direitos (LGPD) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  7. Seus Direitos como Titular de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>Conforme a LGPD, você tem os seguintes direitos:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <h5 className="font-semibold">Confirmação e Acesso</h5>
                      <p>Saber se processamos seus dados e acessá-los</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-3">
                      <h5 className="font-semibold">Correção</h5>
                      <p>Corrigir dados incompletos ou desatualizados</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-3">
                      <h5 className="font-semibold">Eliminação</h5>
                      <p>Solicitar exclusão de dados desnecessários</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-3">
                      <h5 className="font-semibold">Portabilidade</h5>
                      <p>Receber seus dados em formato estruturado</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-3">
                      <h5 className="font-semibold">Oposição</h5>
                      <p>Opor-se ao tratamento de dados</p>
                    </div>
                    
                    <div className="border-l-4 border-indigo-500 pl-3">
                      <h5 className="font-semibold">Informação</h5>
                      <p>Saber sobre compartilhamento de dados</p>
                    </div>
                    
                    <div className="border-l-4 border-pink-500 pl-3">
                      <h5 className="font-semibold">Revogação</h5>
                      <p>Retirar consentimento a qualquer momento</p>
                    </div>
                    
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <h5 className="font-semibold">Não Discriminação</h5>
                      <p>Não ser discriminado por exercer direitos</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Como Exercer seus Direitos</h4>
                  <p className="text-emerald-700">
                    Para exercer qualquer destes direitos, envie um email para{' '}
                    <strong>contato@nextcalc.com.br</strong> com o assunto "LGPD - [Seu Direito]" 
                    e aguarde nossa resposta em até 15 dias úteis.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 8. Menores de Idade */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-600" />
                  8. Menores de Idade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-800">
                    <strong>Política para Menores:</strong> Nossa plataforma não é direcionada a menores 
                    de 18 anos. Não coletamos intencionalmente dados de menores de idade. 
                    Se identificarmos tal coleta, os dados serão excluídos imediatamente.
                  </p>
                </div>
                
                <p>
                  Responsáveis legais podem entrar em contato conosco caso identifiquem 
                  uso da plataforma por menores sob sua responsabilidade.
                </p>
              </CardContent>
            </Card>

            {/* 9. Alterações na Política */}
            <Card>
              <CardHeader>
                <CardTitle>9. Alterações nesta Política</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente para refletir:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Mudanças na legislação</li>
                  <li>Novas funcionalidades da plataforma</li>
                  <li>Melhorias nos processos de proteção de dados</li>
                  <li>Feedback dos usuários</li>
                </ul>
                
                <p>
                  Alterações significativas serão comunicadas através de aviso na página principal 
                  e/ou email quando aplicável.
                </p>
              </CardContent>
            </Card>

            {/* 10. Contato e DPO */}
            <Card>
              <CardHeader>
                <CardTitle>10. Contato e Encarregado de Dados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Entre em Contato</h4>
                  <div className="space-y-2">
                    <p><strong>Email geral:</strong> contato@nextcalc.com.br</p>
                    <p><strong>Assuntos LGPD:</strong> contato@nextcalc.com.br (assunto: "LGPD")</p>
                    <p><strong>Site:</strong> {siteConfig.url}</p>
                    <p><strong>Resposta:</strong> Até 15 dias úteis</p>
                  </div>
                </div>
                
                <p>
                  Para reclamações não resolvidas, você pode contatar a Autoridade Nacional 
                  de Proteção de Dados (ANPD) através do canal oficial.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              NextCalc - Comprometidos com a proteção dos seus dados
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Esta política foi atualizada pela última vez em Janeiro de 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}