import path from 'path';

import config from "./config";
import { buildConfig } from 'payload/config';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { webpackBundler } from '@payloadcms/bundler-webpack';

import Users from './collections/Users';
import Media from './collections/media';
import Product from './collections/Product';
import Categories from './collections/Categories';

import Header from './globals/Header';
import Footer from './globals/Footer';
import Banner from './globals/Banner';
import Faqs from './collections/Faqs';
import Orders from './collections/Orders';
import Coupons from './collections/Coupons';
import Subscribers from './collections/Subscribers';
import ProductReviews from './collections/ProductReviews';

export default buildConfig({
  serverURL: config.BASE_URI,
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
    url: config.DATABASE_URI,
  }),
})
