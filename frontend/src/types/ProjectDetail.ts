export interface Source {
  id: string;
  name: string;
  type: string;
  date: string;
  checked: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "assistant" | "system";
}

export interface Memo {
  id: string;
  title: string;
  content: string;
  summary: string;
  type: "note" | "bookmark" | "document";
  updatedAt: string;
}

export interface ProjectDetail {
  id: string; // UUIDを想定してstringに変更
  name: string;
  description: string;
  sources: Source[];
  messages: Message[];
  memos: Memo[];
}
