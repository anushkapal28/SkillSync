import OpenAI from 'openai';
import dotenv from 'dotenv';
import { roadmapPrompt, weeklyAdvicePrompt } from '../utils/promptTemplate';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateRoadmap = async (goal: string) => {
  try {
    const prompt = roadmapPrompt(goal);
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const content = response.choices[0].message?.content || '';
    const steps = content.split(/\n+/).filter((line) => line.trim() !== '');
    return steps;
  } catch (err) {
    console.error('OpenAI error:', err);
    return [];
  }
};
export const generateAdvice = async (goal: string) => {
  try {
    const prompt = weeklyAdvicePrompt(goal);
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    const content = response.choices[0].message?.content || '';
    return content.trim();
  } catch (err) {
    console.error('OpenAI advice error:', err);
    return 'Keep learning and stay consistent!';
  }
};