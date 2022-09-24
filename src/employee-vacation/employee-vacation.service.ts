import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import ServerError from 'src/errors/ServerError';
import { EMPLOYEE_VACATION_NOT_FOUND } from 'src/config/server_errors';
import IEmployeeVacation from './employee-vacation.interface';
import { EmployeeVacationResponse } from 'src/employee/dto/EmployeeVacationResponse';

@Injectable()
export class EmployeeVacationService {
  constructor(
    @InjectModel('employee_vacations')
    private readonly EmployeeVacationModel: Model<IEmployeeVacation>,
  ) {}

  public async findById(employee_vacation_id: ObjectId | string) {
    const employee_vacation = await this.EmployeeVacationModel.findById(
      employee_vacation_id,
    );

    return employee_vacation;
  }

  public async checkIfFindByIdAndGetIt(
    employee_vacation_id: ObjectId | string,
  ) {
    const employee_vacation = await this.findById(employee_vacation_id);

    if (employee_vacation == null) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        EMPLOYEE_VACATION_NOT_FOUND,
        `employee_vacation with id ${employee_vacation_id} not found`,
      );
    }

    return employee_vacation;
  }

  public async findAllForEmployee(employee_id: ObjectId) {
    const employee_vacations = await this.EmployeeVacationModel.find({
      employee_id: employee_id,
    }).sort({ date: -1 });

    return employee_vacations;
  }

  public async findAllForEmployeeBetweenTowDate(
    employee_id: ObjectId,
    date_1: Date | string | null,
    date_2: Date | string | null,
  ) {
    const query: any = {};
    query['employee_id'] = employee_id;
    if ((date_1 != '' && date_1 != null) || (date_2 != '' && date_2 != null)) {
      query['date'] = {};
      if (date_1 != '' && date_1 != null) {
        query['date']['$gte'] = date_1;
      }
      if (date_2 != '' && date_2 != null) {
        query['date']['$lte'] = date_2;
      }
    }
    console.log('query\n', query);

    const employee_vacations = await this.EmployeeVacationModel.find(
      query,
    ).sort({
      date: -1,
    });

    return employee_vacations;
  }

  public async create(
    employee_id: ObjectId,
    reason: string,
    discount_value: number,
    date: Date,
  ) {
    const employee_vacation = new this.EmployeeVacationModel({
      employee_id,
      reason,
      discount_value,
      date,
    });

    return await employee_vacation.save();
  }

  public async update(
    employee_vacation: IEmployeeVacation,
    employee_id: ObjectId,
    reason: string,
    discount_value: number,
    date: Date,
  ) {
    employee_vacation.employee_id = employee_id;
    employee_vacation.reason = reason;
    employee_vacation.discount_value = discount_value;
    employee_vacation.date = date;

    return await employee_vacation.save();
  }

  public async delete(employee_vacation: IEmployeeVacation) {
    return await employee_vacation.remove();
  }

  public async makeEmployeeVacationResponse(
    employee_vacation: IEmployeeVacation,
  ) {
    return new EmployeeVacationResponse(employee_vacation);
  }

  public async makeEmployeeVacationsResponse(
    employee_vacations: IEmployeeVacation[],
  ) {
    const employee_vacations_response: EmployeeVacationResponse[] = [];
    for (let i = 0; i < employee_vacations.length; i++) {
      const employee_vacation = employee_vacations[i];
      const employee_vacation_response =
        await this.makeEmployeeVacationResponse(employee_vacation);
      employee_vacations_response.push(employee_vacation_response);
    }
    return employee_vacations_response;
  }

  public async getTotalDiscountForThisEmployeeVacations(
    employee_vacations: IEmployeeVacation[],
  ) {
    let total_discount = 0;
    for (let i = 0; i < employee_vacations.length; i++) {
      const employee_vacation = employee_vacations[i];
      total_discount += employee_vacation.discount_value;
    }
    return total_discount;
  }
}
