/* eslint-disable prettier/prettier */
import { BillTypes } from 'src/config/server_constant';

export const bill_types = [
  {
    key: BillTypes.EXPORT,
    name: 'صادرات',
  },
  {
    key: BillTypes.IMPORT,
    name: 'واردات',
  },
];

export default bill_types;
