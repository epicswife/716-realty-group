export enum AgentType {
  FRONT_DESK = 'FRONT_DESK',
  DOCS_SPECIALIST = 'DOCS_SPECIALIST'
}

export interface AgentConfig {
  id: AgentType;
  name: string;
  role: string;
  description: string;
  systemInstruction: string;
  voiceName: string;
  avatarUrl: string;
}

export interface MessageLog {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}