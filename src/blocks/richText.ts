import type { Block } from 'payload';

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'content',
      label: 'Text Content',
      type: 'richText',
      localized: true,
    },
  ],
};