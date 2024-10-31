import React, { useState } from 'react';
import { Send, X, Wand2, Paperclip } from 'lucide-react';
import { generateEmailResponse } from '../services/ai';
import { toast } from 'sonner';

interface ComposeEmailProps {
  onClose: () => void;
  onSend: (email: { to: string; subject: string; content: string }) => void;
  replyTo?: { to: string; subject: string; content: string };
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ onClose, onSend, replyTo }) => {
  const [to, setTo] = useState(replyTo?.to || '');
  const [subject, setSubject] = useState(replyTo?.subject.startsWith('Re:') ? replyTo.subject : replyTo ? `Re: ${replyTo.subject}` : '');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const handleAIAssist = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content first');
      return;
    }

    setIsGenerating(true);
    try {
      const enhancedContent = await generateEmailResponse(
        'Improve this email content to be more professional and effective',
        content
      );
      setContent(enhancedContent);
      toast.success('AI suggestions added');
    } catch (error) {
      toast.error('Failed to get AI assistance');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !subject || !content) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSend({ to, subject, content });
    toast.success('Email sent successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">New Message</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowCc(!showCc)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cc
              </button>
              <button
                type="button"
                onClick={() => setShowBcc(!showBcc)}
                className="text-gray-500 hover:text-gray-700"
              >
                Bcc
              </button>
            </div>

            {showCc && (
              <input
                type="email"
                placeholder="Cc"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            )}

            {showBcc && (
              <input
                type="email"
                placeholder="Bcc"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            )}

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />

            <textarea
              placeholder="Write your message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleAIAssist}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50"
              >
                <Wand2 className="w-4 h-4" />
                <span>{isGenerating ? 'Generating...' : 'AI Assist'}</span>
              </button>
              <button
                type="button"
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                <Paperclip className="w-4 h-4" />
                <span>Attach</span>
              </button>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeEmail;