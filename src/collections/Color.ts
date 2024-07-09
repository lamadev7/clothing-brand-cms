import { hideAdminCollection } from "../utils";
import { adminOnly } from "../access/adminOnly";
import { CollectionConfig } from "payload/types";


const Colors: CollectionConfig = {
    slug: 'colors',
    admin: {
        useAsTitle: 'name',
        hidden: hideAdminCollection
    },
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    fields: [
        {
            name: 'name',
            label: 'Color Name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'code',
            label: 'Color Code',
            type: 'text',
            required: true,
            unique: true,
        }
    ]
}

export default Colors;