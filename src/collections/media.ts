import { customerAndAdmin } from "../access";
import { hideAdminCollection } from "../utils";
import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
    slug: "media",
    admin: {
        hidden: hideAdminCollection
    },
    access: {
        read: () => true,
        create: customerAndAdmin,
        update: customerAndAdmin,
        delete: customerAndAdmin,
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