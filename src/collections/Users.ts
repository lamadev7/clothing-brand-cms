import { CollectionConfig } from 'payload/types';

import config from '../config';
import { ROLES } from '../constants';
import { adminOnly, customerAndAdmin } from '../access';
import { isValidMobileNumber, isValidAge, hideAdminCollection } from '../utils';

const User: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailHTML: ({ token, user }: any) => {
        const resetPasswordURL = `${config.CLIENT_URI}/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Here is my custom email template!</h1>
              <p>Hello, ${user?.email}!</p>
              <p>Click below to reset your password.</p>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `
      },
    },
  },
  admin: {
    useAsTitle: 'firstName',
    hidden: hideAdminCollection,
  },
  access: {
    create: () => true,
    read: () => true,
    delete: adminOnly,
    update: customerAndAdmin,
  },
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      maxLength: 10,
      minLength: 2,
      required: true,
      index: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      maxLength: 10,
      minLength: 2,
    },
    {
      name: 'mobile',
      label: 'Mobile Number',
      type: 'text',
      maxLength: 11,
      required: true,
      unique: true,
      validate: (val, _args) => {
        const isValid = isValidMobileNumber(val);

        if (isValid) return true;
        return "Invalid Mobile Number Format";
      }
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      validate: (val, _args) => {
        const isValid = isValidAge(val, 12);

        if (isValid) return true;
        return "Age must be above 12 years!"
      }
    },
    {
      name: 'profile',
      label: 'Profile Picture',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' },
      ],
      admin: {
        isClearable: true,
        isSortable: true,
      },
      access: {
        read: () => true,
        update: (args) => {
          const { data, req }: any = args ?? {};
          const { user } = req ?? {};

          return user?.roles?.includes(ROLES.ADMIN);
        }
      },
      hasMany: true,
      required: true
    }
  ],
  endpoints: [
    {
      path: '/update',
      method: 'put',
      handler: async (req, res) => {
        try {
          const { payload, body } = req;
          const { id } = body;

          if (id) {
            const response = await payload.update({
              collection: 'users',
              id: id,
              data: body
            });
            return res.send({ message: 'User updated successfully!', data: response });
          }
        } catch (error) {
          console.error(error);
          res.status(500).send({ message: error.message });
        }
      }
    },
    {
      path: '/auth/login',
      method: 'post',
      handler: async (req, res) => {
        try {
          const { payload, body } = req;
          const { email } = body;
        } catch (error) {
          res.status(500).send(error);
        }
      }
    }
  ]
}

export default User;
