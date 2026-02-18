// how-it-works.schema.ts
import { z } from 'zod';
import { ICONS_HOW_IT_WORKS } from '../icons/icons-how-it-works/icons.how-it-works';

const iconKeys = Object.keys(ICONS_HOW_IT_WORKS) as [string, ...string[]];

const UserStepSchema = z.object({
  number: z.number(),
  title: z.string(),
  description: z.string(),
  iconKey: z.enum(iconKeys),
  color: z.string(),
  features: z.array(z.string()),
  image: z.string().optional(),
});

const UserTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  iconKey: z.enum(iconKeys),
  description: z.string(),
  steps: z.array(UserStepSchema),
});

export const HowItWorksSchema = z.object({
  userTypes: z.array(UserTypeSchema),
});

export type HowItWorksData = z.infer<typeof HowItWorksSchema>;