/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { EmployeePaymentTypeSchema } from 'src/employee-payment-type/employee-payment-type.schema';
import { currDate } from '../helper/moment.helper';

export const EmployeePaymentSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
  type: {
    type: EmployeePaymentTypeSchema,
  },
  date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

EmployeePaymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});
