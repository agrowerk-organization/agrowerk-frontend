import { z } from 'zod';
import { ICONS_INITIAL_CTA } from '../icons/icons-home/icons.initial-cta';

const iconKeys = Object.keys(ICONS_INITIAL_CTA) as [string, ...string[]];

const BadgeSchema = z.object({
  text: z.string(),
  iconKey: z.enum(iconKeys),
});

const StepSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  iconKey: z.enum(iconKeys),
});

const ActionSchema = z.object({
  title: z.string(),
  iconKey: z.enum(iconKeys),
  target: z.string(),
  type: z.enum(['primary', 'secondary']),
});

const TrustSchema = z.object({
  subtitle: z.string(),
  quantity: z.number(),
  iconKey: z.enum(iconKeys),
});

export const InitialCtaSchema = z.object({
  badges: z.array(BadgeSchema),
  steps: z.array(StepSchema),
  actions: z.array(ActionSchema),
  trusts: z.array(TrustSchema),
});

export type InitialCtaData = z.infer<typeof InitialCtaSchema>;