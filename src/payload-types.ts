/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    categories: Category;
    product: Product;
    media: Media;
    users: User;
    orders: Order;
    faqs: Faq;
    colors: Color;
    coupons: Coupon;
    contacts: Contact;
    productReviews: ProductReview;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
    banner: Banner;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product".
 */
export interface Product {
  id: string;
  name: string;
  description?: string | null;
  features?:
    | {
        item?: string | null;
        id?: string | null;
      }[]
    | null;
  price: number;
  size?: ('sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')[] | null;
  gender: 'male' | 'female' | 'unisex';
  color: {
    relationTo: 'colors';
    value: string | Color;
  }[];
  quantity?: number | null;
  category?:
    | {
        relationTo: 'categories';
        value: string | Category;
      }[]
    | null;
  prevPrice?: number | null;
  discount?: number | null;
  images?:
    | {
        productImage: string | Media;
        id?: string | null;
      }[]
    | null;
  orderBy?:
    | {
        customerId?: string | null;
        id?: string | null;
      }[]
    | null;
  reviews?:
    | {
        customerId?: {
          relationTo: 'users';
          value: string | User;
        } | null;
        description?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  ratings?:
    | {
        customerId: string;
        starCount?: number | null;
        id?: string | null;
      }[]
    | null;
  totalRating?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "colors".
 */
export interface Color {
  id: string;
  name: string;
  code: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  mobile: string;
  dob: string;
  profile?: string | Media | null;
  address?: string | null;
  roles: ('admin' | 'customer')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  userId: string | User;
  orderItems?:
    | {
        product: string | Product;
        quantity: number;
        color: string;
        size: string;
        id?: string | null;
      }[]
    | null;
  orderStatus?:
    | (
        | 'PENDING'
        | 'COMPLETE'
        | 'CANCELED'
        | 'FULL_REFUND'
        | 'PARTIAL_REFUND'
        | 'NOT_FOUND'
        | 'Cash In Delivery'
        | 'Service is currently unavailable'
      )
    | null;
  paymentMode?: ('Cash In Delivery' | 'eSewa Mobile Wallet') | null;
  paymentStatus?:
    | (
        | 'PENDING'
        | 'COMPLETE'
        | 'CANCELED'
        | 'FULL_REFUND'
        | 'PARTIAL_REFUND'
        | 'NOT_FOUND'
        | 'Cash In Delivery'
        | 'Service is currently unavailable'
      )
    | null;
  subTotal?: number | null;
  shippingFee: number;
  deliveryLocation?: string | null;
  lat?: number | null;
  lng?: number | null;
  discount?: number | null;
  total?: number | null;
  transaction_id?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faqs".
 */
export interface Faq {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "coupons".
 */
export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'amount';
  discount: number;
  validFrom: string;
  validTo: string;
  claimedUsers?: (string | User)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contacts".
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName?: string | null;
  email: string;
  message?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "productReviews".
 */
export interface ProductReview {
  id: string;
  userId: {
    relationTo: 'users';
    value: string | User;
  };
  productId: {
    relationTo: 'product';
    value: string | Product;
  };
  message?: string | null;
  attachments?:
    | {
        attachmentId?: string | null;
        url?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  logoImg: string | Media;
  navItems?:
    | {
        name?: string | null;
        path?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  footerName: string;
  footerDescription: string;
  links?:
    | {
        linkName?: string | null;
        linkPath?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "banner".
 */
export interface Banner {
  id: string;
  title: string;
  description: string;
  video?: string | Media | null;
  carousel?:
    | {
        title: string;
        quote: string;
        badgeQuote: string;
        offerPercentage: number;
        btnText: string;
        btnLink: string;
        images?:
          | {
              img: string | Media;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  buttons?:
    | {
        title: string;
        path: string;
        isVisible: boolean;
        id?: string | null;
      }[]
    | null;
  visibility?: boolean | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}