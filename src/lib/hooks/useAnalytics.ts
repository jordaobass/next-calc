'use client';

import { useCallback } from 'react';
import * as gtag from '@/lib/analytics/google-analytics';

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, parameters: Record<string, any>) => {
    gtag.event(eventName, parameters);
  }, []);

  const trackCalculation = useCallback((calculatorType: string, data: {
    salary?: number;
    startTime?: number;
  }) => {
    const calculationTime = data.startTime ? Date.now() - data.startTime : undefined;
    const salaryRange = data.salary ? gtag.getSalaryRange(data.salary) : undefined;
    
    gtag.trackCalculatorUsage(calculatorType, {
      salary_range: salaryRange,
      calculation_time: calculationTime,
    });
  }, []);

  const trackCalculationResult = useCallback((calculatorType: string, result: {
    totalAmount?: number;
    success: boolean;
  }) => {
    gtag.trackCalculationCompleted(calculatorType, {
      total_amount: result.totalAmount,
      calculation_success: result.success,
    });
  }, []);

  const trackPDFDownload = useCallback((calculatorType: string) => {
    gtag.trackPDFDownload(calculatorType);
  }, []);

  const trackShare = useCallback((calculatorType: string, method: string = 'link') => {
    gtag.trackShare(calculatorType, method);
  }, []);

  const trackError = useCallback((error: string, context?: string) => {
    gtag.trackError(error, context);
  }, []);

  const trackAdClick = useCallback((position: string, slot?: string) => {
    gtag.trackAdClick(position, slot);
  }, []);

  const trackPageView = useCallback((url?: string) => {
    if (url) {
      gtag.pageview(new URL(url, window.location.origin));
    } else {
      gtag.pageview(new URL(window.location.href));
    }
  }, []);

  return {
    trackEvent,
    trackCalculation,
    trackCalculationResult,
    trackPDFDownload,
    trackShare,
    trackError,
    trackAdClick,
    trackPageView,
  };
}