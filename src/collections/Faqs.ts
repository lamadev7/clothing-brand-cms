import { CollectionConfig } from "payload/types";
import { adminOnly } from "../access";


const Faqs: CollectionConfig = {
    slug: 'faqs',
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    fields: [
        {
            label: 'Question Title',
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            label: 'Question Description',
            name: 'content',
            type: 'text',
            required: true,
        }
    ]
};

export default Faqs;