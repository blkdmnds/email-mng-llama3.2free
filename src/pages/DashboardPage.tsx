import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import EmailList from '../components/EmailList';
import ComposeEmail from '../components/ComposeEmail';
import { useEmailStore } from '../stores/emailStore';
import { Loader2 } from 'lucide-react';

const DashboardPage = () => {
  const { loading } = useEmailStore();
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar onCompose={() => setShowCompose(true)} />
      
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="inbox" element={<EmailList view="inbox" />} />
            <Route path="important" element={<EmailList view="important" />} />
            <Route path="sent" element={<EmailList view="sent" />} />
            <Route path="drafts" element={<EmailList view="drafts" />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        )}

        {showCompose && (
          <ComposeEmail
            onClose={() => setShowCompose(false)}
            onSend={(email) => {
              console.log('Sending email:', email);
              setShowCompose(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default DashboardPage;