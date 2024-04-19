import { CollectionConfig } from "payload/types";
import { productReviewAccess } from "../access/productReview";

const ProductReviews: CollectionConfig = {
    slug: 'productReviews',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: productReviewAccess,
        create: productReviewAccess,
        update: productReviewAccess,
        delete: productReviewAccess,
    },
    fields: [
        {
            name: 'userId',
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