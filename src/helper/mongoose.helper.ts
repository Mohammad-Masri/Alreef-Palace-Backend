import * as mongoose from 'mongoose';

export const convertStringToObjectId = (id: string) => {
  return new mongoose.Schema.Types.ObjectId(id);
};
