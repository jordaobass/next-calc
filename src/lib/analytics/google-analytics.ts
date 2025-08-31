// Google Analytics configuration and tracking functions

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Track page views
export const pageview = (url: URL) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (action: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, parameters);
  }
};

// Track calculator usage
export const trackCalculatorUsage = (calculatorType: string, data: {
  salary_range?: string;
  calculation_time?: number;
  user_agent?: string;
}) => {
  event('calculator_used', {
    calculator_type: calculatorType,
    ...data,
  });
};

// Track calculation completion
export const trackCalculationCompleted = (calculatorType: string, result: {
  total_amount?: number;
  calculation_success: boolean;
}) => {
  event('calculation_completed', {
    calculator_type: calculatorType,
    value: result.total_amount || 0,
    success: result.calculation_success,
  });
};

// Track PDF downloads
export const trackPDFDownload = (calculatorType: string) => {
  event('pdf_download', {
    calculator_type: calculatorType,
    value: 1,
  });
};

// Track sharing
export const trackShare = (calculatorType: string, method: string) => {
  event('share', {
    content_type: 'calculation_result',
    calculator_type: calculatorType,
    method: method,
  });
};

// Track ad clicks
export const trackAdClick = (position: string, slot?: string) => {
  event('ad_clicked', {
    ad_position: position,
    ad_slot: slot,
    page_type: 'calculator',
  });
};

// Track errors
export const trackError = (error: string, context?: string) => {
  event('exception', {
    description: error,
    fatal: false,
    context: context,
  });
};

// Get salary range for analytics
export const getSalaryRange = (salary: number): string => {
  if (salary <= 1500) return '0-1500';
  if (salary <= 3000) return '1501-3000';
  if (salary <= 5000) return '3001-5000';
  if (salary <= 10000) return '5001-10000';
  if (salary <= 20000) return '10001-20000';
  return '20000+';
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}