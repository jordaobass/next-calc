'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AdContextType {
  adsEnabled: boolean;
  adBlockDetected: boolean;
  showAds: (position: string) => boolean;
  trackAdClick: (position: string, slot?: string) => void;
}

const AdContext = createContext<AdContextType | null>(null);

interface AdProviderProps {
  children: ReactNode;
}

export function AdProvider({ children }: AdProviderProps) {
  const [adsEnabled, setAdsEnabled] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // Detectar AdBlock
    const detectAdBlock = () => {
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      testAd.style.width = '1px';
      testAd.style.height = '1px';
      
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setAdBlockDetected(true);
          console.log('AdBlock detected');
        } else {
          setAdsEnabled(true);
          console.log('Ads enabled');
        }
        
        if (document.body.contains(testAd)) {
          document.body.removeChild(testAd);
        }
      }, 100);
    };

    // Verificar se o Google AdSense está carregado
    const checkAdSenseLoaded = () => {
      if (typeof window !== 'undefined') {
        if ((window as any).adsbygoogle && (window as any).adsbygoogle.loaded) {
          setAdsEnabled(true);
        } else {
          detectAdBlock();
        }
      }
    };

    checkAdSenseLoaded();
  }, []);

  const showAds = (position: string) => {
    if (!adsEnabled || adBlockDetected) return false;
    
    // Lógica para mostrar ads baseado na posição e contexto
    // Em desenvolvimento, sempre retorna false para não quebrar
    return process.env.NODE_ENV === 'production' && adsEnabled;
  };

  const trackAdClick = (position: string, slot?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_clicked', {
        ad_position: position,
        ad_slot: slot,
        page_type: 'calculator'
      });
    }
    
    console.log('Ad clicked:', { position, slot });
  };

  return (
    <AdContext.Provider value={{ adsEnabled, adBlockDetected, showAds, trackAdClick }}>
      {children}
    </AdContext.Provider>
  );
}

export const useAds = () => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within AdProvider');
  }
  return context;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    adsbygoogle: any;
    gtag: (...args: any[]) => void;
  }
}