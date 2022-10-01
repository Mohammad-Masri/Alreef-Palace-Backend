import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBillType from './bill-type.interface';
import { Command } from 'nestjs-command';
import bill_types from './seed-data';

@Injectable()
export class BillTypeService {
  constructor(
    @InjectModel('bill_types')
    private readonly BillTypeModel: Model<IBillType>,
  ) {}

  @Command({ command: 'seed:bill-types', describe: 'seed bill types' })
  private async seed() {
    console.log('Start seeding bill types');
    for (let i = 0; i < bill_types.length; i++) {
      const s = bill_types[i];
      const bill_type = new this.BillTypeModel({
        name: s.name,
        key: s.key,
      });

      await bill_type.save();
    }

    console.log('Finish seeding bill types');
  }
}
