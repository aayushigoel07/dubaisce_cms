import type { Block } from 'payload';

export const DsmImageBlock: Block = {
  slug: 'dsmImage',
  labels: {
    singular: 'DSM Image Block',
    plural: 'DSM Image Blocks',
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
    }
}
  ],
};