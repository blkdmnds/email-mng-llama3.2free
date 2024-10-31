import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Star, Clock, MoreVertical, Reply, Forward, Archive, Trash2 } from 'lucide-react';
import { Email } from '../types/email';
import { formatDistanceToNow } from 'date-fns';

interface EmailThreadProps {
  emails: Email[];
  onSelect: (emailId: string) => void;
  onReply: (emailId: string) => void;
  onForward: (emailId: string) => void;
  onDelete: (emailIds: string[]) => void;
  onArchive: (emailIds: string[]) => void;
  selected: boolean;
}

const EmailThread: React.FC<EmailThreadProps> = ({
  emails,
  onSelect,
  onReply,
  onForward,
  onDelete,
  onArchive,
  selected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const mainEmail = emails[0];

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`group transition-colors ${selected ? 'bg-primary/5' : 'hover:bg-gray-50'}`}>
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(mainEmail.id.toString())}
            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
          />
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            {expanded ? 
              <ChevronDown className="h-5 w-5" /> : 
              <ChevronRight className="h-5 w-5" />
            }
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <span className={`font-medium truncate ${mainEmail.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {mainEmail.sender}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {formatDate(mainEmail.time)}
                </span>
              </div>

              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onReply(mainEmail.id.toString())}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <Reply className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onForward(mainEmail.id.toString())}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <Forward className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onArchive([mainEmail.id.toString()])}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <Archive className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete([mainEmail.id.toString()])}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <h3 className={`text-sm ${mainEmail.read ? 'text-gray-600' : 'font-medium text-gray-900'}`}>
              {mainEmail.subject}
            </h3>
            
            <p className="text-sm text-gray-500 truncate">
              {mainEmail.preview}
            </p>

            {mainEmail.labels && mainEmail.labels.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {mainEmail.labels.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4">
          <div className="pl-9 ml-4">
            <div className="prose prose-sm max-w-none text-gray-600">
              {mainEmail.content}
            </div>
            {mainEmail.attachments && mainEmail.attachments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="flex flex-wrap gap-2">
                  {mainEmail.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                    >
                      {attachment.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailThread;