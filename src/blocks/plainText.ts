import type { Block } from 'payload';

export const PlainTextBlock: Block = {
  slug: 'plainText',
  labels: {
    singular: 'Plain Text Block',
    plural: 'Plain Text Blocks',
  },
  fields: [
    {
      name: 'content',
      label: 'News Api',
      type: 'text',
      localized: true,
    },
  ],
};