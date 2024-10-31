import React from 'react';
import EmailAnalytics from './EmailAnalytics';
import EmailList from './EmailList';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid gap-6">
        <EmailAnalytics />
        <EmailList view="inbox" />
      </div>
    </div>
  );
};

export default Dashboard;