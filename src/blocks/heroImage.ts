import type { Block } from 'payload';

export const HeroImageBlock: Block = {
  slug: 'heroImage',
  labels: {
    singular: 'Hero Image Block',
    plural: 'Hero Image Blocks',
  },

  fields: [
    {
      name: 'heroImage',
      label: 'Hero Background Image',
      type: 'upload',
      relationTo: 'media',
      localized: true,
    },
  ],
};