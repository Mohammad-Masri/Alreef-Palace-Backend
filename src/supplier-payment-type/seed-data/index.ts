/* eslint-disable prettier/prettier */
import { SupplierPaymentTypes } from 'src/config/server_constant';

export const supplier_payment_types = [
  {
    key: SupplierPaymentTypes.EXPORT,
    name: 'صادرات',
  },
  {
    key: SupplierPaymentTypes.IMPORT,
    name: 'واردات',
  },
];

export default supplier_payment_types;
