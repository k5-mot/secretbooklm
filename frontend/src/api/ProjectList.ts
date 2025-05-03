import type { ProjectList } from "../types/ProjectList";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchProjectList(): Promise<ProjectList> {
  const response = await fetch(`${baseUrl}/api/project-list`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // return response.json();
  return mockProjectList;
}

const mockProjectList: ProjectList = {
  projects: [
    {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "AI研究プロジェクト",
      updatedAt: "2024/12/15",
      sourceCount: 12,
    },
    {
      id: "f1e2d3c4-b5a6-9870-fedc-ba0987654321",
      name: "Webアプリケーション開発",
      updatedAt: "2024/12/10",
      sourceCount: 8,
    },
    {
      id: "9876543a-bcde-f012-3456-789abcdef012",
      name: "データ分析ダッシュボード",
      updatedAt: "2024/12/08",
      sourceCount: 15,
    },
    {
      id: "fedcba98-7654-3210-fedc-ba9876543210",
      name: "モバイルアプリUI設計",
      updatedAt: "2024/12/05",
      sourceCount: 6,
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "機械学習モデル開発",
      updatedAt: "2024/12/03",
      sourceCount: 20,
    },
    {
      id: "987fcdeb-51a2-4d3c-8e9f-123456789abc",
      name: "ブロックチェーン実装",
      updatedAt: "2024/11/28",
      sourceCount: 9,
    },
    {
      id: "456789ab-cdef-0123-4567-89abcdef0123",
      name: "クラウドインフラ構築",
      updatedAt: "2024/11/25",
      sourceCount: 11,
    },
    {
      id: "cdef0123-4567-89ab-cdef-0123456789ab",
      name: "セキュリティ監査システム",
      updatedAt: "2024/11/20",
      sourceCount: 7,
    },
    {
      id: "89abcdef-0123-4567-89ab-cdef01234567",
      name: "IoTデバイス連携",
      updatedAt: "2024/11/18",
      sourceCount: 14,
    },
    {
      id: "01234567-89ab-cdef-0123-456789abcdef",
      name: "ゲーム開発エンジン",
      updatedAt: "2024/11/15",
      sourceCount: 18,
    },
  ],
};
