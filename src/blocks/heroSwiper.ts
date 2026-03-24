import type { Block } from 'payload'

export const HeroSwiperBlock: Block = {
  slug: 'heroSwiper',
  labels: {
    singular: 'Hero Swiper',
    plural: 'Hero Swipers',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      localized: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          localized: true,
        },
        {
          name: 'button',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Button Text',
              localized: true,
            },

            {
              name: 'linkType',
              type: 'radio',
              required: true,
              defaultValue: 'internal',
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' },
                { label: 'File Upload', value: 'file' },
              ],
            },

            {
              name: 'internalLink',
              type: 'relationship',
              relationTo: ['all-pages','news'],
              admin: {
                condition: (_, siblingData) => siblingData.linkType === 'internal',
              },
            },

            {
              name: 'externalLink',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.linkType === 'external',
              },
            },
            {
              name: 'fileLink',
              type: 'upload',
              label: 'File',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData.linkType === 'file',
                description: 'Upload a file for users to download.',
              },
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
