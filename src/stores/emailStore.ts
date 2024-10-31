import { create } from 'zustand';
import { analyzeEmail } from '../services/ai';

interface Email {
  id: string;
  subject: string;
  from: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  summary?: string;
  actionItems?: string[];
  isRead: boolean;
  labels: string[];
}

interface EmailStore {
  emails: Email[];
  loading: boolean;
  error: string | null;
  setEmails: (emails: Email[]) => void;
  markAsRead: (id: string) => void;
  analyzeEmails: () => Promise<void>;
}

export const useEmailStore = create<EmailStore>((set, get) => ({
  emails: [],
  loading: false,
  error: null,
  
  setEmails: (emails) => set({ emails }),
  
  markAsRead: (id) => set((state) => ({
    emails: state.emails.map((email) =>
      email.id === id ? { ...email, isRead: true } : email
    )
  })),
  
  analyzeEmails: async () => {
    set({ loading: true, error: null });
    
    try {
      const { emails } = get();
      const analyzedEmails = await Promise.all(
        emails.map(async (email) => {
          if (email.summary) return email;
          
          try {
            const analysis = await analyzeEmail(email.content);
            return {
              ...email,
              summary: analysis.summary,
              priority: analysis.priority,
              actionItems: analysis.actionItems
            };
          } catch (error) {
            console.error(`Failed to analyze email ${email.id}:`, error);
            return email;
          }
        })
      );
      
      set({ emails: analyzedEmails, loading: false });
    } catch (error) {
      set({ error: 'Failed to analyze emails', loading: false });
    }
  }
}));