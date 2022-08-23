/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { currDate } from '../helper/moment.helper';

export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  salary: {
    type: Number,
  },
  position: {
    type: String,
  },
  in_working: {
    type: Boolean,
    default: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

EmployeeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});
