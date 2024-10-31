import React, { useState } from 'react';
import { X, Key, Save } from 'lucide-react';
import { useAPI } from '../contexts/APIContext';
import { toast } from 'sonner';

interface APISettingsModalProps {
  onClose: () => void;
}

const APISettingsModal: React.FC<APISettingsModalProps> = ({ onClose }) => {
  const { apiProvider, apiKey, setAPIConfig } = useAPI();
  const [key, setKey] = useState(apiKey || '');
  const [provider, setProvider] = useState<'openai' | 'openrouter' | 'llama'>(apiProvider);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (provider !== 'llama' && !key) {
      toast.error('Please enter an API key');
      return;
    }
    setAPIConfig(provider === 'llama' ? null : key, provider);
    toast.success('API settings updated successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">AI Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as 'openai' | 'openrouter' | 'llama')}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="llama">Llama 3.2 (Free)</option>
                <option value="openai">OpenAI</option>
                <option value="openrouter">OpenRouter</option>
              </select>
              {provider === 'llama' && (
                <p className="mt-2 text-sm text-gray-500">
                  Using the free Llama 3.2 model. No API key required.
                </p>
              )}
            </div>

            {provider !== 'llama' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Your API key is stored securely and never shared.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl hover:from-pink-600 hover:to-violet-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default APISettingsModal;