export const roadmapPrompt = (goal: string) => `
Create a detailed step-by-step learning roadmap for someone whose goal is: "${goal}". 
Provide 8-12 clear steps in order.
`;

export const weeklyAdvicePrompt = (goal: string) => `
Give a short, practical weekly advice to someone learning "${goal}".
Keep it concise and motivating.
`;
