import { CollectionConfig } from "payload/types";
import { adminOnly } from "../access";

const Coupons: CollectionConfig = {
    slug: 'coupons',
    admin: {
        useAsTitle: 'code'
    },
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    fields: [
        {
            name: 'code',
            type: 'text',
            required: true,
        },
        {
            name: 'discount',
            type: 'number',
            required: true,
        },
        {
            name: 'validFrom',
            type: 'date',
            required: true,
        },
        {
            name: 'validTo',
            type: 'date',
            required: true,
        }
    ]
}


export default Coupons;