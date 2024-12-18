import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import { GlobalConfig } from "payload/types";


const Banner: GlobalConfig = {
    slug: "banner",
    admin: {
        hidden: hideAdminCollection,
    },
    access: {
        read: () => true,
        update: adminOnly,
    },
    fields: [
        {
            name: 'title',
            label: 'Banner title',
            type: "text",
            required: true,
        },
        {
            name: 'description',
            label: 'Banner description',
            type: "text",
            required: true,
        },
        {
            name: 'video',
            label: 'Banner video',
            type: "upload",
            relationTo: 'media',
        },
        {
            name: 'carousel',
            type: 'array',
            minRows: 5,
            maxRows: 5,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            label: 'Carousel title',
                            type: "text",
                            maxLength: 150,
                            required: true,
                        },
                        {
                            name: 'quote',
                            label: 'Carousel Quote',
                            type: "text",
                            maxLength: 250,
                            required: true,
                        }
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'badgeQuote',
                            label: 'Discount Offer Quote',
                            type: "text",
                            maxLength: 150,
                            required: true,
                        },
                        {
                            name: 'offerPercentage',
                            label: 'Discount Percentage',
                            type: "number",
                            required: true,
                        }
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'btnText',
                            label: 'Link button title',
                            type: "text",
                            maxLength: 150,
                            required: true,
                        },
                        {
                            name: 'btnLink',
                            label: 'Page route',
                            type: "text",
                            maxLength: 250,
                            required: true,
                        }
                    ]
                },
                {
                    name: 'images',
                    type: 'array',
                    fields: [
                        {
                            name: 'img',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                        }
                    ]
                }
            ]
        },
        {
            name: 'buttons',
            type: "array",
            fields: [
                {
                    type: "row",
                    fields: [
                        {
                            name: 'title',
                            label: 'Button Name',
                            type: "text",
                            required: true,
                        },
                        {
                            name: 'path',
                            label: 'Path',
                            type: "text",
                            required: true,
                        },
                        {
                            name: 'isVisible',
                            label: 'Visibility',
                            type: "checkbox",
                            defaultValue: false,
                            required: true,
                        }
                    ]
                }
            ]
        },
        {
            name: 'visibility',
            label: 'Banner Visibility',
            type: "checkbox",
            defaultValue: true,
        },
    ]
}

export default Banner;