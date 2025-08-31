import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do CalcTrabalhista. Condições para utilização de nossas calculadoras trabalhistas.',
  robots: 'index, follow',
};

export default function TermosPage() {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Termos de Uso</h1>
          <p className="text-lg text-muted-foreground">
            Condições para utilização do CalcTrabalhista
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
                  Estes Termos de Uso regem o uso do site CalcTrabalhista e suas ferramentas 
                  de cálculo trabalhista. Ao acessar e usar nosso site, você concorda com estes termos.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p>
                  Ao acessar e utilizar o CalcTrabalhista, você declara ter lido, compreendido e 
                  concordado com todos os termos e condições aqui estabelecidos. Se você não 
                  concordar com qualquer parte destes termos, não deve usar nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  2. Descrição do Serviço
                </h2>
                <p>
                  O CalcTrabalhista é uma plataforma online gratuita que oferece:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Calculadoras trabalhistas (rescisão, férias, 13º salário, FGTS, etc.)</li>
                  <li>Simuladores salariais e ferramentas relacionadas</li>
                  <li>Informações educativas sobre direitos trabalhistas</li>
                  <li>Conteúdo informativo sobre legislação trabalhista brasileira</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  3. Uso Permitido
                </h2>
                <p>Você pode usar nosso site para:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Realizar cálculos trabalhistas para fins pessoais ou profissionais</li>
                  <li>Consultar informações sobre direitos trabalhistas</li>
                  <li>Compartilhar resultados de cálculos de forma responsável</li>
                  <li>Acessar conteúdo educativo</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  4. Uso Proibido
                </h2>
                <p>É expressamente proibido:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Usar o site para atividades ilegais ou fraudulentas</li>
                  <li>Tentar comprometer a segurança ou funcionamento do site</li>
                  <li>Reproduzir, copiar ou distribuir o conteúdo sem autorização</li>
                  <li>Usar ferramentas automatizadas para acessar o site em massa</li>
                  <li>Interferir no funcionamento dos anúncios ou analytics</li>
                  <li>Fornecer informações falsas ou enganosas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  5. Limitações e Isenção de Responsabilidade
                </h2>
                
                <h3 className="text-xl font-medium mb-3">5.1 Natureza Informativa</h3>
                <p>
                  <strong>IMPORTANTE:</strong> Os cálculos fornecidos pelo CalcTrabalhista são 
                  estimativas baseadas na legislação trabalhista brasileira vigente e têm 
                  <strong> caráter meramente informativo e educativo</strong>.
                </p>

                <h3 className="text-xl font-medium mb-3 mt-6">5.2 Limitações</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Os resultados podem variar conforme acordos coletivos específicos</li>
                  <li>Convenções da categoria profissional podem alterar os cálculos</li>
                  <li>Particularidades contratuais podem influenciar os valores</li>
                  <li>Mudanças legislativas podem afetar a precisão dos cálculos</li>
                </ul>

                <h3 className="text-xl font-medium mb-3 mt-6">5.3 Isenção de Responsabilidade</h3>
                <p>
                  O CalcTrabalhista <strong>NÃO SE RESPONSABILIZA</strong> por:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Decisões tomadas com base nos cálculos realizados</li>
                  <li>Diferenças entre valores calculados e valores oficiais</li>
                  <li>Perdas ou danos decorrentes do uso das informações</li>
                  <li>Interrupções temporárias do serviço</li>
                  <li>Incompatibilidades com acordos específicos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  6. Recomendações Importantes
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    ⚠️ Consulta Profissional Recomendada
                  </h3>
                  <p className="text-yellow-700">
                    Para cálculos oficiais e decisões importantes, sempre consulte:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-yellow-700">
                    <li>Departamento de Recursos Humanos da empresa</li>
                    <li>Advogado especializado em Direito do Trabalho</li>
                    <li>Contador ou consultor trabalhista</li>
                    <li>Sindicato da categoria profissional</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  7. Propriedade Intelectual
                </h2>
                <p>
                  Todo o conteúdo do site, incluindo textos, gráficos, logos, ícones, imagens, 
                  clipes de áudio e software, é de propriedade do CalcTrabalhista ou de seus 
                  fornecedores de conteúdo e está protegido por leis de direitos autorais.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  8. Publicidade
                </h2>
                <p>
                  O site pode exibir anúncios de terceiros através do Google AdSense. 
                  Não somos responsáveis pelo conteúdo dos anúncios ou pelos produtos/serviços 
                  anunciados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  9. Privacidade
                </h2>
                <p>
                  Sua privacidade é importante para nós. Consulte nossa 
                  <a href="/privacidade" className="text-emerald-600 hover:underline"> Política de Privacidade </a>
                  para entender como coletamos, usamos e protegemos suas informações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  10. Disponibilidade do Serviço
                </h2>
                <p>
                  Embora nos esforcemos para manter o site disponível 24/7, não garantimos 
                  que o serviço será ininterrupto ou livre de erros. Podemos suspender ou 
                  restringir o acesso para manutenção ou melhorias.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  11. Modificações dos Termos
                </h2>
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  Alterações significativas serão comunicadas através do site. O uso 
                  continuado após as alterações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  12. Encerramento
                </h2>
                <p>
                  Podemos encerrar ou suspender seu acesso ao site imediatamente, sem aviso 
                  prévio, por qualquer motivo, incluindo violação destes termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  13. Lei Aplicável
                </h2>
                <p>
                  Estes termos são regidos pelas leis da República Federativa do Brasil. 
                  Qualquer disputa será resolvida nos tribunais brasileiros competentes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  14. Contato
                </h2>
                <p>
                  Para questões sobre estes termos ou nossos serviços:
                </p>
                <ul className="list-none space-y-2">
                  <li><strong>Email:</strong> contato@calctrabalhista.com.br</li>
                  <li><strong>Página de Contato:</strong> /contato</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  15. Disposições Finais
                </h2>
                <p>
                  Se alguma disposição destes termos for considerada inválida ou inexequível, 
                  as demais disposições permanecerão em pleno vigor e efeito. A falha em exercer 
                  qualquer direito não constituirá renúncia a esse direito.
                </p>
              </section>

              <div className="border-t pt-6 mt-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    📋 Resumo dos Termos
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use o site de forma responsável e legal</li>
                    <li>• Os cálculos são estimativas para fins informativos</li>
                    <li>• Sempre consulte profissionais para decisões oficiais</li>
                    <li>• Respeitamos sua privacidade e protegemos seus dados</li>
                    <li>• O site pode exibir anúncios para manter o serviço gratuito</li>
                  </ul>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Data da última atualização:</strong> {currentDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}