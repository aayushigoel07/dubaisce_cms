import type { Block } from 'payload';

export const CardGallery: Block = {
  slug: 'cardGallery',
  labels: {
    singular: 'Card Gallery',
    plural: 'Card Galleries',
  },

  fields: [
    {
      name: 'cards',
      label: 'Cards',
      type: 'array',
      required: true,
      localized: true,
      fields: [
          {
        name: 'title',
        label: 'Gallery Title',
        type: 'text',
        localized: true,
    },
        {
          name: 'cardBlocks',
          label: 'Cards to Display',
          type: 'relationship',
          relationTo: 'cards',
          hasMany: true,
          admin: {
            description: 'Select one or more cards to display',
          },
        },
      ],
    },
  ],
};