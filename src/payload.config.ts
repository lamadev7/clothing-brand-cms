import path from 'path';

import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';

import Users from './collections/Users';
import Categories from './collections/Categories';
import Product from './collections/Product';
import Media from './collections/media';

import Header from './globals/Header';
import Footer from './globals/Footer';
import Banner from './globals/Banner';
import Faqs from './collections/Faqs';
import Orders from './collections/Orders';
import Subscribers from './collections/Subscribers';
import ProductReviews from './collections/ProductReviews';
import Coupons from './collections/Coupons';

export default buildConfig({
  serverURL: process.env.BASE_URI,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Categories,
    Product,
    Media,
    Users,
    Orders,
    Faqs,
    Coupons,
    Subscribers,
    ProductReviews,
  ],
  globals: [Header, Footer, Banner],
  cors: "*",
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
