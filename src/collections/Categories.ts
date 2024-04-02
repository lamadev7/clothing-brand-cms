import { CollectionConfig } from "payload/types";
import { adminOnly } from "../access/adminOnly";


const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
        create: adminOnly
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