import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBranch from './branch.interface';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('branches')
    private readonly BranchModel: Model<IBranch>,
  ) {}
}
