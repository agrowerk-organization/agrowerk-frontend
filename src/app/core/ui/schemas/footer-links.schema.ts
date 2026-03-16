import { z } from 'zod';
import { ICONS_FOOTER } from '../icons/icons-common/icons-layouts/icons.footer';

const iconKeys = Object.keys(ICONS_FOOTER) as [string, ...string[]];

const FooterLinkSchema = z.object({
  label: z.string(),
  iconKey: z.enum(iconKeys),
  url: z.string().optional(),
  target: z.string().optional(),
});

export const FooterLinksDataSchema = z.object({
  legislationLinks: z.array(FooterLinkSchema),
  companyLinks: z.array(FooterLinkSchema),
  productLinks: z.array(FooterLinkSchema),
  supportLinks: z.array(FooterLinkSchema),
});

export type FooterLinksData = z.infer<typeof FooterLinksDataSchema>;