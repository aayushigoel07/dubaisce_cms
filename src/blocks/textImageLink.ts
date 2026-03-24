import { Block } from 'payload';

export const TextImageLinkBlock: Block = {
    slug: 'textImageLink',
    labels: {
        singular: 'Text & Image Link Block',
        plural: 'Text & Image Link Blocks',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            localized: true,
        },
        {
            name: 'textContent',
            label: 'Text Content',
            type: 'richText',
            localized:true
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            localized:true
        },
         {
                name: 'linkText',
                label: 'Link Text',
                type: 'text',
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
    ]
}