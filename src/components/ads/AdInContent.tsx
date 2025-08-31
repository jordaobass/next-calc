'use client';

import { useEffect, useState } from 'react';
import { useAds } from './AdProvider';
import { AdBanner } from './AdBanner';

interface AdInContentProps {
  slot: string;
  showAfterCalculation?: boolean;
  delaySeconds?: number;
}

export function AdInContent({ 
  slot, 
  showAfterCalculation = false, 
  delaySeconds = 2 
}: AdInContentProps) {
  const [shouldShow, setShouldShow] = useState(!showAfterCalculation);
  const { showAds } = useAds();

  useEffect(() => {
    if (!showAfterCalculation) return;
    
    // Mostrar ad após usuário interagir com calculadora
    const timer = setTimeout(() => setShouldShow(true), delaySeconds * 1000);
    return () => clearTimeout(timer);
  }, [showAfterCalculation, delaySeconds]);

  if (!showAds('content') || !shouldShow) {
    return null;
  }

  return (
    <div className="my-8 p-4 border-t border-b border-gray-200 bg-gray-50/50 rounded-lg">
      <AdBanner 
        slot={slot}
        size="responsive"
        position="middle"
        className="max-w-[600px] mx-auto"
        format="horizontal"
      />
    </div>
  );
}