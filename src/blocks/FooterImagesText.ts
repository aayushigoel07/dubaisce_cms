import { Block } from 'payload';

export const FooterImagesTextBlock: Block = {   
    slug: 'footerImagesText',
    labels: {
        singular: 'Footer Images and Text Block',   
        plural: 'Footer Images and Text Blocks',
    },
    fields: [
        {
            name: 'images',
            label: 'Footer Images',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'image',
                    label: 'Image',
                    type: 'upload',
                    relationTo: 'media',
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
            ]
        },
        {
            name: 'text',
            label: 'Footer Text',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'content',
                    label: 'Content',
                    type: 'richText',
                    localized: true,
                }
            ]
        }
    ]
}