/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import IEmployeePaymentType from '../../employee-payment-type/employee-payment-type.interface';
import { EmployeePaymentTypeSchema } from '../../employee-payment-type/employee-payment-type.schema';

const EmployeePaymentTypeModel = model<IEmployeePaymentType>(
  'employee_payment_types',
  EmployeePaymentTypeSchema,
);

import { employee_payment_types } from './employee_payment_types';

const insert_data = () => {
  employee_payment_types.forEach((s) => {
    const employee_payment_type = new EmployeePaymentTypeModel({
      name: s.name,
      key: s.key,
    });

    employee_payment_type.save();
  });
  console.log('Finish');
};

insert_data();
