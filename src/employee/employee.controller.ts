import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeePaymentTypes } from 'src/config/server_constant';
import { CREATE_SALARY_EMPLOYEE_PAYMENT_FAILED_THERE_IS_ONE_ALREADY_FOR_THIS_MONTH } from 'src/config/server_errors';
import { EmployeePaymentTypeService } from 'src/employee-payment-type/employee-payment-type.service';
import IEmployeePayment from 'src/employee-payment/employee-payment.interface';
import { EmployeePaymentService } from 'src/employee-payment/employee-payment.service';
import IEmployeeVacation from 'src/employee-vacation/employee-vacation.interface';
import { EmployeeVacationService } from 'src/employee-vacation/employee-vacation.service';
import ServerError from 'src/errors/ServerError';
import { AuthGuard } from 'src/guards/auth.guard';
import { getFirstDateAndLastDateInMonth } from 'src/helper/moment.helper';
import { convertStringToObjectId } from 'src/helper/mongoose.helper';
import { CreateEmployeeInput } from './dto/CreateEmployeeInput.dto';
import {
  CreateEmployeePaymentInput,
  UpdateEmployeePaymentInput,
} from './dto/CreateEmployeePaymentInput.dto';
import { CreateEmployeeVacationInput } from './dto/CreateEmployeeVacationInput.dto';
import { EmployeeFinancialReport } from './dto/EmployeeFinancialReport.dto';
import { EmployeePaymentsWithNetAccountResponse } from './dto/EmployeePaymentResponse';
import { EmployeeVacationsWithTotalDiscountResponse } from './dto/EmployeeVacationResponse';
import IEmployee from './employee.interface';
import { EmployeeService } from './employee.service';

@Controller('employee')
@ApiTags('Employee')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeePaymentTypeService: EmployeePaymentTypeService,
    private readonly employeePaymentService: EmployeePaymentService,
    private readonly employeeVacationService: EmployeeVacationService,
  ) {}

  @Post('/')
  @ApiOkResponse({
    type: IEmployee,
    isArray: true,
  })
  async createEmployee(@Body() createEmployeeInput: CreateEmployeeInput) {
    const employee = await this.employeeService.create(
      createEmployeeInput.name,
      createEmployeeInput.phone_number,
      createEmployeeInput.birthday,
      createEmployeeInput.joining_date,
      createEmployeeInput.salary,
      createEmployeeInput.one_day_vacation_discount,
      createEmployeeInput.position,
      createEmployeeInput.in_working,
    );

    return await this.employeeService.findAll();
  }

  @Get('/')
  @ApiOkResponse({
    type: IEmployee,
    isArray: true,
  })
  async getAllEmployees() {
    return await this.employeeService.findAll();
  }

  @Get('/:employee_id')
  @ApiOkResponse({
    type: IEmployee,
  })
  async getEmployee(@Param('employee_id') employee_id: string) {
    return await this.employeeService.checkIfFindByIdAndGetIt(employee_id);
  }

  @Put('/:employee_id')
  @ApiOkResponse({
    type: IEmployee,
    isArray: true,
  })
  async updateEmployee(
    @Param('employee_id') employee_id: string,
    @Body() createEmployeeInput: CreateEmployeeInput,
  ) {
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_id,
    );
    await this.employeeService.update(
      employee,
      createEmployeeInput.name,
      createEmployeeInput.phone_number,
      createEmployeeInput.birthday,
      createEmployeeInput.joining_date,
      createEmployeeInput.salary,
      createEmployeeInput.one_day_vacation_discount,
      createEmployeeInput.position,
      createEmployeeInput.in_working,
    );
    return await this.employeeService.findAll();
  }

  @Delete('/:employee_id')
  @ApiOkResponse({
    type: IEmployee,
    isArray: true,
  })
  async deleteEmployee(@Param('employee_id') employee_id: string) {
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_id,
    );
    await this.employeeService.delete(employee);
    return await this.employeeService.findAll();
  }

  // Employee Payment
  @Post('/employee-payment')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async createEmployeePayment(
    @Body() createEmployeePaymentInput: CreateEmployeePaymentInput,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      createEmployeePaymentInput.employee_id,
    );
    const employee_payment_type =
      await this.employeePaymentTypeService.checkIfFindByKeyAndGetIt(
        createEmployeePaymentInput.employee_payment_type_key,
      );
    const date = new Date(createEmployeePaymentInput.date);
    const { first_date_of_month, last_date_of_month } =
      await getFirstDateAndLastDateInMonth(date);

    if (employee_payment_type.key == EmployeePaymentTypes.SALARY) {
      // can't pay 2 salary in same month
      // check if there is a salary payed for this month before

      const salaries_employee_payments_in_this_month =
        await this.employeePaymentService.findAllForEmployeeBetweenTowDateByEmployeePaymentType(
          employee.id,
          first_date_of_month,
          last_date_of_month,
          EmployeePaymentTypes.SALARY,
        );

      if (salaries_employee_payments_in_this_month.length != 0) {
        throw new ServerError(
          HttpStatus.NOT_FOUND,
          CREATE_SALARY_EMPLOYEE_PAYMENT_FAILED_THERE_IS_ONE_ALREADY_FOR_THIS_MONTH,
          `can't create employee payment (salary) for this employee with id ${employee.id} for this month`,
        );
      }
    }

    const employee_payment = await this.employeePaymentService.create(
      employee.id,
      createEmployeePaymentInput.description,
      createEmployeePaymentInput.amount,
      employee_payment_type,
      createEmployeePaymentInput.date,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  @Get('/employee-payment/get-all/:employee_id')
  @ApiOkResponse({
    type: EmployeePaymentsWithNetAccountResponse,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async getAllEmployeePaymentsForEmployeeBetweenTwoDates(
    @Param('employee_id') employee_id: string,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_id,
    );

    const employee_payments =
      await await this.employeePaymentService.findAllForEmployeeBetweenTowDate(
        employee.id,
        from_date,
        to_date,
      );

    const net_account =
      await this.employeePaymentService.getNetAccountForThisEmployeePayments(
        employee_payments,
      );

    const employee_payments_response =
      await this.employeePaymentService.makeEmployeePaymentsResponse(
        employee_payments,
      );

    const result =
      await this.employeeService.makeEmployeePaymentsWithNetAccountResponse(
        employee_payments_response,
        employee,
        net_account,
        from_date,
        to_date,
      );

    return result;
  }

  @Get('/employee-payment/:employee_payment_id')
  @ApiOkResponse({
    type: IEmployeePayment,
  })
  async getEmployeePayment(
    @Param('employee_payment_id') employee_payment_id: string,
  ) {
    const employee_payment =
      await await this.employeePaymentService.checkIfFindByIdAndGetIt(
        employee_payment_id,
      );

    return employee_payment;
  }

  @Put('/employee-payment/:employee_payment_id')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async updateEmployeePayment(
    @Param('employee_payment_id') employee_payment_id: string,
    @Body() updateEmployeePaymentInput: UpdateEmployeePaymentInput,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    const employee_payment =
      await this.employeePaymentService.checkIfFindByIdAndGetIt(
        employee_payment_id,
      );

    const employee_payment_type =
      await this.employeePaymentTypeService.checkIfFindByKeyAndGetIt(
        updateEmployeePaymentInput.employee_payment_type_key,
      );

    await this.employeePaymentService.update(
      employee_payment,
      updateEmployeePaymentInput.description,
      updateEmployeePaymentInput.amount,
      employee_payment_type,
      updateEmployeePaymentInput.date,
    );

    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_payment.employee_id,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  @Delete('/employee-payment/:employee_payment_id')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async deleteEmployeePayment(
    @Param('employee_payment_id') employee_payment_id: string,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    const employee_payment =
      await this.employeePaymentService.checkIfFindByIdAndGetIt(
        employee_payment_id,
      );

    await this.employeePaymentService.delete(employee_payment);

    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_payment.employee_id,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  // Employee Vacation
  @Post('/employee-vacation')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async createNewEmployeeVacation(
    @Body() createEmployeeVacationInput: CreateEmployeeVacationInput,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      createEmployeeVacationInput.employee_id,
    );

    const employee_vacation = await this.employeeVacationService.create(
      employee.id,
      createEmployeeVacationInput.reason,
      createEmployeeVacationInput.discount_value,
      createEmployeeVacationInput.date,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  @Get('/employee-vacation/get-all/:employee_id')
  @ApiOkResponse({
    type: EmployeeVacationsWithTotalDiscountResponse,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async getAllEmployeeVacationsForEmployeeBetweenTwoDates(
    @Param('employee_id') employee_id: string,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_id,
    );

    const employee_vacations =
      await await this.employeeVacationService.findAllForEmployeeBetweenTowDate(
        employee.id,
        from_date,
        to_date,
      );

    const employee_vacations_response =
      await this.employeeService.makeEmployeeVacationsWithTotalDiscountResponse(
        employee_vacations,
        from_date,
        to_date,
      );

    return employee_vacations_response;
  }

  @Get('/employee-vacation/:employee_vacation_id')
  @ApiOkResponse({
    type: IEmployeeVacation,
  })
  async getEmployeeVacation(
    @Param('employee_vacation_id') employee_vacation_id: string,
  ) {
    const employee_vacation =
      await await this.employeeVacationService.checkIfFindByIdAndGetIt(
        employee_vacation_id,
      );

    return employee_vacation;
  }

  @Put('/employee-vacation/:employee_vacation_id')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async updateEmployeeVacation(
    @Param('employee_vacation_id') employee_vacation_id: string,
    @Body() createEmployeeVacationInput: CreateEmployeeVacationInput,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee_vacation =
      await this.employeeVacationService.checkIfFindByIdAndGetIt(
        employee_vacation_id,
      );

    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      createEmployeeVacationInput.employee_id,
    );

    await this.employeeVacationService.update(
      employee_vacation,
      employee.id,
      createEmployeeVacationInput.reason,
      createEmployeeVacationInput.discount_value,
      createEmployeeVacationInput.date,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  @Delete('/employee-vacation/:employee_vacation_id')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async deleteEmployeeVacation(
    @Param('employee_vacation_id') employee_vacation_id: string,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee_vacation =
      await this.employeeVacationService.checkIfFindByIdAndGetIt(
        employee_vacation_id,
      );

    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_vacation.employee_id,
    );

    await this.employeeVacationService.delete(employee_vacation);

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }

  @Get('/financial-report/:employee_id')
  @ApiOkResponse({
    type: EmployeeFinancialReport,
  })
  @ApiQuery({ name: 'from_date', required: false })
  @ApiQuery({ name: 'to_date', required: false })
  async getEmployeeFinancialReportBetweenTwoDates(
    @Param('employee_id') employee_id: string,
    @Query('from_date') from_date: string | null,
    @Query('to_date') to_date: string | null,
  ) {
    console.log('from_date : ', from_date);
    console.log('to_date : ', to_date);
    const employee = await this.employeeService.checkIfFindByIdAndGetIt(
      employee_id,
    );

    const financial_report =
      await this.employeeService.generateFinancialReportBetweenTwoDate(
        employee,
        from_date,
        to_date,
      );

    return financial_report;
  }
}
