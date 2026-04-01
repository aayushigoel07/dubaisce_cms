import type { CollectionConfig } from 'payload'
import { flattenContent } from '../search/flatten';

export const Cards: CollectionConfig = {
  slug: 'cards',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
      beforeChange: [
      ({ data }) => {
        const searchableContent = {
          title: data.title,
          shortDescription: data.shortDescription,
        };
  
        // ✅ flatten full content
        const fullText = flattenContent(searchableContent).toLowerCase();
  
        // ✅ chunk helper (you can define above or import)
        const chunkText = (text: string, size = 10000) => {
          const chunks = [];
  
          for (let i = 0; i < text.length; i += size) {
            const chunk = text.slice(i, i + size).trim();
  
            if (chunk.length > 0) {
              chunks.push({ text: chunk });
            }
          }
  
          return chunks;
        };
  
        // ✅ store chunks instead of one big string
        data.searchIndex = chunkText(fullText);
  
        return data;
      },
    ],
  },

  fields: [
    {
  name: 'searchIndex',
  type: 'array',
  localized: true,
  admin: {
    hidden: true,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      maxLength: 10000, // each chunk safe
    },
  ],
},
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Title for this card. Used to generate the slug.',
      },
    },
    {
      name: 'image',
      label: 'Card Image',
      type: 'upload',
      relationTo: 'media',
      localized: true,
      admin: {
        description: 'Upload image for this card.',
      },
    },
    {
      name: 'shortDescription',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Short description for this detail page',
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
