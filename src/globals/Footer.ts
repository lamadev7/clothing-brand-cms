import type { GlobalConfig } from "payload/types";


const Footer: GlobalConfig = {
    slug: 'footer',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'footerName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'footerDescription',
                    label: 'Footer Description',
                    type: 'text',
                    required: true,
                },
            ]
        },
        {
            name: 'links',
            type: 'array',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'linkName',
                            label: 'Link Name',
                            type: 'text',
                        },
                        {
                            name: 'linkPath',
                            label: 'Link Name',
                            type: 'text',
                        }
                    ]
                }
            ]
        },
    ]
};

export default Footer;