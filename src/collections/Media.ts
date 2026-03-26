//@ts-nocheck
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const baseUrl = (process.env.NEXT_PUBLIC_S3_PUBLIC_URL || '').replace(/\/$/, '')

        if (!baseUrl) {
          return doc
        }

        const withPrefix = (filename: string) => {
          const filePrefix = doc.prefix ? `${doc.prefix}/` : ''
          return `${baseUrl}/${filePrefix}${filename}`
        }

        // Keep URLs aligned with the object key written by storage-s3.
        if (doc.filename) {
          doc.url = withPrefix(doc.filename)
        }

        if (doc.sizes) {
          Object.keys(doc.sizes).forEach((size) => {
            const sizeDoc = doc.sizes[size]

            if (sizeDoc?.filename) {
              sizeDoc.url = withPrefix(sizeDoc.filename)
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