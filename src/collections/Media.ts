import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        const baseUrl = (process.env.NEXT_PUBLIC_S3_PUBLIC_URL || '').replace(/\/$/, '')

        if (!baseUrl || !doc) return doc

        if (doc.filename) {
          doc.url = `${baseUrl}/${doc.filename}`
        }

        if (doc.sizes && typeof doc.sizes === 'object') {
          Object.keys(doc.sizes).forEach((sizeName) => {
            const size = doc.sizes?.[sizeName]
            if (size && typeof size === 'object' && size.filename) {
              size.url = `${baseUrl}/${size.filename}`
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
  upload: true,
}
