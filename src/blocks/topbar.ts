import type { Block } from 'payload'

export const Topbar: Block = {
  slug: 'topbar',
  labels: {
    singular: 'Topbar',
    plural: 'Topbars',
  },

  fields: [
    {
      name: 'images',
      label: 'Images',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          localized: true,
          relationTo: 'media',
          admin: {
            description: 'Upload an image for the topbar.',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          required: true,
          defaultValue: 'internal',
          options: [
            { label: 'Internal Page', value: 'internal' },
            { label: 'External URL', value: 'external' },
          ],
        },
        {
          name: 'internalLink',
          type: 'relationship',
          relationTo: ['all-pages'],
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'internal',
          },
        },
        {
          name: 'externalLink',
          type: 'text',
          label: 'External URL',
          admin: {
            condition: (_, siblingData) => siblingData.linkType === 'external',
            description: 'Enter the full URL, e.g. https://example.com',
          },
        },
      ],
    },
  ],
}