import { round, sumBy } from "lodash";
import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import { CollectionConfig } from "payload/types";
import { COLOR_OPTIONS, GENDER_OPTIONS, SIZE_OPTIONS } from "../constants";


const Product: CollectionConfig = {
    slug: "product",
    admin: {
        useAsTitle: 'name',
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
            name: 'name',
            label: 'Product Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Product Description',
            type: 'text',
        },
        {
            name: 'features',
            label: 'Product Features List',
            type: 'array',
            fields: [
                {
                    name: 'item',
                    label: 'Feature Item',
                    type: 'text',
                }
            ]
        },
        {
            name: 'price',
            label: 'Product Price',
            type: 'number',
            required: true,
            hooks: {
                afterChange: [
                    (args) => {
                        const {
                            previousDoc: { discount: prevDiscount },
                            siblingData: { price, discount }
                        } = args ?? {};
                        if (discount && prevDiscount !== discount) return price - ((discount / 100) * price);
                    }
                ]
            }
        },
        {
            name: 'size',
            label: 'Sizes',
            type: 'select',
            options: SIZE_OPTIONS,
            hasMany: true,
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'select',
            options: GENDER_OPTIONS,
            required: true,
        },
        {
            name: 'color',
            label: 'Colors',
            type: 'relationship',
            relationTo: ['colors'],
            required: true,
            hasMany: true,
        },
        {
            name: 'quantity',
            label: 'Quantity',
            type: 'number',
            min: 0,
            defaultValue: 1
        },
        {
            name: 'category',
            label: 'Product Category',
            type: 'relationship',
            relationTo: ['categories'],
            hasMany: true,
        },
        {
            name: 'prevPrice',
            label: 'Previous Price',
            type: 'number',
            defaultValue: 0,
            hooks: {
                afterChange: [
                    (args) => {
                        const {
                            previousDoc: { price: prevPrice },
                            siblingData: { discount }
                        } = args ?? {};
                        if (discount) return prevPrice;
                    }
                ]
            }
        },
        {
            name: 'discount',
            label: 'Discount (%)',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'images',
            type: 'array',
            fields: [
                {
                    name: 'productImage',
                    label: 'Product Images',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
        {
            name: 'orderBy',
            label: 'Order By User IDs',
            type: 'array',
            fields: [
                {
                    name: 'customerId',
                    type: 'text',
                    unique: true,
                }
            ]
        },
        {
            name: 'reviews',
            label: 'Reviews',
            type: 'array',
            fields: [
                {
                    name: 'customerId',
                    type: 'relationship',
                    relationTo: ['users'],
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'richText',
                }
            ]
        },
        {
            name: 'ratings',
            type: 'array',
            fields: [
                {
                    name: 'customerId',
                    label: 'Customer Id',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'starCount',
                    label: 'Total Star Count',
                    type: 'number',
                }
            ]
        },
        {
            name: 'totalRating',
            label: 'Total Calculated Rating',
            type: 'number',
            hooks: {
                afterChange: [
                    (args) => {
                        const { data } = args ?? {};

                        let totalRating = 0;
                        const overallRatings = data.ratings ?? [];

                        if (overallRatings.length > 0) {
                            const totalStarsCount = overallRatings?.length;
                            const totalStarSum = sumBy(overallRatings, 'starCount');
                            const avgRating = totalStarSum / totalStarsCount;
                            totalRating = round(avgRating * 2) / 2;
                        }

                        return totalRating ?? 0;
                    }
                ]
            }
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'isHotSale',
                    type: 'checkbox',
                    defaultValue: false,
                    label: 'Is HOt Sale ?',
                },
                {
                    type: 'date',
                    name: 'validUpto',
                    label: 'Valid Up To',
                }
            ]
        }
    ],
    endpoints: [
        {
            path: '/',
            method: 'post',
            handler: async (req, res) => {
                try {
                    const { payload, body } = req;
                    const { id, name, sort, price, color, size, category, gender, isHotSale, page, limit } = body ?? {};

                    let whereQuery: any = {};


                    if (id) whereQuery["id"] = { contains: id };
                    if (size) whereQuery["size"] = { contains: size };
                    if (name) whereQuery["name"] = { contains: name };
                    if (body?.hasOwnProperty("isHotSale")) whereQuery["isHotSale"] = { equals: true };
                    if (gender) whereQuery = {
                        ...whereQuery,
                        or: [
                            { gender: { equals: gender } },
                            { gender: { equals: 'unisex' } }
                        ]
                    };
                    if (color) whereQuery["color.value"] = { contains: color };
                    if (category) whereQuery["category.value"] = { contains: category };
                    if (price?.length > 0) whereQuery = {
                        ...whereQuery,
                        and: [
                            { price: { greater_than_equal: price[0] } },
                            { price: { less_than_equal: price[1] } },
                        ]
                    };

                    const result = await payload.find({
                        collection: 'product',
                        where: whereQuery,
                        sort: sort ?? "createdAt",
                        page: page ?? 1,
                        limit: limit ?? 10,
                    });
                    res.send(result);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: error.message });
                }
            }
        },
        {
            path: '/rating',
            method: 'put',
            handler: async (req, res) => {
                try {
                    let totalRating = 0;
                    const { payload, body, user } = req;
                    const { product, totalStarCount } = body ?? {};

                    if (product) {
                        const overallRatings = product?.ratings ?? [];
                        const respectiveCustomerRatingIndex = product?.ratings?.findIndex((d: any) => d.customerId === user.id);

                        if (respectiveCustomerRatingIndex >= 0) {
                            overallRatings[respectiveCustomerRatingIndex] = {
                                customerId: user?.id,
                                starCount: totalStarCount
                            }
                        }
                        else overallRatings.push({ customerId: user?.id, starCount: totalStarCount });

                        if (overallRatings.length > 0) {
                            const totalStarsCount = overallRatings?.length;
                            const totalStarSum = sumBy(overallRatings, 'starCount');
                            const avgRating = totalStarSum / totalStarsCount;
                            totalRating = round(avgRating * 2) / 2;
                        }

                        const response = await payload.update({
                            collection: 'product',
                            id: product?.id,
                            data: { ratings: overallRatings, totalRating }
                        });

                        return res.send({ message: 'Re ordered successfully!', data: response });
                    }

                    res.status(404).send({ message: 'Order ID missing!', data: null })

                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: error.message });
                }
            }
        },
        {
            path: '/trending',
            method: 'get',
            handler: async (req, res) => {
                try {
                    const { payload, query } = req;
                    const { limit }: any = query ?? {};

                    const data = await payload.find({
                        collection: 'product',
                        sort: '-orderBy',
                        where: {
                            and: [
                                {
                                    orderBy: { exists: true }
                                },
                                {
                                    orderBy: { not_equals: [] }
                                }
                            ],
                        },
                        limit: limit ?? 10,
                    });

                    res.send(data);
                } catch (error) {
                    res.send({});
                    console.error(error);
                }
            }
        },
        {
            path: '/similars/:id',
            method: 'get',
            handler: async (req, res) => {
                try {
                    const { payload, params } = req;
                    const { id } = params ?? {};

                    const data = await payload.findByID({
                        collection: 'product',
                        id: id
                    });

                    const { category } = data ?? {};

                    if (category?.length && category?.[0]?.value) {
                        const selectedProductcategory: any = category?.[0].value;
                        const similarProducts = await payload.find({
                            collection: 'product',
                            sort: '-createdAt',
                            limit: 8,
                            where: {
                                id: {
                                    not_equals: id
                                },
                                "category.value": {
                                    in: selectedProductcategory?.id
                                },
                                quantity: {
                                    greater_than: 0
                                }
                            }
                        });
                        return res.send(similarProducts);
                    }

                    res.send([]);
                } catch (error) {
                    res.status(500).send(error);
                    console.error(error);
                }
            }
        }
    ]
}

export default Product;