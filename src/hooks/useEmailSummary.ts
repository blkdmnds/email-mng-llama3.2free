import { useState, useEffect } from 'react';

const useEmailSummary = (emailContent: string) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSummary(`Summary: ${emailContent.slice(0, 100)}${emailContent.length > 100 ? '...' : ''}`);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [emailContent]);

  return { summary, loading };
};

export default useEmailSummary;