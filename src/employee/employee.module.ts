import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './employee.schema';
import { EmployeePaymentTypeService } from 'src/employee-payment-type/employee-payment-type.service';
import { EmployeePaymentTypeSchema } from 'src/employee-payment-type/employee-payment-type.schema';
import { EmployeePaymentService } from 'src/employee-payment/employee-payment.service';
import { EmployeePaymentSchema } from 'src/employee-payment/employee-payment.schema';
import { EmployeeVacationSchema } from 'src/employee-vacation/employee-vacation.schema';
import { EmployeeVacationService } from 'src/employee-vacation/employee-vacation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'employees', // note : name here must be like name in employees service
        schema: EmployeeSchema,
      },
      {
        name: 'employee_payment_types', // note : name here must be like name in employee_payment_type service
        schema: EmployeePaymentTypeSchema,
      },
      {
        name: 'employee_payments', // note : name here must be like name in employee_payments service
        schema: EmployeePaymentSchema,
      },
      {
        name: 'employee_vacations', // note : name here must be like name in employee_vacations service
        schema: EmployeeVacationSchema,
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeePaymentTypeService,
    EmployeePaymentService,
    EmployeeVacationService,
  ],
})
export class EmployeeModule {}
