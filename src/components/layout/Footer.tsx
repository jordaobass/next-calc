import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Calculator className="h-6 w-6 text-emerald-600" />
              <span className="text-lg font-bold">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Calculadora trabalhista online gratuita para calcular seus
              direitos trabalhistas com precisão.
            </p>
          </div>

          {/* Calculadoras */}
          <div className="space-y-4">
            <h4 className="font-semibold">Calculadoras</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/calculadoras/rescisao"
                className="transition-colors hover:text-emerald-600"
              >
                Rescisão
              </Link>
              <Link
                href="/calculadoras/ferias"
                className="transition-colors hover:text-emerald-600"
              >
                Férias
              </Link>
              <Link
                href="/calculadoras/decimo-terceiro"
                className="transition-colors hover:text-emerald-600"
              >
                13º Salário
              </Link>
              <Link
                href="/calculadoras/fgts"
                className="transition-colors hover:text-emerald-600"
              >
                FGTS
              </Link>
            </nav>
          </div>

          {/* Ferramentas */}
          <div className="space-y-4">
            <h4 className="font-semibold">Ferramentas</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/ferramentas/simulador-salario"
                className="transition-colors hover:text-emerald-600"
              >
                Simulador de Salário
              </Link>
              <Link
                href="/ferramentas/comparador-propostas"
                className="transition-colors hover:text-emerald-600"
              >
                Comparador de Propostas
              </Link>
              <Link
                href="/ferramentas/gerador-holerite"
                className="transition-colors hover:text-emerald-600"
              >
                Gerador de Holerite
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link
                href="/termos"
                className="transition-colors hover:text-emerald-600"
              >
                Termos de Uso
              </Link>
              <Link
                href="/privacidade"
                className="transition-colors hover:text-emerald-600"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/sobre"
                className="transition-colors hover:text-emerald-600"
              >
                Sobre Nós
              </Link>
              <a
                href="mailto:contato@calctrabalhista.com.br"
                className="transition-colors hover:text-emerald-600"
              >
                Contato
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}