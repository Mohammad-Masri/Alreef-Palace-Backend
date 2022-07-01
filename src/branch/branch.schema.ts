/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { currDate } from '../helper/moment.helper';

export const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: currDate(),
  },
});

BranchSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    delete ret._id;
  },
});
