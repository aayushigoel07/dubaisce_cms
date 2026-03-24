import { Block } from 'payload';

export const LinkBlock: Block = {  
    slug: 'link',
    labels: {
        singular: 'Link Block', 
        plural: 'Link Blocks',
    },
    fields: [
           {
              name: 'linkType',
              type: 'radio',
              required: true,
              defaultValue: 'internal',
              options: [
                { label: 'Internal Page', value: 'internal' },
                { label: 'External URL', value: 'external' },
                { label: 'File Upload', value: 'file' },
                { label: 'Email (mailto)', value: 'mailto' },
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

            {
              name: 'mailtoLink',
              type: 'email',
              label: 'Email Address',
              admin: {
                condition: (_, siblingData) => siblingData.linkType === 'mailto',
                description: 'Enter the email address to link to.',
              },
        },
    ],
}