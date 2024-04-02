import { CollectionConfig } from "payload/types";

const ProductReviews: CollectionConfig = {
    slug: 'productReviews',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'customerId',
            label: 'Category Id',
            type: 'relationship',
            relationTo: ['users'],
            required: true,
        },
        {
            name: 'productId',
            label: 'Product Id',
            type: 'relationship',
            relationTo: ['product'],
            required: true,
        },
        {
            name: 'message',
            label: 'Review description',
            type: 'text',
        },
        {
            name: 'attachments',
            type: 'array',
            fields: [
                {
                    name: 'attachmentId',
                    label: 'Evidence attachments File Id',
                    type: 'text',
                },
                {
                    name: 'url',
                    label: 'Evidence attachments File url',
                    type: 'text',
                },
            ]
        }
    ]
}

export default ProductReviews;