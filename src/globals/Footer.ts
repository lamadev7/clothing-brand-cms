import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import type { GlobalConfig } from "payload/types";


const Footer: GlobalConfig = {
    slug: 'footer',
    admin: {
        hidden: hideAdminCollection,
    },
    access: {
        update: adminOnly,
    },
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