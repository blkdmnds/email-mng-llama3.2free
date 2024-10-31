import React, { createContext, useContext, useState, useEffect } from 'react';

type Variant = 'A' | 'B';

interface Test {
  id: string;
  variants: {
    A: any;
    B: any;
  };
}

interface ABTestContextType {
  getVariant: (testId: string) => Variant;
  trackConversion: (testId: string) => void;
  tests: Record<string, Test>;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

// Define our A/B tests
const tests: Record<string, Test> = {
  'landing-hero': {
    variants: {
      A: {
        heading: "Email Management Reimagined with AI",
        cta: "Get Started Free"
      },
      B: {
        heading: "10x Your Email Productivity with AI",
        cta: "Try It Now"
      }
    }
  },
  'login-form': {
    variants: {
      A: {
        layout: 'standard',
        socialButtonsPosition: 'top'
      },
      B: {
        layout: 'compact',
        socialButtonsPosition: 'bottom'
      }
    }
  }
};

export const ABTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variants, setVariants] = useState<Record<string, Variant>>({});

  useEffect(() => {
    // Assign variants on mount
    const assignedVariants = Object.keys(tests).reduce((acc, testId) => {
      acc[testId] = Math.random() < 0.5 ? 'A' : 'B';
      return acc;
    }, {} as Record<string, Variant>);

    setVariants(assignedVariants);

    // Track page view for analytics
    Object.entries(assignedVariants).forEach(([testId, variant]) => {
      trackPageView(testId, variant);
    });
  }, []);

  const getVariant = (testId: string): Variant => {
    return variants[testId] || 'A';
  };

  const trackConversion = (testId: string) => {
    const variant = variants[testId];
    if (variant) {
      trackEvent('conversion', {
        testId,
        variant,
        timestamp: new Date().toISOString()
      });
    }
  };

  const trackPageView = (testId: string, variant: Variant) => {
    trackEvent('pageview', {
      testId,
      variant,
      timestamp: new Date().toISOString()
    });
  };

  const trackEvent = (eventType: string, data: any) => {
    // In a real application, send this to your analytics service
    console.log('Track event:', eventType, data);
  };

  return (
    <ABTestContext.Provider value={{ getVariant, trackConversion, tests }}>
      {children}
    </ABTestContext.Provider>
  );
};

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (context === undefined) {
    throw new Error('useABTest must be used within an ABTestProvider');
  }
  return context;
};