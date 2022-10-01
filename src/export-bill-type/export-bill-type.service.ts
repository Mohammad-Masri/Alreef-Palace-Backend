import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IExportBillType from './export-bill-type.interface';
import { Command } from 'nestjs-command';
import export_bill_types from './seed-data';

@Injectable()
export class ExportBillTypeService {
  constructor(
    @InjectModel('export_bill_types')
    private readonly ExportBillTypeModel: Model<IExportBillType>,
  ) {}

  @Command({
    command: 'seed:export-bill-types',
    describe: 'seed export bill types',
  })
  private async seed() {
    console.log('Start seeding export-bill-types');
    for (let i = 0; i < export_bill_types.length; i++) {
      const e = export_bill_types[i];
      const export_bill_type = new this.ExportBillTypeModel({
        name: e.name,
        key: e.key,
      });

      await export_bill_type.save();
    }

    console.log('Finish seeding export-bill-types');
  }
}
