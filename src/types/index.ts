export interface User {
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoadmapStep {
  title: string;
  description?: string;
  durationWeeks?: number;
  resources?: string[];
}

export interface Roadmap {
  _id?: string;
  userId?: string;
  title: string;
  goal: string;
  personality?: string | null;
  createdAt?: string;
  updatedAt?: string;
  steps: RoadmapStep[];
}

export interface ProgressItem {
  _id?: string;
  userId?: string;
  roadmapId?: string;
  stepIndex: number;
  completed: boolean;
  notes?: string;
  updatedAt?: string;
}

export interface Advice {
  _id?: string;
  userId?: string;
  title: string;
  body: string;
  createdAt?: string;
}
