import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'News',
    plural: 'News',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'parentpage', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req, originalDoc }) => {
        if (!data) return data

        if (operation === 'create' || operation === 'update') {
          const isEnglishLocale = req.locale === 'en' || !req.locale

          if (isEnglishLocale && data?.title && typeof data.title === 'string') {
            // Generate slug from English title only
            const generatedSlug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')

            if (generatedSlug) {
              data.slug = generatedSlug
            } else if (originalDoc?.slug) {
              // Title produced no valid slug characters – keep existing
              data.slug = originalDoc.slug
            }
          } else if (!isEnglishLocale) {
            // Arabic (or any non-English) locale: always restore the existing slug
            // so the admin autosave doesn't overwrite it with an empty string.
            if (originalDoc?.slug) {
              data.slug = originalDoc.slug
            }
          }

          // Rebuild fullPath using the resolved slug
          const finalSlug = data.slug || originalDoc?.slug
          if (finalSlug) {
            data.slug = finalSlug
            const parentPageId = data?.parentPage ?? originalDoc?.parentPage
            if (parentPageId) {
              try {
                const parentPage = await req.payload.findByID({
                  collection: 'all-pages',
                  id: typeof parentPageId === 'object' ? parentPageId.id : parentPageId,
                  depth: 0,
                })
                const parentPath = parentPage.fullPath || parentPage.slug
                data.fullPath = `${parentPath}/${finalSlug}`
              } catch {
                data.fullPath = finalSlug
              }
            } else {
              data.fullPath = finalSlug
            }
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      
      localized: true,
    },
    {
        name: 'date',
        type: 'text',
        localized: true,

    },
    {
      name: 'parentPage',
      type: 'relationship',
      relationTo: 'all-pages',
      label: 'Parent Page',
      admin: {
        description: 'Select the main page this detail page belongs to',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Auto-generated from the title. Full path will include the parent page slug.',
        readOnly: true,
      },
    },
    {
      name: 'fullPath',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'image',
      label: 'Image',
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
  ],
}
