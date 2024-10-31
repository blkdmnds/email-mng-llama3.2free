import React from 'react';

interface EmailSummaryProps {
  summary: string;
  loading: boolean;
}

const EmailSummary: React.FC<EmailSummaryProps> = ({ summary, loading }) => {
  if (loading) {
    return <p className="text-sm text-gray-500 mt-1">Generating summary...</p>;
  }

  return <p className="text-sm text-gray-500 mt-1">{summary}</p>;
};

export default EmailSummary;