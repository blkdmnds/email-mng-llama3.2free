export interface Email {
  id: number | string;
  threadId?: number;
  subject: string;
  sender: string;
  preview: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  starred?: boolean;
  labels?: string[];
  category?: string;
  content?: string;
  to?: string[];
  from?: string;
  date?: string;
  attachments?: Array<{
    name: string;
    url: string;
    size?: number;
    type?: string;
  }>;
}