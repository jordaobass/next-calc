import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato conosco para sugestões, dúvidas ou suporte.',
};

export default function ContatoPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Contato</h1>
          <p className="text-lg text-muted-foreground">
            Entre em contato conosco para sugestões, dúvidas ou suporte.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Email</h2>
            <p className="text-muted-foreground">
              contato@calctrabalhista.com.br
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Sugestões</h2>
            <p className="text-muted-foreground">
              Tem alguma sugestão de melhoria ou nova calculadora? 
              Envie sua ideia para nós!
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Suporte</h2>
            <p className="text-muted-foreground">
              Encontrou algum erro nos cálculos ou tem dúvidas sobre como usar
              nossas calculadoras? Entre em contato conosco.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}