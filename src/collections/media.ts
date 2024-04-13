import { CollectionConfig } from "payload/types";
import { adminOnly } from "../access";

const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    upload: {
        staticURL: '/media',
        staticDir: './media',
        adminThumbnail: 'card',
    },
    fields: [
        {
            name: 'alt',
            label: 'Alt Text',
            type: 'text',
            required: true,
        },
    ],
}

export default Media;