import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça o CalcTrabalhista, a calculadora trabalhista gratuita e confiável.',
};

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Sobre o CalcTrabalhista</h1>
          <p className="text-lg text-muted-foreground">
            Sua ferramenta confiável para cálculos trabalhistas.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            O CalcTrabalhista é uma plataforma gratuita desenvolvida para ajudar trabalhadores,
            empregadores e profissionais da área jurídica a calcularem direitos trabalhistas
            de forma rápida, precisa e transparente.
          </p>

          <h2>Nossa Missão</h2>
          <p>
            Democratizar o acesso ao conhecimento sobre direitos trabalhistas, fornecendo
            ferramentas gratuitas e confiáveis para que todos possam calcular seus direitos
            de acordo com a legislação trabalhista brasileira.
          </p>

          <h2>Por que usar o CalcTrabalhista?</h2>
          <ul>
            <li>✅ Totalmente gratuito</li>
            <li>✅ Cálculos baseados na CLT</li>
            <li>✅ Interface simples e intuitiva</li>
            <li>✅ Resultados detalhados e explicados</li>
            <li>✅ Sempre atualizado com a legislação</li>
          </ul>
        </div>
      </div>
    </div>
  );
}