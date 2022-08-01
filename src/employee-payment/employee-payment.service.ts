import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EmployeePaymentTypes } from 'src/config/server_constant';
import { EMPLOYEE_PAYMENT_NOT_FOUND } from 'src/config/server_errors';
import IEmployeePaymentType from 'src/employee-payment-type/employee-payment-type.interface';
import { EmployeePaymentResponse } from 'src/employee/dto/EmployeePaymentResponse';
import ServerError from 'src/errors/ServerError';
import IEmployeePayment from './employee-payment.interface';

@Injectable()
export class EmployeePaymentService {
  constructor(
    @InjectModel('employee_payments')
    private readonly EmployeePaymentModel: Model<IEmployeePayment>,
  ) {}

  public async findById(employee_payment_id: ObjectId | string) {
    const employee_payment = await this.EmployeePaymentModel.findById(
      employee_payment_id,
    );

    return employee_payment;
  }

  public async checkIfFindByIdAndGetIt(employee_payment_id: ObjectId | string) {
    const employee_payment = await this.findById(employee_payment_id);

    if (employee_payment == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_PAYMENT_NOT_FOUND,
        `employee_payment with id ${employee_payment_id} not found`,
      );
    }

    return employee_payment;
  }

  public async findAllForEmployee(employee_id: ObjectId) {
    const employee_payments = await this.EmployeePaymentModel.find({
      employee_id: employee_id,
    }).sort({ date: -1 });

    return employee_payments;
  }

  public async findAllForEmployeeBetweenTowDate(
    employee_id: ObjectId,
    date_1: Date | string | null,
    date_2: Date | string | null,
  ) {
    const query: any = {};
    query['employee_id'] = employee_id;
    if (date_1 != null || date_2 != null) {
      query['date'] = {};
      if (date_1 != null) {
        query['date']['$gte'] = date_1;
      }
      if (date_2 != null) {
        query['date']['$lte'] = date_2;
      }
    }
    console.log('query\n', query);

    const employee_payments = await this.EmployeePaymentModel.find(query).sort({
      date: -1,
    });

    return employee_payments;
  }

  public async findAllForEmployeeBetweenTowDateByEmployeePaymentType(
    employee_id: ObjectId,
    date_1: Date | string | null,
    date_2: Date | string | null,
    employee_payment_type: string,
  ) {
    const query: any = {};
    query['employee_id'] = employee_id;
    query['type.key'] = employee_payment_type;
    if (date_1 != null || date_2 != null) {
      query['date'] = {};
      if (date_1 != null) {
        query['date']['$gte'] = date_1;
      }
      if (date_2 != null) {
        query['date']['$lte'] = date_2;
      }
    }
    console.log('query\n', query);

    const employee_payments = await this.EmployeePaymentModel.find(query).sort({
      date: -1,
    });

    return employee_payments;
  }

  public async create(
    employee_id: ObjectId,
    description: string,
    amount: number,
    type: IEmployeePaymentType,
    date: Date,
  ) {
    const employee_payment = new this.EmployeePaymentModel({
      employee_id,
      description,
      amount,
      type,
      date,
    });

    return await employee_payment.save();
  }

  public async update(
    employee_payment: IEmployeePayment,
    description: string,
    amount: number,
    type: IEmployeePaymentType,
    date: Date,
  ) {
    employee_payment.description = description;
    employee_payment.amount = amount;
    employee_payment.type = type;
    employee_payment.date = date;
    return await employee_payment.save();
  }

  public async delete(employee_payment: IEmployeePayment) {
    return await employee_payment.remove();
  }

  public async getNetAccountForThisEmployeePayments(
    employee_payments: IEmployeePayment[],
  ) {
    let net_account = 0;
    for (let i = 0; i < employee_payments.length; i++) {
      const employee_payment = employee_payments[i];
      if (employee_payment.type.key == EmployeePaymentTypes.ADVANCE) {
        net_account = net_account - employee_payment.amount;
      } else {
        net_account = net_account + employee_payment.amount;
      }
    }
    return net_account;
  }

  public async makeEmployeePaymentResponse(employee_payment: IEmployeePayment) {
    return new EmployeePaymentResponse(employee_payment);
  }

  public async makeEmployeePaymentsResponse(
    employee_payments: IEmployeePayment[],
  ) {
    const employee_payments_response = [];
    for (let i = 0; i < employee_payments.length; i++) {
      const employee_payment_response = await this.makeEmployeePaymentResponse(
        employee_payments[i],
      );
      employee_payments_response.push(employee_payment_response);
    }

    return employee_payments_response;
  }
}
