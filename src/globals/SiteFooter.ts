import type { GlobalConfig } from 'payload'
import { FooterImagesTextBlock } from '@/blocks/FooterImagesText'
import { BottomFooterBlock } from '@/blocks/bottomFooter'

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Site footer',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'sections',
      label: 'Footer Sections',
      type: 'blocks',
      required: true,
      blocks: [
        FooterImagesTextBlock,
        BottomFooterBlock
    ],
    },
  ],
}