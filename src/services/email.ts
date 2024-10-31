import axios from 'axios';
import { Email } from '../types/email';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface IMAPConfig {
  email: string;
  password: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
  secure: boolean;
}

export const testImapConnection = async (config: IMAPConfig): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/test-connection`, config);
    return response.data.success;
  } catch (error) {
    console.error('Failed to test connection:', error);
    throw new Error('Failed to connect to IMAP server');
  }
};

export const syncEmails = async (config: IMAPConfig): Promise<Email[]> => {
  try {
    const response = await axios.post(`${API_URL}/emails`, config);
    return response.data;
  } catch (error) {
    console.error('Failed to sync emails:', error);
    throw new Error('Failed to sync emails');
  }
};