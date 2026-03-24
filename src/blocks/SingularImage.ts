import type { Block } from 'payload';

export const SingularImageBlock: Block = {
  slug: 'singularImage',
  labels: {
    singular: 'Singular Image Block',
    plural: 'Singular Image Blocks',
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