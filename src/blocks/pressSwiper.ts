import type { Block } from 'payload'

export const PressSwiperBlock: Block = {
  slug: 'pressSwiper',
  labels: {
    singular: 'Press Swiper',
    plural: 'Press Swipers',
  },
  fields: [
    {
        name: 'sectionTitle',
        label: 'Section Title',
        type: 'text',
        localized: true,
    },
    {
        name: 'buttontext',
        label: 'Button Text',
        type: 'richText',
        localized: true,
    },
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
              ],
            },

            {
              name: 'internalLink',
              type: 'relationship',
              relationTo: ['all-pages', 'news'],
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
