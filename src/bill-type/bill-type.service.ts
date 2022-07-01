import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBillType from './bill-type.interface';

@Injectable()
export class BillTypeService {
  constructor(
    @InjectModel('bill_types')
    private readonly BillTypeModel: Model<IBillType>,
  ) {}
}
