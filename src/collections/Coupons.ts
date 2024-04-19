import { adminOnly } from "../access";
import { hideAdminCollection } from "../utils";
import { DISCOUNT_TYPES } from "../constants";
import { CollectionConfig } from "payload/types";
import moment from "moment";

const Coupons: CollectionConfig = {
    slug: 'coupons',
    admin: {
        useAsTitle: 'code',
        hidden: hideAdminCollection,
    },
    access: {
        read: () => true,
        create: adminOnly,
        update: adminOnly,
        delete: adminOnly,
    },
    fields: [
        {
            name: 'code',
            type: 'text',
            required: true,
        },
        {
            name: 'discountType',
            type: 'select',
            options: DISCOUNT_TYPES,
            required: true,
        },
        {
            name: 'discount',
            type: 'number',
            required: true,
        },
        {
            name: 'validFrom',
            type: 'date',
            required: true,
        },
        {
            name: 'validTo',
            type: 'date',
            required: true,
        },
        {
            hasMany: true,
            name: 'claimedUsers',
            type: 'relationship',
            relationTo: 'users',
        },
    ],
    endpoints: [
        {
            path: '/apply',
            method: 'put',
            handler: async (req, res) => {
                try {
                    const { payload, body }: any = req;
                    const { code, userId } = body ?? {};

                    const result = await payload.find({
                        collection: 'coupons',
                        where: {
                            and: [
                                {
                                    code: { equals: code }
                                },
                                {
                                    claimedUsers: { not_in: userId }
                                }
                            ]
                        }
                    });

                    const { docs } = result ?? {};

                    if (docs?.length > 0) {
                        const couponDetails = docs?.[0];
                        const { validFrom, validTo } = couponDetails ?? {};

                        if (moment(validFrom).isBefore(moment()) && moment(validTo).isAfter(moment())) {
                            await payload.update({
                                collection: 'coupons',
                                id: couponDetails.id,
                                data: {
                                    claimedUsers: [
                                        ...couponDetails?.claimedUsers ?? [],
                                        userId
                                    ]
                                }
                            });

                            return res.send(result);
                        } else {
                            return res.status(400).send({
                                docs: [],
                                message: 'Coupon code has expired!'
                            });
                        }
                    }

                    res.send({ docs: [], message: 'Coupon code not found!' });
                } catch (error) {
                    console.error(error);
                    return res.status(400).send({ docs: [], message: error.message });
                }
            }
        }
    ]
}


export default Coupons;