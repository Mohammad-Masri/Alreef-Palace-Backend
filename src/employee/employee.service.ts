import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EMPLOYEE_NOT_FOUND } from 'src/config/server_errors';
import { EmployeePaymentService } from 'src/employee-payment/employee-payment.service';
import IEmployeeVacation from 'src/employee-vacation/employee-vacation.interface';
import { EmployeeVacationService } from 'src/employee-vacation/employee-vacation.service';
import ServerError from 'src/errors/ServerError';
import { EmployeeFinancialReport } from './dto/EmployeeFinancialReport.dto';
import {
  EmployeePaymentResponse,
  EmployeePaymentsWithNetAccountResponse,
} from './dto/EmployeePaymentResponse';
import {
  EmployeeVacationResponse,
  EmployeeVacationsWithTotalDiscountResponse,
} from './dto/EmployeeVacationResponse';
import IEmployee from './employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('employees')
    private readonly EmployeeModel: Model<IEmployee>,
    private readonly employeePaymentService: EmployeePaymentService,
    private readonly employeeVacationService: EmployeeVacationService,
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
    one_day_vacation_discount: number,
    position: string,
    in_working: boolean,
  ) {
    const employee = new this.EmployeeModel({
      name,
      phone_number,
      birthday,
      joining_date,
      salary,
      one_day_vacation_discount,
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
    one_day_vacation_discount: number,
    position: string,
    in_working: boolean,
  ) {
    employee.name = name;
    employee.phone_number = phone_number;
    employee.birthday = birthday;
    employee.joining_date = joining_date;
    employee.salary = salary;
    employee.one_day_vacation_discount = one_day_vacation_discount;
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

  public async makeEmployeeVacationsWithTotalDiscountResponse(
    employee_vacations: IEmployeeVacation[],
    from_date: Date | string,
    to_date: Date | string,
  ) {
    return new EmployeeVacationsWithTotalDiscountResponse(
      employee_vacations,
      from_date,
      to_date,
    );
  }

  public async makeEmployeePaymentsAndEmployeeVacationsWithNetAccountResponse(
    employee_payments: EmployeePaymentResponse[],
    employee_vacations: EmployeeVacationResponse[],
    employee: IEmployee,
    employee_payments_net_account: number,
    employee_vacations_total_discount: number,
    from_date: Date | string,
    to_date: Date | string,
  ) {
    return new EmployeeFinancialReport(
      employee_payments,
      employee_vacations,
      employee,
      employee_payments_net_account,
      employee_vacations_total_discount,
      from_date,
      to_date,
    );
  }

  public async generateFinancialReportBetweenTwoDate(
    employee: IEmployee,
    from_date: Date | string | null,
    to_date: Date | string | null,
  ) {
    const employee_payments =
      await await this.employeePaymentService.findAllForEmployeeBetweenTowDate(
        employee.id,
        from_date,
        to_date,
      );

    const employee_payments_net_account =
      await this.employeePaymentService.getNetAccountForThisEmployeePayments(
        employee_payments,
      );

    const employee_payments_response =
      await this.employeePaymentService.makeEmployeePaymentsResponse(
        employee_payments,
      );

    const employee_vacations =
      await await this.employeeVacationService.findAllForEmployeeBetweenTowDate(
        employee.id,
        from_date,
        to_date,
      );

    const employee_vacations_total_discount =
      await this.employeeVacationService.getTotalDiscountForThisEmployeeVacations(
        employee_vacations,
      );

    const employee_vacations_response =
      await this.employeeVacationService.makeEmployeeVacationsResponse(
        employee_vacations,
      );

    const result =
      await this.makeEmployeePaymentsAndEmployeeVacationsWithNetAccountResponse(
        employee_payments_response,
        employee_vacations_response,
        employee,
        employee_payments_net_account,
        employee_vacations_total_discount,
        from_date,
        to_date,
      );
    return result;
  }
}
