import api from './axios';
import type { ProgressItem } from '../types';

export const getProgress = (roadmapId?: string) => api.get<ProgressItem[]>('/progress' + (roadmapId ? `?roadmapId=${roadmapId}` : ''));
export const updateProgress = (id: string, payload: Partial<ProgressItem>) => api.put(`/progress/${id}`, payload);
export const createProgress = (payload: Partial<ProgressItem>) => api.post('/progress', payload);
