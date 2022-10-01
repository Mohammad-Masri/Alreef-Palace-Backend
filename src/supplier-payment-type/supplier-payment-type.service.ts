import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ISupplierPaymentType from './supplier-payment-type.interface';
import { Command } from 'nestjs-command';
import supplier_payment_types from './seed-data';

@Injectable()
export class SupplierPaymentTypeService {
  constructor(
    @InjectModel('supplier_payment_types')
    private readonly SupplierPaymentTypeModel: Model<ISupplierPaymentType>,
  ) {}

  @Command({
    command: 'seed:supplier-payment-types',
    describe: 'seed supplier payment types',
  })
  private async seed() {
    console.log('Start seeding supplier payment types');
    for (let i = 0; i < supplier_payment_types.length; i++) {
      const s = supplier_payment_types[i];
      const supplier_payment_type = new this.SupplierPaymentTypeModel({
        name: s.name,
        key: s.key,
      });

      await supplier_payment_type.save();
    }

    console.log('Finish seeding supplier payment types');
  }
}
