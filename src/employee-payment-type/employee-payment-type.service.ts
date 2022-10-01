import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EMPLOYEE_PAYMENT_TYPE_NOT_FOUND } from 'src/config/server_errors';
import ServerError from 'src/errors/ServerError';
import IEmployeePaymentType from './employee-payment-type.interface';
import { Command } from 'nestjs-command';
import employee_payment_types from './seed-data';

@Injectable()
export class EmployeePaymentTypeService {
  constructor(
    @InjectModel('employee_payment_types')
    private readonly EmployeePaymentTypeModel: Model<IEmployeePaymentType>,
  ) {}

  @Command({
    command: 'seed:employee-payment-types',
    describe: 'seed employee payment types',
  })
  private async seed() {
    console.log('Start seeding employee payment types');
    for (let i = 0; i < employee_payment_types.length; i++) {
      const e = employee_payment_types[i];
      const employee_payment_type = new this.EmployeePaymentTypeModel({
        name: e.name,
        key: e.key,
      });

      await employee_payment_type.save();
    }

    console.log('Finish employee payment types');
  }

  public async findById(employee_payment_type_id: ObjectId | string) {
    const employee_payment_type = await this.EmployeePaymentTypeModel.findById(
      employee_payment_type_id,
    );
    return employee_payment_type;
  }
  public async findByKey(employee_payment_type_key: string) {
    const employee_payment_type = await this.EmployeePaymentTypeModel.findOne({
      key: employee_payment_type_key,
    });
    return employee_payment_type;
  }

  public async checkIfFindByIdAndGetIt(
    employee_payment_type_id: ObjectId | string,
  ) {
    const employee_payment_type = await this.findById(employee_payment_type_id);

    if (employee_payment_type == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_PAYMENT_TYPE_NOT_FOUND,
        `employee_payment_type with id ${employee_payment_type_id} not found`,
      );
    }

    return employee_payment_type;
  }

  public async checkIfFindByKeyAndGetIt(employee_payment_type_key: string) {
    const employee_payment_type = await this.findByKey(
      employee_payment_type_key,
    );

    if (employee_payment_type == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_PAYMENT_TYPE_NOT_FOUND,
        `employee_payment_type with key ${employee_payment_type_key} not found`,
      );
    }

    return employee_payment_type;
  }
}
