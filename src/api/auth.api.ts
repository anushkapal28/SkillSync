import api from './axios';
import type { User } from "../types";


export const signup = (payload: {name: string; email: string; password: string}) =>
  api.post('/auth/signup', payload);

export const login = (payload: {email: string; password: string}) =>
  api.post('/auth/login', payload);

export const getMe = () => api.get<User>('/auth/me');
