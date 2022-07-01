/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { currDate } from '../helper/moment.helper';

export const EmployeePaymentTypeSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

EmployeePaymentTypeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});
