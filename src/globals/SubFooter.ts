import type { GlobalConfig } from 'payload'
import { ContactMethodsBlock } from '@/blocks/ContactandQuotes'

export const SubFooter: GlobalConfig = {
  slug: 'site-subfooter',
  label: 'Site Subfooter',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'sections',
      label: 'Subfooter Sections',
      type: 'blocks',
      required: true,
      blocks: [ContactMethodsBlock],
    },
  ],
}