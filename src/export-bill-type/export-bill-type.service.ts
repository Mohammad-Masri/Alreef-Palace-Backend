import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IExportBillType from './export-bill-type.interface';

@Injectable()
export class ExportBillTypeService {
  constructor(
    @InjectModel('export_bill_types')
    private readonly ExportBillTypeModel: Model<IExportBillType>,
  ) {}
}
