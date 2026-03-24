import type { Block } from 'payload';

export const DsmTextImageBlock: Block = {
  slug: 'dsmTextImage',
  labels: {
    singular: 'DSM Text Image Block',
    plural: 'DSM Text Image Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: {
        description: 'Upload an image for this block.',
      },
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      localized: true,
    },
  ],
};