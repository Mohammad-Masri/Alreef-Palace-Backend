/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import IExportBillType from '../../export-bill-type/export-bill-type.interface';
import { ExportBillTypeSchema } from '../../export-bill-type/export-bill-type.schema';

const ExportBillTypeModel = model<IExportBillType>(
  'export_bill_types',
  ExportBillTypeSchema,
);

import { export_bill_types } from './export_bill_types';

const insert_data = () => {
  export_bill_types.forEach((s) => {
    const export_bill_type = new ExportBillTypeModel({
      name: s.name,
      key: s.key,
    });

    export_bill_type.save();
  });
  console.log('Finish');
};

insert_data();
