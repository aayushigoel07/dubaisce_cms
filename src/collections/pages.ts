//@ts-nocheck

import type { CollectionConfig } from 'payload'
import { HeroSwiperBlock } from '@/blocks/heroSwiper'
import { HighlightsBlock } from '@/blocks/Highlights'
import { RichTextBlock } from '@/blocks/richText'
import { HeroImageBlock } from '@/blocks/heroImage'
import { CardGallery } from '@/blocks/cardBlock'
import { LocationMapBlock } from '@/blocks/locationMap'
import { HomeIntroBlock } from '@/blocks/HomeIntroSection'
import { SingularImageBlock } from '@/blocks/SingularImage'
import { TextImageBlock } from '@/blocks/textImage' 
import { LinkBlock } from '@/blocks/link'
import { PressSwiperBlock } from '@/blocks/pressSwiper'
import { VideoBlock } from '@/blocks/video'
import { DsmImageBlock } from '@/blocks/dsmImage'
import { DsmTextImageBlock } from '@/blocks/dsmtextImage'
import { DsmResourcesBlock } from '@/blocks/dsmResources'
import { TextImageLinkBlock } from '@/blocks/textImageLink'
import { TaqatiBlock } from '@/blocks/taqatiBlock'
import { PlainTextBlock } from '@/blocks/plainText'
import { flattenContent } from '../search/flatten';

export const Pages: CollectionConfig = {
  slug: 'all-pages',
  labels: {
    singular: 'Page',
    plural: 'All Pages',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
    ({ data }) => {
      const searchableContent = {
        title: data.title,
        layout: data.layout,
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
    beforeValidate: [
      async ({ data, operation, req, originalDoc }) => {
        if (operation === 'create' || operation === 'update') {
          const isEnglishLocale = req.locale === 'en' || !req.locale

          if (isEnglishLocale && data?.title && typeof data.title === 'string') {
            // Special case: Home page gets "/" slug
            if (data.title.toLowerCase() === 'home') {
              data.slug = '/'
              data.fullPath = '/'
              return data
            }

            // Create slug: lowercase, remove special chars, replace spaces with hyphens
            const generatedSlug = data.title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')

            if (generatedSlug) {
              data.slug = generatedSlug
            } else if (originalDoc?.slug) {
              data.slug = originalDoc.slug
            }
          } else if (!isEnglishLocale) {
            // Non-English locale: preserve existing slug
            if (originalDoc?.slug) {
              data.slug = originalDoc.slug
            }
          }

          // Build full path with parent slugs
          if (data?.parent) {
            try {
              const parentPage = await req.payload.findByID({
                collection: 'all-pages',
                id: typeof data.parent === 'object' ? data.parent.id : data.parent,
                depth: 0,
              })

              const parentPath = parentPage.fullPath || parentPage.slug
              data.fullPath = `${parentPath}/${data.slug}`
            } catch (error) {
              data.fullPath = data.slug
            }
          } else {
            if (data) {
  data.fullPath = data.slug
}
          }
        }

        return data
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
      localized: true,
      required: true,
    },
    {
      name: 'meta',
      type: 'group',
      label: 'SEO & Social Media',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true, // Helpful if you want different titles for /en and /ar
          admin: { description: 'The title seen in search engines. Ideally < 60 chars.' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: { description: 'The summary seen in search results. Ideally < 160 chars.' },
        },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'all-pages',
      label: 'Parent Page',
      admin: {
        description: 'Select a parent page to nest this page under (e.g., About > What We Do)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Auto-generated from title. Full path will include parent slugs.',
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
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        HeroSwiperBlock,
        HighlightsBlock,
        RichTextBlock,
        HeroImageBlock,
        CardGallery,
        LocationMapBlock,
        HomeIntroBlock,
        SingularImageBlock,
        TextImageBlock,
        LinkBlock,
        PressSwiperBlock,
        VideoBlock,
        DsmImageBlock,
        DsmTextImageBlock,
        DsmResourcesBlock,
        TextImageLinkBlock,
        TaqatiBlock,
        PlainTextBlock,
      ],
    },
  ],
}