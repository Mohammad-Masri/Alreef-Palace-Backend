import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EMPLOYEE_NOT_FOUND } from 'src/config/server_errors';
import ServerError from 'src/errors/ServerError';
import {
  EmployeePaymentResponse,
  EmployeePaymentsWithNetAccountResponse,
} from './dto/EmployeePaymentResponse';
import IEmployee from './employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('employees')
    private readonly EmployeeModel: Model<IEmployee>,
  ) {}

  public async findAll() {
    const employees = await this.EmployeeModel.find({ is_deleted: false });

    return employees;
  }

  public async findById(employee_id: string | ObjectId) {
    const employee = await this.EmployeeModel.findById(employee_id);

    return employee;
  }

  public async checkIfFindByIdAndGetIt(employee_id: string | ObjectId) {
    const employee = await this.findById(employee_id);
    if (employee == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_NOT_FOUND,
        `employee with id ${employee_id} not found`,
      );
    }
    return employee;
  }

  public async create(
    name: string,
    phone_number: string,
    birthday: Date | null,
    joining_date: Date | null,
    salary: number,
    position: string,
    in_working: boolean,
  ) {
    const employee = new this.EmployeeModel({
      name,
      phone_number,
      birthday,
      joining_date,
      salary,
      position,
      in_working,
    });

    return await employee.save();
  }

  public async update(
    employee: IEmployee,
    name: string,
    phone_number: string,
    birthday: Date | null,
    joining_date: Date | null,
    salary: number,
    position: string,
    in_working: boolean,
  ) {
    employee.name = name;
    employee.phone_number = phone_number;
    employee.birthday = birthday;
    employee.joining_date = joining_date;
    employee.salary = salary;
    employee.position = position;
    employee.in_working = in_working;

    return await employee.save();
  }

  public async setSalary(employee: IEmployee, salary: number) {
    employee.salary = salary;

    return await employee.save();
  }

  public async delete(employee: IEmployee) {
    employee.is_deleted = true;
    employee.in_working = false;
    return await employee.save();
  }

  public async toggleInWorking(employee: IEmployee) {
    employee.in_working = !employee.in_working;
    return await employee.save();
  }

  public async makeEmployeePaymentsWithNetAccountResponse(
    employee_payments: EmployeePaymentResponse[],
    employee: IEmployee,
    net_account: number,
    from_date: Date | string,
    to_date: Date | string,
  ) {
    return new EmployeePaymentsWithNetAccountResponse(
      employee_payments,
      employee,
      net_account,
      from_date,
      to_date,
    );
  }
}
