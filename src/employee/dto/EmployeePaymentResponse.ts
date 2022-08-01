import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import IEmployeePayment from 'src/employee-payment/employee-payment.interface';

export class EmployeePaymentResponse {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  employee_id: ObjectId;
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: String })
  type_name: string;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty({ type: Date })
  created_at: Date;

  constructor(employee_payment: IEmployeePayment) {
    this.id = employee_payment.id;
    this.employee_id = employee_payment.employee_id;
    this.description = employee_payment.description;
    this.amount = employee_payment.amount;
    this.type_name = employee_payment.type.name;
    this.date = employee_payment.date;
  }
}

export class EmployeePaymentsWithNetAccountResponse {
  @ApiProperty({ type: EmployeePaymentResponse, isArray: true })
  employee_payments: EmployeePaymentResponse[];

  @ApiProperty({ type: Number })
  net_account: number;

  @ApiProperty({ type: String })
  from_date: Date | string;
  @ApiProperty({ type: String })
  to_date: Date | string;

  constructor(
    employee_payments: EmployeePaymentResponse[],
    net_account: number,
    from_date: Date | string,
    to_date: Date | string,
  ) {
    this.employee_payments = employee_payments;
    this.net_account = net_account;
    this.from_date = from_date;
    this.to_date = to_date;
  }
}
