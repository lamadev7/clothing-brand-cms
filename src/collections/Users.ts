import { CollectionConfig } from 'payload/types';

import { ROLES } from '../constants';
import { adminAndSelf } from '../access';
import { isValidMobileNumber, isValidAge } from '../utils';

const User: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    create: () => true,
    read: adminAndSelf
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
  ]
}

export default User;
