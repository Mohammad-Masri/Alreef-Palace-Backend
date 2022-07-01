/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import IBillType from '../../bill-type/bill-type.interface';
import { BillTypeSchema } from '../../bill-type/bill-type.schema';

const BillTypeModel = model<IBillType>('bill_types', BillTypeSchema);

import { bill_types } from './bill_types';

const insert_data = () => {
  bill_types.forEach((s) => {
    const bill_type = new BillTypeModel({
      name: s.name,
      key: s.key,
    });

    bill_type.save();
  });
  console.log('Finish');
};

insert_data();
