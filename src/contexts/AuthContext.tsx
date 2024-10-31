import React, { createContext, useContext, useState, useCallback } from 'react';
import { IMAPConfig, syncEmails } from '../services/email';
import { Email } from '../types/email';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  emails: Email[];
  loginWithImap: (config: IMAPConfig) => Promise<void>;
  logout: () => void;
}

interface User {
  email: string;
  imapConfig: IMAPConfig;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedConfig = sessionStorage.getItem('emailConfig');
    return savedConfig ? { email: JSON.parse(savedConfig).email, imapConfig: JSON.parse(savedConfig) } : null;
  });
  const [emails, setEmails] = useState<Email[]>([]);

  const loginWithImap = useCallback(async (config: IMAPConfig) => {
    try {
      // Test connection by syncing emails
      const syncedEmails = await syncEmails(config);
      
      // If successful, set user and emails
      setUser({
        email: config.email,
        imapConfig: config
      });
      setEmails(syncedEmails);
      
      // Store credentials securely
      sessionStorage.setItem('emailConfig', JSON.stringify(config));
      
      toast.success('Successfully connected to email server');
    } catch (error) {
      console.error('IMAP login failed:', error);
      toast.error('Failed to connect to email server. Please check your credentials.');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setEmails([]);
    sessionStorage.removeItem('emailConfig');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        emails,
        loginWithImap,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};