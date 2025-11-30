import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client. 
// Note: API_KEY is expected to be in the environment variables.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// System instruction for the education assistant
const SYSTEM_INSTRUCTION = `You are the "Kexin Smart Education Assistant". 
You help school administrators, teachers, and students with educational tasks.
Your capabilities include:
1. Analyzing student performance trends.
2. Generating lesson plan ideas.
3. Drafting announcements for parents.
4. Summarizing educational policies.

Keep responses concise, professional, and encouraging.`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service.";
  }
};
