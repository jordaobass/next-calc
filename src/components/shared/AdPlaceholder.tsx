'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AdPlaceholderProps {
  slot: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  className?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}

export function AdPlaceholder({
  slot,
  width = 320,
  height = 100,
  responsive = true,
  className = '',
  format = 'auto',
  style = {}
}: AdPlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Reserve space to prevent CLS (Cumulative Layout Shift)
  const containerStyle: React.CSSProperties = {
    width: responsive ? '100%' : `${width}px`,
    minHeight: `${height}px`,
    ...style
  };

  if (isLoading) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={containerStyle}
      >
        <Card className="w-full h-full border-dashed">
          <CardContent className="p-4 h-full flex items-center justify-center">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={containerStyle}
    >
      {/* This would be replaced with actual AdSense code in production */}
      <div 
        className="adsbygoogle w-full h-full"
        style={{
          display: isVisible ? 'block' : 'none',
          width: responsive ? '100%' : `${width}px`,
          height: `${height}px`,
        }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
      
      {/* Development placeholder */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="w-full h-full bg-muted/30 border-dashed">
          <CardContent className="p-4 h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                AD PLACEHOLDER
              </div>
              <div className="text-xs text-muted-foreground">
                {width} × {height} • Slot: {slot}
              </div>
              <div className="text-xs text-muted-foreground/50">
                {responsive ? 'Responsive' : 'Fixed'} • {format}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Common ad sizes as components
export function LeaderboardAd({ className }: { className?: string }) {
  return (
    <AdPlaceholder
      slot="1234567890"
      width={728}
      height={90}
      format="horizontal"
      className={className}
    />
  );
}

export function RectangleAd({ className }: { className?: string }) {
  return (
    <AdPlaceholder
      slot="2345678901"
      width={300}
      height={250}
      format="rectangle"
      className={className}
    />
  );
}

export function SkyscraperAd({ className }: { className?: string }) {
  return (
    <AdPlaceholder
      slot="3456789012"
      width={160}
      height={600}
      format="vertical"
      className={className}
    />
  );
}

export function MobileBannerAd({ className }: { className?: string }) {
  return (
    <AdPlaceholder
      slot="4567890123"
      width={320}
      height={50}
      format="horizontal"
      responsive={true}
      className={className}
    />
  );
}

export function ResponsiveAd({ 
  className, 
  minHeight = 100 
}: { 
  className?: string;
  minHeight?: number;
}) {
  return (
    <AdPlaceholder
      slot="5678901234"
      height={minHeight}
      format="auto"
      responsive={true}
      className={className}
    />
  );
}