'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const faqs = [
  {
    question: 'Os cálculos são realmente gratuitos?',
    answer: 'Sim! Todas as nossas calculadoras são 100% gratuitas. Não cobramos taxas, não pedimos cadastro e não há limites de uso. Nossa missão é democratizar o acesso ao conhecimento sobre direitos trabalhistas.',
  },
  {
    question: 'Os valores estão atualizados com a legislação atual?',
    answer: 'Sim, nossos cálculos são baseados na CLT (Consolidação das Leis do Trabalho) e nas tabelas oficiais do governo para 2024. Atualizamos constantemente nossos algoritmos para refletir mudanças na legislação.',
  },
  {
    question: 'Posso usar os relatórios em PDF em processos legais?',
    answer: 'Os relatórios servem como referência e estimativa baseada nos dados fornecidos. Para fins legais, recomendamos sempre consultar um advogado trabalhista para validação dos cálculos.',
  },
  {
    question: 'Como funciona o cálculo de rescisão trabalhista?',
    answer: 'O cálculo considera salário, tempo de serviço, tipo de demissão, férias vencidas/proporcionais, 13º proporcional, aviso prévio, FGTS e multa rescisória. Todos os valores são calculados conforme a CLT.',
  },
  {
    question: 'Meus dados ficam salvos no sistema?',
    answer: 'Não! Por questões de privacidade, não armazenamos seus dados pessoais. Os cálculos são feitos localmente no seu navegador e apenas o histórico básico (sem dados pessoais) fica salvo no seu dispositivo.',
  },
  {
    question: 'As calculadoras funcionam para todos os tipos de contrato?',
    answer: 'Nossas calculadoras são focadas em contratos CLT (carteira assinada). Para outros tipos como PJ, MEI ou contratos especiais, os cálculos podem não se aplicar totalmente.',
  },
  {
    question: 'Posso calcular para funcionários de outros estados?',
    answer: 'Sim! Os cálculos seguem a legislação trabalhista federal (CLT) que vale para todo o Brasil. Apenas algumas convenções coletivas específicas podem variar por região.',
  },
  {
    question: 'Como posso ter certeza da precisão dos cálculos?',
    answer: 'Nossos algoritmos são baseados na legislação oficial e são constantemente revisados. Também fornecemos a discriminação detalhada de cada valor para que você possa verificar cada item calculado.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossas calculadoras trabalhistas e 
            como utilizá-las da melhor forma.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <h3 className="font-semibold">{faq.question}</h3>
                  </div>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-4 border-t bg-muted/20">
                    <div className="pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Não encontrou a resposta que procurava?
          </p>
          <a 
            href="mailto:contato@calctrabalhista.com.br" 
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Entre em contato conosco
          </a>
        </div>
      </div>
    </section>
  );
}