import { Block } from 'payload'

export const HomeIntroBlock: Block = {
  slug: 'homeIntro',
  labels: {
    singular: 'Home Intro',
    plural: 'Home Intro Blocks',
  },
  fields: [
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        localized: true,
    },
    {
      name: 'columns',
      label: 'Text Columns',
      type: 'array',
      minRows: 1,
      localized: true,
      fields: [
        {
          name: 'textContent',
          label: 'Text Content',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
        name: 'sectionTitle',
        label: 'Section Title',
        type: 'richText',
        localized: true,
    },
    {
          name: 'links',
          type: 'array',
          label: 'Latest Links',
          localized:true,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
                name: 'icon',
                label: 'Icon',
                type: 'upload',
                relationTo: 'media',
                localized: true,
                admin: {
                  description: 'Upload an icon image for this link.',
                }
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
  ],
}
