import axios from 'axios';

interface AIResponse {
  summary: string;
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = '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';

export const analyzeEmail = async (content: string): Promise<AIResponse> => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes emails. Extract key information, create a summary, determine priority, and identify action items.'
          },
          {
            role: 'user',
            content: `Analyze this email and provide a summary, priority level (high/medium/low), and action items:\n\n${content}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Email AI Manager',
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data.choices[0].message.content;
    return parseAIResponse(result);
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('Failed to analyze email');
  }
};

export const generateEmailResponse = async (prompt: string, context: string): Promise<string> => {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps compose email responses. Generate professional and contextually appropriate responses.'
          },
          {
            role: 'user',
            content: `Context: ${context}\n\nPrompt: ${prompt}\n\nGenerate an email response:`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Email AI Manager',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to generate email response:', error);
    throw new Error('Failed to generate email response');
  }
};

const parseAIResponse = (response: string): AIResponse => {
  // Extract summary (first paragraph)
  const summary = response.split('\n')[0];

  // Extract priority
  const priority = determinePriority(response);

  // Extract action items
  const actionItems = extractActionItems(response);

  return {
    summary,
    priority,
    actionItems
  };
};

const determinePriority = (content: string): 'high' | 'medium' | 'low' => {
  const urgentTerms = ['urgent', 'asap', 'emergency', 'deadline', 'high priority'];
  const importantTerms = ['important', 'priority', 'review', 'feedback'];
  
  content = content.toLowerCase();
  
  if (urgentTerms.some(term => content.includes(term))) {
    return 'high';
  } else if (importantTerms.some(term => content.includes(term))) {
    return 'medium';
  }
  return 'low';
};

const extractActionItems = (content: string): string[] => {
  const actionItems: string[] = [];
  const lines = content.split('\n');
  
  let inActionItemsSection = false;
  
  for (const line of lines) {
    const lowerLine = line.toLowerCase();
    if (lowerLine.includes('action item') || lowerLine.includes('todo') || line.includes('- [ ]')) {
      inActionItemsSection = true;
      continue;
    }
    
    if (inActionItemsSection && line.trim()) {
      // Clean up the action item text
      const cleanedItem = line
        .replace(/^[-*•\[\]]\s*/, '') // Remove list markers
        .replace(/^\d+\.\s*/, '') // Remove numbered list markers
        .trim();
      
      if (cleanedItem) {
        actionItems.push(cleanedItem);
      }
    }
    
    // Stop collecting action items if we hit another section
    if (inActionItemsSection && line.trim() && line.endsWith(':')) {
      inActionItemsSection = false;
    }
  }
  
  return actionItems;
};