
export const ROLES = Object.freeze({
    ADMIN: 'admin',
    CUSTOMER: 'customer',
});

export const PAYMENT_STATUS = Object.freeze({
    PENDING: 'PENDING',
    COMPLETE: 'COMPLETE',
    CANCELED: 'CANCELED',
    FULL_REFUND: 'FULL_REFUND',
});

export const ENUM = Object.freeze({
    AMOUNT: 'amount',
    COD: 'Cash In Delivery',
    PERCENTAGE: 'percentage',
    ESEWA: 'eSewa Mobile Wallet',
});

export const SIZE_OPTIONS = [
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
    { label: '2XL', value: '2xl' },
    { label: '3XL', value: '3xl' },
];
export const COLOR_OPTIONS = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'White', value: 'white' },
    { label: 'Black', value: 'black' },
    { label: 'Pink', value: 'pink' },
    { label: 'Camel', value: 'camel' },
    { label: 'Grey', value: 'grey' },
    { label: 'Sage', value: 'sage' },
    { label: 'Purple', value: 'purple' },
    { label: 'Green', value: 'green' },
    { label: 'Brown', value: 'brown' },
];

export const PAYMENT_MODE_OPTIONS = [
    { label: 'Cash In Delivery', value: 'Cash In Delivery' },
    { label: 'eSewa Mobile Wallet', value: 'eSewa Mobile Wallet' },
];

export const PAYMENT_STATUS_OPTIONS = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Completed', value: 'COMPLETE' },
    { label: 'Cancelled', value: 'CANCELED' },
    { label: 'Fully Refunded', value: 'FULL_REFUND' },
    { label: 'Partial Refunded', value: 'PARTIAL_REFUND' },
    { label: 'Not Found', value: 'NOT_FOUND' },
    { label: 'Cash In Delivery', value: 'Cash In Delivery' },
    { label: 'Server connection timeout', value: 'Service is currently unavailable' },

];

export const DISCOUNT_TYPES = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Amount', value: 'amount' },
]
