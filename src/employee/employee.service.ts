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
    const employees = await this.EmployeeModel.find({});

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
    birthday: Date,
    salary: number,
    position: string,
  ) {
    const employee = new this.EmployeeModel({
      name,
      phone_number,
      birthday,
      salary,
      position,
    });

    return await employee.save();
  }

  public async update(
    employee: IEmployee,
    name: string,
    phone_number: string,
    birthday: Date,
    salary: number,
    position: string,
  ) {
    employee.name = name;
    employee.phone_number = phone_number;
    employee.birthday = birthday;
    employee.salary = salary;
    employee.position = position;

    return await employee.save();
  }

  public async setSalary(employee: IEmployee, salary: number) {
    employee.salary = salary;

    return await employee.save();
  }

  public async delete(employee: IEmployee) {
    return await employee.remove();
  }
  public async toggleInWorking(employee: IEmployee) {
    employee.in_working = !employee.in_working;
    return await employee.save();
  }

  public async makeEmployeePaymentsWithNetAccountResponse(
    employee_payments: EmployeePaymentResponse[],
    net_account: number,
    from_date: Date | string,
    to_date: Date | string,
  ) {
    return new EmployeePaymentsWithNetAccountResponse(
      employee_payments,
      net_account,
      from_date,
      to_date,
    );
  }
}
