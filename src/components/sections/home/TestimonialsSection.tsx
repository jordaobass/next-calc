import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Trabalhadora CLT',
    content: 'Descobri que tinha direito a mais de R$ 3.500 na rescisão. O cálculo foi rápido e preciso, me ajudou muito na negociação.',
    rating: 5,
  },
  {
    name: 'João Santos',
    role: 'Autônomo',
    content: 'Uso sempre para calcular as férias dos meus funcionários. Economizo tempo e evito erros nos cálculos.',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Advogada Trabalhista',
    content: 'Indico para todos os meus clientes. Os relatórios em PDF são profissionais e facilitam muito o meu trabalho.',
    rating: 5,
  },
  {
    name: 'Pedro Oliveira',
    role: 'Contador',
    content: 'Ferramenta essencial no meu dia a dia. Os cálculos são sempre atualizados conforme a legislação.',
    rating: 5,
  },
  {
    name: 'Carla Mendes',
    role: 'Empresária',
    content: 'Economizo horas de trabalho calculando os direitos dos funcionários. Interface simples e resultados confiáveis.',
    rating: 5,
  },
  {
    name: 'Roberto Lima',
    role: 'Sindicalista',
    content: 'Recomendo para todos os trabalhadores. Conhecer seus direitos é fundamental e essa ferramenta torna isso fácil.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            O que dizem nossos usuários
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de brasileiros já calcularam seus direitos trabalhistas 
            e economizaram tempo e dinheiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="h-8 w-8 text-emerald-100 mb-2" />
                    <p className="text-muted-foreground leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </div>

                  {/* Author */}
                  <div className="pt-4 border-t">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Sistema sempre atualizado</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-muted-foreground">4.9/5 estrelas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">100% gratuito</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}