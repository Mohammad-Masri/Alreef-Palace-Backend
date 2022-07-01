/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import IBranch from '../../branch/branch.interface';
import { BranchSchema } from '../../branch/branch.schema';

const BranchModel = model<IBranch>('branches', BranchSchema);

import { branches } from './branches';

const insert_data = () => {
  branches.forEach((s) => {
    const branch = new BranchModel({
      name: s.name,
    });

    branch.save();
  });
  console.log('Finish');
};

insert_data();
