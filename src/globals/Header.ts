import type { GlobalConfig } from "payload/types";
import { adminOnly } from "../access";

const Header: GlobalConfig = {
    slug: 'header',
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'logoImg',
            label: 'Logo Image',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'navItems',
            type: 'array',
            maxRows: 7,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'name',
                            label: 'Item Name',
                            type: 'text',
                        },
                        {
                            name: 'path',
                            label: 'Route Path',
                            type: 'text',
                        }
                    ]
                }
            ]
        }
    ]
}

export default Header;