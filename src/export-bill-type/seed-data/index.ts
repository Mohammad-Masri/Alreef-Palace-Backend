/* eslint-disable prettier/prettier */
import { ExportBillTypes } from 'src/config/server_constant';

export const export_bill_types = [
  {
    key: ExportBillTypes.CONSUMED,
    name: 'استهلاكية',
  },
  {
    key: ExportBillTypes.BASIC,
    name: 'تأسيسية',
  },
];

export default export_bill_types;
