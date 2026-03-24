import type { CollectionConfig } from 'payload'
export const Translations: CollectionConfig = {
  slug: 'translations',
  labels: {
    singular: 'Translation',
    plural: 'Translations',
  },
  admin: {
    group: 'Translations',
    useAsTitle: 'key',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'key',
        label: 'Key',
        type: 'text',
    },
    {
        name: 'en_value',
        label: 'English Value (en)',
        type: 'text',
    },
    {
    name: 'ar_value',
    label: 'Arabic Value (ar)',
    type: 'text',
    }
  ]
}