import React from 'react';
import { Star, Clock, MoreVertical } from 'lucide-react';
import EmailSummary from './EmailSummary';
import useEmailSummary from '../hooks/useEmailSummary';
import { Email } from '../types/email';

interface EmailItemProps {
  email: Email;
}

const EmailItem: React.FC<EmailItemProps> = ({ email }) => {
  const { summary, loading } = useEmailSummary(email.preview);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {email.sender.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <p className={`text-sm font-medium ${email.read ? 'text-gray-600' : 'text-gray-900'}`}>
                {email.sender}
              </p>
              <span className="text-sm text-gray-500">{email.time}</span>
            </div>
            <h3 className={`text-base ${email.read ? 'text-gray-600' : 'font-medium text-gray-900'}`}>
              {email.subject}
            </h3>
            <EmailSummary summary={summary} loading={loading} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
            <Star className="h-5 w-5" />
          </button>
          <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
            <Clock className="h-5 w-5" />
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;