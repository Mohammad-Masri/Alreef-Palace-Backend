/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { currDate } from '../helper/moment.helper';

export const EmployeeVacationSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  reason: {
    type: String,
  },
  discount_value: {
    type: Number,
  },
  date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

EmployeeVacationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});
