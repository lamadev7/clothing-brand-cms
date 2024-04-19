import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import type { GlobalConfig } from "payload/types";

const Header: GlobalConfig = {
    slug: 'header',
    admin: {
        hidden: hideAdminCollection,
    },
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