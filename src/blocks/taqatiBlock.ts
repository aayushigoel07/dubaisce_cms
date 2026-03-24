import type { Block } from 'payload';

export const TaqatiBlock: Block = {
  slug: 'taqati',
  labels: {
    singular: 'Taqati Block',
    plural: 'Taqati Blocks',
  },

  fields: [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        localized: true
    },
    {
        name: 'description',
        label: 'Description',
        type: 'richText',
        localized: true
    },
    {
      name: 'cards',
      label: 'Cards',
      type: 'array',
      required: true,
      localized: true,
      fields: [
          {
        name: 'title',
        label: 'Card title',
        type: 'text',
        localized: true,
    },
        {
          name: 'image',
          label: 'Card Image',
          type: 'upload',
          relationTo: 'media'
        },
      ],
    },
    {
        name: 'sideImage',
        label: 'Side Image',
        type: 'upload',
        relationTo: 'media',
        localized: true
    }
  ],
};