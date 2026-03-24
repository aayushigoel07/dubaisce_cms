import { Block} from 'payload'

export const FooterBlock: Block = {
    slug: 'footer',
    labels: {   
        singular: 'Footer',
        plural: 'Footers',
    },
    fields: [
        {
            name: 'subfooter',
            label: 'Subfooter',
            type: 'group',
            localized: true,
            fields: [
                {
                    name: 'Images',
                    label: 'Images',
                    type: 'array',
                    localized: true,
                    fields: [
                        {
                            name: 'image',
                            label:'Image',
                            type: 'upload',
                            relationTo: 'media',
                            localized: true,
                        },
                        {
                        name: 'linkType',
                        type: 'radio',
                        required: true,
                        defaultValue: 'internal',
                        options: [
                            { label: 'Internal Page', value: 'internal' },
                            { label: 'External URL', value: 'external' },
                        ],
                        },

                        {
                        name: 'internalLink',
                        type: 'relationship',
                        relationTo: ['all-pages'],
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'internal',
                        },
                        },

                        {
                        name: 'externalLink',
                        type: 'text',
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'external',
                        },
                        },
                        
                    ]
                },
            ]

        }
    ]
}