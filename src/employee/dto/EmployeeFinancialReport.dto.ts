/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import IEmployee from '../employee.interface';
import { EmployeePaymentResponse } from './EmployeePaymentResponse';
import {
  EmployeeVacationResponse,
  EmployeeVacationsWithTotalDiscountResponse,
} from './EmployeeVacationResponse';

export class EmployeeFinancialReport {
  @ApiProperty({ type: EmployeePaymentResponse, isArray: true })
  employee_payments: EmployeePaymentResponse[];
  @ApiProperty({ type: EmployeeVacationResponse, isArray: true })
  employee_vacations: EmployeeVacationResponse[];
  @ApiProperty({ type: IEmployee })
  employee: IEmployee;
  @ApiProperty({ type: Number })
  employee_payments_net_account: number;
  @ApiProperty({ type: Number })
  employee_vacations_total_discount: number;
  @ApiProperty({ type: String })
  from_date: Date | string;
  @ApiProperty({ type: String })
  to_date: Date | string;
  @ApiProperty({ type: Number })
  net_account: number;

  constructor(
    employee_payments: EmployeePaymentResponse[],
    employee_vacations: EmployeeVacationResponse[],
    employee: IEmployee,
    employee_payments_net_account: number,
    employee_vacations_total_discount: number,
    from_date: Date | string,
    to_date: Date | string,
  ) {
    this.employee_payments = employee_payments;

    this.employee_vacations = employee_vacations;

    this.employee = employee;

    this.from_date = from_date;
    this.to_date = to_date;
    this.employee_payments_net_account = employee_payments_net_account;
    this.employee_vacations_total_discount = employee_vacations_total_discount;
    this.net_account =
      employee_payments_net_account - employee_vacations_total_discount;
  }
}
