//@ts-nocheck
import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { CollectionConfig } from 'payload'

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

const findR2ObjectKey = async (filename: string) => {
  const bucket = process.env.R2_BUCKET

  if (!bucket) {
    return null
  }

  const candidateKeys = [filename, `media/${filename}`]

  for (const key of candidateKeys) {
    try {
      await r2Client.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      )
      return key
    } catch {
      // Continue checking alternate key shapes.
    }
  }

  return null
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (!doc?.filename) {
          return doc
        }

        const key = await findR2ObjectKey(doc.filename)

        if (key) {
          req.payload.logger.info(
            `[media:r2] verified upload for doc=${doc.id} filename=${doc.filename} key=${key}`,
          )
        } else {
          req.payload.logger.error(
            `[media:r2] upload missing in bucket for doc=${doc.id} filename=${doc.filename} checkedKeys=${doc.filename},media/${doc.filename}`,
          )
        }

        return doc
      },
    ],
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