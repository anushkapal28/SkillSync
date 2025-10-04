import api from './axios';
import type { Roadmap } from '../types';

export const createRoadmap = (payload: Partial<Roadmap>) => api.post('/roadmap', payload);
export const getRoadmaps = () => api.get<Roadmap[]>('/roadmap');
export const getRoadmap = (id: string) => api.get<Roadmap>(`/roadmap/${id}`);
export const updateRoadmap = (id: string, payload: Partial<Roadmap>) => api.put(`/roadmap/${id}`, payload);
export const deleteRoadmap = (id: string) => api.delete(`/roadmap/${id}`);
export const generateRoadmapAI = (payload: {goal: string, personality?: string}) =>
  api.post('/roadmap/generate', payload);
