import { Block } from 'payload';

export const ContactMethodsBlock: Block ={
    slug: 'contact-quote',
    labels: {
        singular: 'Contact Methods and Quote',
        plural: 'Contact Methods and Quotes',
    },
    fields: [
        {
            name: 'contactMethods',
            label: 'Contact Methods',
            localized: true,
            type: 'group',
            fields: [
                {
                    name: 'method',
                    label: 'Method',
                    type: 'array',
                    localized: true,
                    fields: [
                        {
                            name: 'icon',
                            label: 'Icon',
                            type: 'upload',
                            relationTo: 'media',
                            localized:true
                        },
                        {
                            name: 'type',
                            label: 'Type',
                            type: 'text',
                            localized: true,
                        },
                        {
                            name: 'content',
                            label: 'Content',
                            type: 'richText',
                            localized: true,
                        }
                    ]
                },
            ],
        },
        {
            name: 'quote',
            label: 'Quote',
            type: 'richText',
            localized: true,
        }
    ]
}