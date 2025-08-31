'use client';

import { useEffect, useRef } from 'react';
import { useAds } from './AdProvider';

interface AdBannerProps {
  slot: string; // AdSense slot ID
  size: 'leaderboard' | 'rectangle' | 'skyscraper' | 'responsive' | 'mobile-banner';
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
}

export function AdBanner({ 
  slot, 
  size, 
  position, 
  className = '',
  format = 'auto' 
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const { showAds, trackAdClick } = useAds();
  
  useEffect(() => {
    if (!showAds(position)) return;
    
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error);
    }
  }, [showAds, position]);

  // Se ads não estão habilitados, não renderizar nada
  if (!showAds(position)) {
    return null;
  }

  const adSizes = {
    leaderboard: 'w-full h-[90px] max-w-[728px]', // 728x90
    rectangle: 'w-[300px] h-[250px]', // 300x250
    skyscraper: 'w-[160px] h-[600px]', // 160x600
    responsive: 'w-full h-auto min-h-[200px]', // Responsive
    'mobile-banner': 'w-full h-[50px] max-w-[320px]', // 320x50
  };

  const handleAdClick = () => {
    trackAdClick(position, slot);
  };

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div className="text-center">
        {/* Label de publicidade - obrigatório no Brasil */}
        <p className="text-xs text-gray-500 mb-1">Publicidade</p>
        
        <div onClick={handleAdClick}>
          <ins
            ref={adRef}
            className={`adsbygoogle block ${adSizes[size]} border border-gray-200 rounded`}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}
            data-ad-slot={slot}
            data-ad-format={format === 'auto' ? (size === 'responsive' ? 'auto' : undefined) : format}
            data-full-width-responsive={size === 'responsive' ? 'true' : 'false'}
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#f8f9fa', // Placeholder background
            }}
          />
        </div>
      </div>
    </div>
  );
}