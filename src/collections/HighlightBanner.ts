import { Block, GlobalConfig } from "payload/types";
import { hideAdminCollection } from "../utils";


const LeftBlock: Block = {
    slug: 'leftBlock',
    fields: [
        {
            type: 'text',
            name: 'type',
            label: 'Type',
        },
        {
            type: 'text',
            name: 'title',
            label: 'Title',
        },
        {
            type: 'text',
            name: 'quotes',
            label: 'Quotes',
        },
        {
            name: 'image',
            label: 'Banner Image',
            type: 'upload',
            relationTo: 'media'
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'btnLabel',
                    label: 'Button Label',
                },
                {
                    type: 'text',
                    name: 'link',
                    label: 'Button Link',
                },
            ]
        },
    ]
}
const RightTopBlock: Block = {
    slug: 'rightTopBlock',
    fields: [
        {
            type: 'text',
            name: 'type',
            label: 'Type',
        },
        {
            type: 'text',
            name: 'title',
            label: 'Title',
        },
        {
            type: 'text',
            name: 'quotes',
            label: 'Quotes',
        },
        {
            name: 'image',
            label: 'Banner Image',
            type: 'upload',
            relationTo: 'media'
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'btnLabel',
                    label: 'Button Label',
                },
                {
                    type: 'text',
                    name: 'link',
                    label: 'Button Link',
                },
            ]
        },
    ]
}
const RightBottomBlock: Block = {
    slug: 'rightBottomBlock',
    fields: [
        {
            type: 'text',
            name: 'type',
            label: 'Type',
        },
        {
            type: 'text',
            name: 'title',
            label: 'Title',
        },
        {
            type: 'text',
            name: 'quotes',
            label: 'Quotes',
        },
        {
            name: 'image',
            label: 'Banner Image',
            type: 'upload',
            relationTo: 'media'
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'btnLabel',
                    label: 'Button Label',
                },
                {
                    type: 'text',
                    name: 'link',
                    label: 'Button Link',
                },
            ]
        },
    ]
}


export const HighlighBanner: GlobalConfig = {
    slug: 'hightlightBanner',
    admin: {
        hidden: hideAdminCollection,
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'Layout',
            type: 'blocks',
            blocks: [
                LeftBlock,
                RightTopBlock,
                RightBottomBlock,
            ]
        }
    ]
}
