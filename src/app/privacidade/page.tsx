import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do CalcTrabalhista. Saiba como protegemos e tratamos seus dados pessoais.',
  robots: 'index, follow',
};

export default function PrivacidadePage() {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Política de Privacidade</h1>
          <p className="text-lg text-muted-foreground">
            Como coletamos, usamos e protegemos suas informações
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Última atualização:</strong> {currentDate}
                </p>
                <p className="lead">
                  Esta Política de Privacidade descreve como o CalcTrabalhista coleta, usa e compartilha 
                  informações sobre você quando você utiliza nosso site e serviços.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Informações que Coletamos
                </h2>
                
                <h3 className="text-xl font-medium mb-3">1.1 Informações Fornecidas por Você</h3>
                <p>
                  O CalcTrabalhista é uma ferramenta gratuita que não requer cadastro ou criação de conta. 
                  No entanto, você pode fornecer informações quando:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Utiliza nossas calculadoras trabalhistas (valores salariais, datas, etc.)</li>
                  <li>Entra em contato conosco através de formulários</li>
                  <li>Se inscreve em nossa newsletter (quando disponível)</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">1.2 Informações Coletadas Automaticamente</h3>
                <p>
                  Quando você visita nosso site, coletamos automaticamente certas informações, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, sistema operacional</li>
                  <li><strong>Dados de Uso:</strong> Páginas visitadas, tempo de permanência, origem do tráfego</li>
                  <li><strong>Cookies:</strong> Pequenos arquivos armazenados no seu dispositivo</li>
                  <li><strong>Local Storage:</strong> Dados salvos localmente para histórico de cálculos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Como Usamos suas Informações
                </h2>
                <p>Utilizamos as informações coletadas para:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fornecer e melhorar nossos serviços de calculadora trabalhista</li>
                  <li>Personalizar sua experiência no site</li>
                  <li>Analisar o uso do site para melhorias</li>
                  <li>Exibir anúncios relevantes (Google AdSense)</li>
                  <li>Prevenir fraudes e garantir a segurança</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Cookies e Tecnologias Similares
                </h2>
                
                <h3 className="text-xl font-medium mb-3">3.1 Tipos de Cookies</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Cookies Essenciais</h4>
                    <p>Necessários para o funcionamento básico do site e não podem ser desabilitados.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Cookies de Analytics</h4>
                    <p>Google Analytics para entender como os visitantes usam nosso site.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Cookies de Publicidade</h4>
                    <p>Google AdSense para exibir anúncios relevantes e medir performance.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Local Storage</h4>
                    <p>Armazenamento local do histórico de cálculos para sua conveniência.</p>
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-3 mt-6">3.2 Gerenciamento de Cookies</h3>
                <p>
                  Você pode controlar e gerenciar cookies através das configurações do seu navegador. 
                  Note que desabilitar cookies pode afetar a funcionalidade do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Compartilhamento de Informações
                </h2>
                <p>Compartilhamos suas informações apenas nas seguintes situações:</p>
                
                <h3 className="text-xl font-medium mb-3">4.1 Parceiros de Serviço</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Google Analytics:</strong> Para análise de tráfego e comportamento</li>
                  <li><strong>Google AdSense:</strong> Para exibição de anúncios personalizados</li>
                  <li><strong>Vercel:</strong> Para hospedagem do site</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">4.2 Exigências Legais</h3>
                <p>
                  Podemos compartilhar informações quando necessário para cumprir leis, 
                  regulamentos ou ordens judiciais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Seus Direitos (LGPD)
                </h2>
                <p>
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Acesso:</strong> Saber quais dados pessoais possuímos sobre você</li>
                  <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou inexatos</li>
                  <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                  <li><strong>Revogação do Consentimento:</strong> Retirar consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Segurança dos Dados
                </h2>
                <p>
                  Implementamos medidas de segurança adequadas para proteger suas informações pessoais:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Conexão HTTPS em todo o site</li>
                  <li>Armazenamento local seguro (Local Storage)</li>
                  <li>Não armazenamos dados sensíveis nos servidores</li>
                  <li>Parceiros certificados (Google, Vercel)</li>
                  <li>Monitoramento regular de segurança</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Retenção de Dados
                </h2>
                <p>
                  Mantemos suas informações apenas pelo tempo necessário para fornecer nossos serviços:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Dados de Analytics:</strong> 26 meses (Google Analytics)</li>
                  <li><strong>Histórico Local:</strong> Até você limpar o navegador</li>
                  <li><strong>Logs de Servidor:</strong> 30 dias</li>
                  <li><strong>Dados de Contato:</strong> Até revogação do consentimento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Menores de Idade
                </h2>
                <p>
                  Nosso serviço não é direcionado a menores de 18 anos. Não coletamos 
                  intencionalmente informações pessoais de menores de idade.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Alterações nesta Política
                </h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Alterações 
                  significativas serão comunicadas através do site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Contato
                </h2>
                <p>
                  Para questões sobre privacidade, exercer seus direitos ou obter esclarecimentos:
                </p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> privacidade@calctrabalhista.com.br</li>
                  <li><strong>Página de Contato:</strong> /contato</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Legislação Aplicável
                </h2>
                <p>
                  Esta Política de Privacidade é regida pelas leis brasileiras, especialmente 
                  a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da 
                  Internet (Lei nº 12.965/2014).
                </p>
              </section>

              <div className="border-t pt-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  <strong>Data da última atualização:</strong> {currentDate}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Esta política está em conformidade com a LGPD (Lei Geral de Proteção de Dados) 
                  e regulamentações do Google AdSense.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}