import { Module } from '@nestjs/common';
import { EmployeePaymentService } from './employee-payment.service';
import { EmployeePaymentController } from './employee-payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeePaymentSchema } from './employee-payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'employee_payments', // note : name here must be like name in employee_payments service
        schema: EmployeePaymentSchema,
      },
    ]),
  ],
  controllers: [EmployeePaymentController],
  providers: [EmployeePaymentService],
})
export class EmployeePaymentModule {}
