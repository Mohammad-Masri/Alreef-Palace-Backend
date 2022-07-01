/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import ISupplierPaymentType from '../../supplier-payment-type/supplier-payment-type.interface';
import { SupplierPaymentTypeSchema } from '../../supplier-payment-type/supplier-payment-type.schema';

const ExportBillTypeModel = model<ISupplierPaymentType>(
  'supplier_payment_types',
  SupplierPaymentTypeSchema,
);

import { supplier_payment_types } from './supplier_payment_types';

const insert_data = () => {
  supplier_payment_types.forEach((s) => {
    const supplier_payment_type = new ExportBillTypeModel({
      name: s.name,
      key: s.key,
    });

    supplier_payment_type.save();
  });
  console.log('Finish');
};

insert_data();
