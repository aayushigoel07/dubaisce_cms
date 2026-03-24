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
        // The base URL of your R2 public bucket/worker
        const baseUrl = 'https://dubaisce.etihadesco.workers.dev/media'
        
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
      localized: true,
    },
  ],
}