import type { Block } from 'payload'

export const LocationMapBlock: Block = {
  slug: 'locationMap',
  labels: {
    singular: 'Location Map Block',
    plural: 'Location Map Blocks',
  },

  fields: [
    {
      name: 'pageTitle',
      label: 'Page Title',
      type: 'text',
      localized: true,
    },
    {
      name: 'mapEmbedUrl',
      label: 'Map Embed URL',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
