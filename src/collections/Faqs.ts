import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import { CollectionConfig } from "payload/types";


const Faqs: CollectionConfig = {
    slug: 'faqs',
    admin: {
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