import { Block} from 'payload'

export const BottomFooterBlock: Block = {
    slug: 'bottomfooter',
    labels: {   
        singular: 'Bottom Footer',
        plural: 'Bottom Footers',
    },
    fields: [
        {
            name: 'bottomfooter',
            label: 'Bottom footer',
            type: 'group',
            localized: true,
            fields: [
                {
                    name: 'text',
                    label: 'Text',
                    type: 'array',
                    localized: true,
                    fields: [
                        {
                            name: 'text',
                            label:'text',
                            type: 'text',
                            localized: true,
                        },
                        {
                        name: 'linkType',
                        dbName: 'lt',
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
                        relationTo: 'all-pages',
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'internal',
                        },
                        validate: (value: unknown, { siblingData }: { siblingData?: { linkType?: string } }) => {
                            if (siblingData?.linkType === 'internal' && !value) {
                                return 'Please select an internal page.'
                            }

                            return true
                        },
                        },

                        {
                        name: 'externalLink',
                        type: 'text',
                        admin: {
                            condition: (_, siblingData) => siblingData.linkType === 'external',
                        },
                        validate: (value: unknown, { siblingData }: { siblingData?: { linkType?: string } }) => {
                            if (siblingData?.linkType === 'external' && !value) {
                                return 'Please enter an external URL.'
                            }

                            return true
                        },
                        },
                        
                    ]
                },
            ]

        },
        {
            name: 'copyright',
            label: 'Copyright',
            type: 'richText',
            localized:true
        },
        {
            name: 'socialMedia',
            label: 'Social Media Links',
            type: 'array',
            localized: true,
            fields: [
                {
                    name: 'platform',
                    label: 'Platform',
                    type: 'text',
                },
                {
                    name: 'image',
                    label: 'Image',
                    type: 'upload',
                    relationTo: 'media',
                    localized: true,
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text',
                    localized:true,
                    admin: {
                        description: 'Enter the full URL, e.g. https://example.com',
                    }
                }
            ]

        }
    ]
}