import React, { useState } from 'react';
import { Mail, Forward, Bot, Clock, AlertTriangle, Plus, X } from 'lucide-react';

interface WorkflowBuilderProps {
  onClose: () => void;
  onSave: (workflow: any) => void;
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ onClose, onSave }) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [condition, setCondition] = useState('');
  const [actionType, setActionType] = useState('forward');
  const [recipients, setRecipients] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSave = () => {
    onSave({
      emails: selectedEmails,
      condition,
      actionType,
      recipients,
      aiPrompt,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create Workflow</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Incoming Emails */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              Incoming Emails
            </h3>
            <div className="space-y-3">
              {['gmail.com', 'outlook.com', 'icloud.com'].map((domain) => (
                <div
                  key={domain}
                  className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">user@{domain}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
              IF Condition
            </h3>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                IF
              </div>
              <input
                type="text"
                placeholder="the email is about..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
          </div>

          {/* Action */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Forward className="h-5 w-5 mr-2 text-primary" />
              THEN Action
            </h3>
            <div className="space-y-4">
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="forward">Forward Email</option>
                <option value="ai">AI Analysis</option>
                <option value="notify">Send Notification</option>
              </select>

              {actionType === 'forward' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Recipients</label>
                  <div className="flex flex-wrap gap-2">
                    {recipients.map((email, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        {email}
                        <button
                          onClick={() => setRecipients(recipients.filter((_, i) => i !== index))}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <input
                      type="email"
                      placeholder="Add email..."
                      className="px-3 py-1 rounded-full border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          if (input.value) {
                            setRecipients([...recipients, input.value]);
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {actionType === 'ai' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">AI Prompt</label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Enter your AI prompt..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={4}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 transition-colors"
          >
            Save Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;