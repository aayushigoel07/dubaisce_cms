//@ts-nocheck
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'hero',
      },
    ],
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
          const baseUrl = (process.env.NEXT_PUBLIC_S3_PUBLIC_URL || '').replace(/\/$/, '')
        
        // Update the main URL
        if (doc.filename) {
          doc.url = `${baseUrl}/${doc.filename}`
        }

        // Update URLs for the different sizes (like 'hero')
        if (doc.sizes) {
          Object.keys(doc.sizes).forEach((size) => {
            if (doc.sizes[size].filename) {
              doc.sizes[size].url = `${baseUrl}/${doc.sizes[size].filename}`
            }
          })
        }

        return doc
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}