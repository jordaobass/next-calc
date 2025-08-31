import { BookOpen, Info, AlertCircle, Lightbulb, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EducationalSection {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

interface EducationalContentProps {
  calculatorType: 'rescisao' | 'ferias' | 'decimo-terceiro' | 'fgts' | 'horas-extras' | 'inss' | 'irrf' | 'seguro-desemprego' | 'adicional-noturno' | 'adicional-insalubridade' | 'periculosidade';
  className?: string;
}

const educationalContent = {
  rescisao: {
    sections: [
      {
        id: 'tipos',
        title: 'Tipos de Rescisão',
        icon: Scale,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-semibold text-green-800">Demissão sem Justa Causa</h4>
                <p className="text-sm text-green-700 mt-1">
                  Quando o empregador decide encerrar o contrato. O trabalhador tem direito a todas as verbas rescisórias.
                </p>
                <ul className="text-xs text-green-600 mt-2 space-y-1">
                  <li>• Aviso prévio (30 dias + 3 dias por ano)</li>
                  <li>• Saldo de salário + férias + 13º proporcional</li>
                  <li>• Férias vencidas + 1/3 constitucional</li>
                  <li>• FGTS + multa de 40%</li>
                  <li>• Seguro desemprego</li>
                </ul>
              </div>
              
              <div className="p-3 border-l-4 border-red-500 bg-red-50">
                <h4 className="font-semibold text-red-800">Demissão com Justa Causa</h4>
                <p className="text-sm text-red-700 mt-1">
                  Quando há falta grave do empregado. Direitos são reduzidos significativamente.
                </p>
                <ul className="text-xs text-red-600 mt-2 space-y-1">
                  <li>• Apenas saldo de salário</li>
                  <li>• Férias vencidas (se houver)</li>
                  <li>• Não há aviso prévio, multa FGTS ou seguro desemprego</li>
                </ul>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-blue-800">Pedido de Demissão</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Quando o trabalhador decide sair. Alguns direitos são mantidos.
                </p>
                <ul className="text-xs text-blue-600 mt-2 space-y-1">
                  <li>• Saldo de salário + férias + 13º proporcional</li>
                  <li>• Férias vencidas + 1/3</li>
                  <li>• FGTS (sem multa de 40%)</li>
                  <li>• Não há seguro desemprego</li>
                </ul>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'direitos',
        title: 'Seus Direitos',
        icon: Lightbulb,
        content: (
          <div className="space-y-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">💡 Dicas Importantes</h4>
              <ul className="text-sm text-emerald-700 space-y-2">
                <li>• Confira se todos os valores estão corretos na homologação</li>
                <li>• Guarde todos os documentos (TRCT, guias do FGTS, etc.)</li>
                <li>• Você tem até 5 anos para contestar valores na Justiça</li>
                <li>• O empregador tem até 10 dias para pagar a rescisão</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Atenção</h4>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• Valores podem variar conforme convenção coletiva</li>
                <li>• Consulte sempre um advogado trabalhista em caso de dúvida</li>
                <li>• Este cálculo é uma estimativa baseada na CLT</li>
              </ul>
            </div>
          </div>
        ),
      },
    ],
  },
  ferias: {
    sections: [
      {
        id: 'direito',
        title: 'Direito a Férias',
        icon: Info,
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Todo empregado tem direito a 30 dias de férias após cada período de 12 meses de trabalho (período aquisitivo).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">Férias Integrais</h4>
                <p className="text-xs text-blue-700 mt-1">
                  30 dias corridos quando completou 12 meses de trabalho.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Férias Proporcionais</h4>
                <p className="text-xs text-green-700 mt-1">
                  Calculadas proporcionalmente aos meses trabalhados.
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-emerald-50 rounded-lg">
              <h4 className="font-semibold text-emerald-800">1/3 Constitucional</h4>
              <p className="text-xs text-emerald-700 mt-1">
                Adicional obrigatório de 1/3 sobre o valor das férias, garantido pela Constituição Federal.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: 'calculo',
        title: 'Como Calcular',
        icon: BookOpen,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Fórmula das Férias:</h4>
              <code className="text-sm bg-white p-2 rounded block">
                (Salário ÷ 12) × Meses trabalhados + 1/3
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Exemplo Prático:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Salário: R$ 3.000,00</p>
                <p>• Meses trabalhados: 8 meses</p>
                <p>• Cálculo: (3.000 ÷ 12) × 8 = R$ 2.000,00</p>
                <p>• + 1/3: R$ 2.000,00 + R$ 666,67 = R$ 2.666,67</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  'decimo-terceiro': {
    sections: [
      {
        id: 'direito',
        title: 'Direito ao 13º',
        icon: Info,
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O 13º salário é pago em duas parcelas: primeira até 30/11 e segunda até 20/12.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">1ª Parcela</h4>
                <p className="text-xs text-blue-700 mt-1">
                  50% do salário, sem descontos. Até 30 de novembro.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">2ª Parcela</h4>
                <p className="text-xs text-green-700 mt-1">
                  Restante com descontos de INSS e IRRF. Até 20 de dezembro.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'calculo',
        title: 'Cálculo Proporcional',
        icon: BookOpen,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Fórmula do 13º:</h4>
              <code className="text-sm bg-white p-2 rounded block">
                (Salário ÷ 12) × Meses trabalhados
              </code>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800">Regra dos 15 dias</h4>
              <p className="text-xs text-yellow-700 mt-1">
                Se trabalhou 15 dias ou mais no mês, conta o mês inteiro. Menos que 15 dias, não conta.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  fgts: {
    sections: [
      {
        id: 'direito',
        title: 'FGTS - O que é',
        icon: Info,
        content: (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O FGTS é um direito de todos os trabalhadores CLT. O empregador deposita 8% do salário mensalmente.
            </p>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">Depósitos Mensais</h4>
                <p className="text-xs text-blue-700 mt-1">
                  8% do salário bruto depositado todo mês na conta vinculada.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Rendimentos</h4>
                <p className="text-xs text-green-700 mt-1">
                  3% ao ano + TR (Taxa Referencial) + distribuição de lucros.
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'saques',
        title: 'Quando Sacar',
        icon: AlertCircle,
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold">Situações que permitem saque:</h4>
            
            <div className="space-y-2">
              {[
                'Demissão sem justa causa',
                'Aposentadoria',
                'Compra da casa própria',
                'Doença grave',
                'Calamidade pública',
                'Rescisão por acordo',
              ].map((situacao, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>{situacao}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  },
};

export function EducationalContent({ calculatorType, className = '' }: EducationalContentProps) {
  const content = educationalContent[calculatorType as keyof typeof educationalContent];
  
  if (!content) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-600" />
          Guia Educativo
        </CardTitle>
        <CardDescription>
          Entenda melhor seus direitos trabalhistas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={content.sections[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            {content.sections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                <section.icon className="h-4 w-4" />
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {content.sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-4">
              {section.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}