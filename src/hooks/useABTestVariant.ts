import { useEffect } from 'react';
import { useABTest } from '../contexts/ABTestContext';

export const useABTestVariant = (testId: string) => {
  const { getVariant, tests } = useABTest();
  const variant = getVariant(testId);
  const variantData = tests[testId]?.variants[variant];

  useEffect(() => {
    // Log variant assignment for debugging
    console.log(`Test ${testId} assigned variant ${variant}`);
  }, [testId, variant]);

  return {
    variant,
    data: variantData
  };
};