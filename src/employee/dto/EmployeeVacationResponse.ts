/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import IEmployeeVacation from 'src/employee-vacation/employee-vacation.interface';

export class EmployeeVacationResponse {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  employee_id: ObjectId;
  @ApiProperty({ type: String })
  reason: string;
  @ApiProperty({ type: Number })
  discount_value: number;
  @ApiProperty({ type: Date })
  date: Date;
  @ApiProperty({ type: Date })
  created_at: Date;

  constructor(employee_vacation: IEmployeeVacation) {
    this.id = employee_vacation.id;
    this.employee_id = employee_vacation.employee_id;
    this.reason = employee_vacation.reason;
    this.discount_value = employee_vacation.discount_value;
    this.date = employee_vacation.date;
    this.created_at = employee_vacation.created_at;
  }
}

export class EmployeeVacationsWithTotalDiscountResponse {
  @ApiProperty({ type: IEmployeeVacation, isArray: true })
  employee_vacations: IEmployeeVacation[];

  @ApiProperty({ type: Number })
  total_discount: number;

  @ApiProperty({ type: String })
  from_date: Date | string;
  @ApiProperty({ type: String })
  to_date: Date | string;

  constructor(
    employee_vacations: IEmployeeVacation[],

    from_date: Date | string,
    to_date: Date | string,
  ) {
    this.employee_vacations = employee_vacations;

    this.from_date = from_date;
    this.to_date = to_date;

    let total_discount = 0;
    employee_vacations.forEach((employee_vacation) => {
      total_discount += employee_vacation.discount_value;
    });

    this.total_discount = total_discount;
  }
}
