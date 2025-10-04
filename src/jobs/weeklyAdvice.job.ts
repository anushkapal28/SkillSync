import cron from 'node-cron';
import { generateAdvice } from '../services/openai.service';
import User from '../models/User';
import { sendEmail } from '../services/email.service';

export const weeklyAdviceJob = () => {
  // Runs every Monday at 8 AM
  cron.schedule('0 8 * * 1', async () => {
    const users = await User.find();
    for (const user of users) {
      const advice = await generateAdvice('your learning goal');
      await sendEmail(user.email, 'Weekly Advice', advice);
    }
  });
};
