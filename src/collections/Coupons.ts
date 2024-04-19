import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import { DISCOUNT_TYPES } from "../constants";
import { CollectionConfig } from "payload/types";

const Coupons: CollectionConfig = {
    slug: 'coupons',
    admin: {
        useAsTitle: 'code',
        hidden: hideAdminCollection,
    },
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    hooks: {
        afterChange: [
            ({ req }) => {
                const { user } = req ?? {};

            }
        ]
    },
    fields: [
        {
            name: 'code',
            type: 'text',
            required: true,
        },
        {
            name: 'discountType',
            type: 'select',
            options: DISCOUNT_TYPES,
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
        },
        {
            name: 'isAlreadyClaimed',
            type: 'checkbox',
            defaultValue: false,
        },
    ]
}


export default Coupons;