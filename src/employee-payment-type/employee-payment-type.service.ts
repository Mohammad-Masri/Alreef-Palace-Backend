import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IEmployeePaymentType from './employee-payment-type.interface';

@Injectable()
export class EmployeePaymentTypeService {
  constructor(
    @InjectModel('employee_payment_types')
    private readonly EmployeePaymentTypeModel: Model<IEmployeePaymentType>,
  ) {}
}
