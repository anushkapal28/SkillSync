import api from './axios';
import type { Advice } from '../types';

export const requestAdviceNow = (payload: {topic?: string}) => api.post<Advice>('/advice/request', payload);
export const getAdvice = () => api.get<Advice[]>('/advice');
