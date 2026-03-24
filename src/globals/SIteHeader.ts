import type { GlobalConfig } from 'payload'
import { Topbar } from '@/blocks/topbar'
import { HeaderBlock } from '@/blocks/header'

export const Header: GlobalConfig = {
  slug: 'site-header',
  label: 'Site Header',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'sections',
      label: 'Header Sections',
      type: 'blocks',
      required: true,
      blocks: [
        Topbar,
        HeaderBlock
      ],
    },
  ],
}