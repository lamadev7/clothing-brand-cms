import { CollectionConfig } from "payload/types";
import { adminOnly, customerOnlyOrAynone } from "../access";


const Subscribers: CollectionConfig = {
    slug: 'contacts',
    admin: {
        useAsTitle: 'firstName',
    },
    access: {
        read: adminOnly,
        create: customerOnlyOrAynone,
        update: adminOnly,
        delete: adminOnly,
    },
    fields: [
        {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
        },
        {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'message',
            label: 'Message Description',
            type: 'text',
        }
    ]
}

export default Subscribers;