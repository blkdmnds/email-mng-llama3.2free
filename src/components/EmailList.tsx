import React, { useState } from 'react';
import { Search, Filter, Tag, Trash2, Archive, Reply, Forward } from 'lucide-react';
import EmailThread from './EmailThread';
import { mockEmails } from '../data/mockEmails';
import { Email } from '../types/email';
import { toast } from 'sonner';

interface EmailListProps {
  view: 'inbox' | 'important' | 'sent' | 'drafts';
}

const EmailList: React.FC<EmailListProps> = ({ view }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const labels = [
    { id: 'work', label: 'Work', color: 'blue' },
    { id: 'personal', label: 'Personal', color: 'green' },
    { id: 'urgent', label: 'Urgent', color: 'red' }
  ];

  // Group emails by thread
  const emailThreads = mockEmails.reduce((threads, email) => {
    const threadId = email.threadId || email.id;
    if (!threads[threadId]) {
      threads[threadId] = [];
    }
    threads[threadId].push(email);
    return threads;
  }, {} as Record<string | number, Email[]>);

  const handleDelete = (emailIds: string[]) => {
    // Implement delete functionality
    toast.success(`Deleted ${emailIds.length} email(s)`);
  };

  const handleArchive = (emailIds: string[]) => {
    // Implement archive functionality
    toast.success(`Archived ${emailIds.length} email(s)`);
  };

  const handleReply = (emailId: string) => {
    // Implement reply functionality
    toast.success('Opening reply composer');
  };

  const handleForward = (emailId: string) => {
    // Implement forward functionality
    toast.success('Opening forward composer');
  };

  const filteredThreads = Object.values(emailThreads)
    .filter(thread => {
      const mainEmail = thread[0];
      
      // Filter by view
      if (view === 'important' && !mainEmail.labels?.includes('important')) return false;
      if (view === 'sent' && mainEmail.sender !== 'me') return false;
      if (view === 'drafts' && !mainEmail.labels?.includes('draft')) return false;

      // Filter by search
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          mainEmail.subject.toLowerCase().includes(searchLower) ||
          mainEmail.sender.toLowerCase().includes(searchLower)
        );
      }

      // Filter by selected labels
      if (selectedLabels.length > 0) {
        return selectedLabels.some(label => mainEmail.labels?.includes(label));
      }

      return true;
    });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="flex items-center space-x-2">
              {selectedEmails.length > 0 && (
                <>
                  <button
                    onClick={() => handleDelete(selectedEmails)}
                    className="p-2 text-gray-500 hover:text-red-500 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleArchive(selectedEmails)}
                    className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-primary/5"
                  >
                    <Archive className="h-5 w-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-primary/5"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label) => (
                    <button
                      key={label.id}
                      onClick={() => {
                        setSelectedLabels(prev =>
                          prev.includes(label.id)
                            ? prev.filter(id => id !== label.id)
                            : [...prev, label.id]
                        );
                      }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        selectedLabels.includes(label.id)
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 border border-gray-200'
                      }`}
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {label.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {filteredThreads.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No emails found
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <EmailThread
                key={thread[0].id}
                emails={thread}
                onSelect={(emailId) => {
                  setSelectedEmails(prev =>
                    prev.includes(emailId)
                      ? prev.filter(id => id !== emailId)
                      : [...prev, emailId]
                  );
                }}
                onReply={handleReply}
                onForward={handleForward}
                onDelete={handleDelete}
                onArchive={handleArchive}
                selected={thread.some(email => selectedEmails.includes(email.id.toString()))}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailList;