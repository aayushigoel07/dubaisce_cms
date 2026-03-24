import type { Block } from 'payload'

export const HeaderBlock: Block = {
  slug: 'header',
  labels: {
    singular: 'Header',
    plural: 'Headers',
  },

  fields: [
    {
      name: 'items',
      label: 'Menu Items',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          localized: true,
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: ['all-pages'],
        },
      ],
    },
  ],
}