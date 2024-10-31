import React, { useState } from 'react';
import { useAPI } from '../contexts/APIContext';
import { Key, Save } from 'lucide-react';

const SettingsPage = () => {
  const { apiProvider, setAPIConfig } = useAPI();
  const [key, setKey] = useState('');
  const [provider, setProvider] = useState<'openai' | 'openrouter'>(apiProvider);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAPIConfig(key, provider);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                API Settings
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Configure your AI provider settings to enable email analysis features.</p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    API Provider
                  </label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as 'openai' | 'openrouter')}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="openai">OpenAI</option>
                    <option value="openrouter">OpenRouter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                        placeholder="Enter your API key"
                      />
                    </div>
                    <button
                      type="submit"
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <Save className="h-5 w-5 text-gray-400" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;