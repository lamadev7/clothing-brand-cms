import { hideAdminCollection } from "../utils";
import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
    slug: "media",
    admin: {
        hidden: hideAdminCollection
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
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