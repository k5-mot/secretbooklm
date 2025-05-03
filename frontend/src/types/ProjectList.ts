export interface ProjectSummary {
  id: string;
  name: string;
  updatedAt: string;
  sourceCount: number;
}

export interface ProjectList {
  projects: ProjectSummary[];
}
