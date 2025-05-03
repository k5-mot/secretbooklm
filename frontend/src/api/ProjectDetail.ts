import type { ProjectDetail } from "../types/ProjectDetail";
import { v4 as uuidv4 } from "uuid";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchProjectDetail(projectId: string): Promise<ProjectDetail> {
  const response = await fetch(`${baseUrl}/api/project/${projectId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // return response.json();
  return mockProjectDetail;
}

const mockProjectDetail: ProjectDetail = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  name: "AI研究プロジェクト",
  description: "AIに関する研究プロジェクトです。",
  sources: [
    {
      id: uuidv4(),
      name: "AI論文.pdf",
      type: "pdf",
      date: "2023-05-10",
      checked: true,
    },
  ],
  messages: [
    {
      id: uuidv4(),
      content: "Hello! How can I help you today?",
      timestamp: new Date().toISOString(),
      sender: "assistant",
    },
  ],
  memos: [
    {
      id: uuidv4(),
      title: "サンプルメモ",
      content:
        "これはサンプルのメモです。チャットメッセージをブックマークして保存することができます。",
      summary: "サンプルメモの概要です。",
      type: "bookmark",
      updatedAt: new Date().toISOString(),
    },
  ],
};
