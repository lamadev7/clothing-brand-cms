import { hideAdminCollection } from "../utils";
import { adminOnly } from "../access/adminOnly";
import { CollectionConfig } from "payload/types";


const Categories: CollectionConfig = {
    slug: 'categories',
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
            label: 'Category Type',
            type: 'text',
            required: true,
            unique: true,
        }
    ]
}

export default Categories;