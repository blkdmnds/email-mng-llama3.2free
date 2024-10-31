import React, { createContext, useContext, useState } from 'react';

interface APIContextType {
  apiKey: string | null;
  apiProvider: 'openai' | 'openrouter' | 'llama';
  setAPIConfig: (key: string | null, provider: 'openai' | 'openrouter' | 'llama') => void;
  isConfigured: boolean;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export const APIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(() => localStorage.getItem('apiKey'));
  const [apiProvider, setApiProvider] = useState<'openai' | 'openrouter' | 'llama'>(() => 
    (localStorage.getItem('apiProvider') as 'openai' | 'openrouter' | 'llama') || 'llama'
  );

  const setAPIConfig = (key: string | null, provider: 'openai' | 'openrouter' | 'llama') => {
    setApiKey(key);
    setApiProvider(provider);
    if (key) {
      localStorage.setItem('apiKey', key);
    } else {
      localStorage.removeItem('apiKey');
    }
    localStorage.setItem('apiProvider', provider);
  };

  return (
    <APIContext.Provider
      value={{
        apiKey,
        apiProvider,
        setAPIConfig,
        isConfigured: apiProvider === 'llama' || !!apiKey,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPI = () => {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
};