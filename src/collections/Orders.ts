import config from "../config";
import { uniqBy } from "lodash";
import { hideAdminCollection } from "../utils";
import { CollectionConfig } from "payload/types";
import { Product } from "payload/generated-types";

import { customerAndSelf, customerAndAdmin, adminOnly } from "../access";
import { ENUM, PAYMENT_MODE_OPTIONS, PAYMENT_STATUS, PAYMENT_STATUS_OPTIONS } from "../constants";

const Orders: CollectionConfig = {
    slug: "orders",
    admin: {
        hidden: hideAdminCollection
    },
    access: {
        read: customerAndAdmin,
        delete: customerAndAdmin,
        create: customerAndSelf,
        update: adminOnly,
    },
    hooks: {
        afterChange: [
            async (args) => {
                try {
                    const { req } = args;
                    const { body, payload } = req;

                    if (body?.orderItems?.length) {
                        const promises = body?.orderItems?.map(async (order: any) => {
                            const product: Product = await payload.findByID({
                                collection: 'product',
                                id: order.product
                            });

                            const orderBy = product?.orderBy ?? [];

                            if (body.userId) orderBy.push({ customerId: body.userId });

                            const updatedProduct = { quantity: product?.quantity - order?.quantity, orderBy: uniqBy(orderBy, 'customerId') };

                            const updateRes = await payload.update({
                                collection: 'product',
                                id: order.product,
                                data: updatedProduct
                            });

                            return updateRes;
                        });

                        await Promise.all(promises);
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        ]
    },
    fields: [
        {
            name: 'userId',
            label: 'User ID',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'orderItems',
            label: 'Order Items',
            type: 'array',
            fields: [
                {
                    name: 'product',
                    label: 'Product ID',
                    type: 'relationship',
                    relationTo: 'product',
                    required: true,
                },
                {
                    name: 'quantity',
                    type: 'number',
                    label: 'Quantity Amount',
                    required: true,
                },
                {
                    name: 'color',
                    label: 'Ordered Color',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'size',
                    label: 'Ordered Size',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'orderStatus',
            label: 'Order Status',
            type: 'select',
            options: PAYMENT_STATUS_OPTIONS
        },
        {
            name: 'paymentMode',
            label: 'Payment Mode',
            type: 'select',
            options: PAYMENT_MODE_OPTIONS
        },
        {
            name: 'paymentStatus',
            label: 'Payment Status',
            type: 'select',
            options: PAYMENT_STATUS_OPTIONS
        },
        {
            name: 'subTotal',
            type: 'number',
        },
        {
            name: 'shippingFee',
            type: 'number',
            required: true,
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'deliveryLocation',
                    type: 'text'
                },
                {
                    name: 'lat',
                    type: 'number',
                },
                {
                    name: 'lng',
                    type: 'number',
                }
            ],
        },
        {
            name: 'discount',
            type: 'number',
        },
        {
            name: 'total',
            type: 'number',
        },
        {
            name: 'transaction_id',
            type: 'text',
        },
        {
            name: 'proof_of_payment',
            type: 'upload',
            relationTo: 'media',
        }
    ],
    endpoints: [
        {
            path: '/payment-success',
            method: 'get',
            handler: async (req, res, next) => {
                try {
                    const { payload, query } = req;
                    const { data }: any = query ?? {};

                    if (!data) return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);

                    const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

                    // const message = decodedData.signed_field_names.split(",").map((field) => `${field}=${decodedData[field] || ""}`).join(",");
                    // const signature = createSignature(message);
                    // if (signature !== decodedData.signature) return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);

                    const { status, transaction_uuid } = decodedData ?? {};
                    const orderId = transaction_uuid.split("-")?.[0] ?? {};

                    if (transaction_uuid) {
                        const paymentStatusOption = PAYMENT_STATUS_OPTIONS.find((d) => d.value === status);

                        await payload.update({
                            collection: 'orders',
                            id: orderId,
                            data: { paymentStatus: paymentStatusOption?.value ?? status, paymentMode: 'eSewa Mobile Wallet' }
                        })

                        return res.redirect(config.CLIENT_PAYMENT_SUCCESS_PAGE);
                    }

                    res.status(500).send({ message: '500 SERVER ERROR!' });
                } catch (error) {
                    console.error(error);
                    return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);
                }
            }
        },
        {
            path: '/payment-failed',
            method: 'get',
            handler: async (req, res, next) => {
                try {
                    const { payload, query } = req;
                    const { data }: any = query ?? {};

                    if (!data) return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);

                    const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

                    // const message = decodedData.signed_field_names.split(",").map((field) => `${field}=${decodedData[field] || ""}`).join(",");
                    // const signature = createSignature(message);
                    // if (signature !== decodedData.signature) res.json({ message: "integrity error" });

                    const { status, transaction_uuid } = decodedData ?? {};
                    const orderId = transaction_uuid.split("-")?.[0] ?? {};

                    if (transaction_uuid) {
                        const paymentStatusOption = PAYMENT_STATUS_OPTIONS.find((d) => d.value === status);

                        await payload.update({
                            collection: 'orders',
                            id: orderId,
                            data: { paymentStatus: paymentStatusOption?.value ?? status }
                        })

                        return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);
                    }

                    return res.redirect(config.CLIENT_PAYMENT_FAILED_PAGE);
                } catch (error) {
                    res.send({});
                    console.error(error);
                }
            }
        },
        {
            path: '/shipping/status',
            method: 'put',
            handler: async (req, res) => {
                try {
                    const { payload, body } = req;
                    const { orderId, status, mode } = body ?? {};
                    const params: any = { status, paymentMode: mode };

                    if (orderId && status) {
                        const response = await payload.update({
                            collection: 'orders',
                            id: orderId,
                            data: params
                        });
                        return res.send({ message: 'Shipping status updated successfully!', data: response });
                    }

                    res.status(404).send({ message: 'Order ID and Status are missing!', data: null })

                } catch (error) {
                    res.status(500).send({ message: error.message });
                }
            }
        },
        {
            path: '/cancel',
            method: 'put',
            handler: async (req, res) => {
                try {
                    const { payload, body } = req;
                    const { orderId } = body ?? {};
                    const params: any = { orderStatus: PAYMENT_STATUS.CANCELED };

                    if (orderId) {
                        const response = await payload.update({
                            collection: 'orders',
                            id: orderId,
                            data: params
                        });
                        return res.send({ message: 'Order cancelled successfully!', data: response });
                    }

                    res.status(404).send({ message: 'Order ID missing!', data: null })

                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: error.message });
                }
            }
        },
        {
            path: '/remake',
            method: 'put',
            handler: async (req, res) => {
                try {
                    const { payload, body } = req;
                    const { orderId } = body ?? {};
                    const params: any = { orderStatus: PAYMENT_STATUS.PENDING };

                    if (orderId) {
                        const response = await payload.update({
                            collection: 'orders',
                            id: orderId,
                            data: params
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
            path: '/update',
            method: 'put',
            handler: async (req, res) => {
                try {
                    const { payload, body } = req;
                    const { id } = body ?? {};

                    if (id) {
                        const response = await payload.update({
                            collection: 'orders',
                            id: id,
                            data: body
                        });
                        return res.send({ message: 'Payment completed successfully!', data: response });
                    }
                    return res.status(400).send({ message: 'Order ID is required!', data: null });
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: error.message });
                }
            }
        }
    ]
}


export default Orders;