import { Block } from 'payload';

export const TextImageBlock: Block = {
    slug: 'textImage',
    labels: {
        singular: 'Text & Image Block',
        plural: 'Text & Image Blocks',
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            localized: true,
        },
        {
            name: 'textContent',
            label: 'Text Content',
            type: 'richText',
            localized:true
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            localized:true
        }
    ]
}