'use client';

import Link from 'next/link';
import { Calculator, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config/site';
import { CalculatorDropdown } from './CalculatorDropdown';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden items-center space-x-6 md:flex">
          <CalculatorDropdown />
          <Link
            href="/ferramentas"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
          >
            Ferramentas
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
          >
            Sobre
          </Link>
          <a
            href="mailto:contato@nextcalc.com.br"
            className="text-sm font-medium transition-colors hover:text-emerald-600"
          >
            Contato
          </a>
        </nav>

        <div className="ml-auto flex items-center space-x-2">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            size="sm"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-14 border-b bg-background p-4 shadow-lg md:hidden">
            <nav className="flex flex-col space-y-3">
              <CalculatorDropdown onItemClick={() => setIsMenuOpen(false)} />
              <Link
                href="/ferramentas"
                className="text-sm font-medium transition-colors hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Ferramentas
              </Link>
              <Link
                href="/sobre"
                className="text-sm font-medium transition-colors hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <a
                href="mailto:contato@nextcalc.com.br"
                className="text-sm font-medium transition-colors hover:text-emerald-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}