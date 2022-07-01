import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ISupplierPaymentType from './supplier-payment-type.interface';

@Injectable()
export class SupplierPaymentTypeService {
  constructor(
    @InjectModel('supplier_payment_types')
    private readonly SupplierPaymentTypeModel: Model<ISupplierPaymentType>,
  ) {}
}
