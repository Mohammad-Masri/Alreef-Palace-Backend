import { Module } from '@nestjs/common';
import { EmployeePaymentTypeService } from './employee-payment-type.service';
import { EmployeePaymentTypeController } from './employee-payment-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeePaymentTypeSchema } from './employee-payment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'employee_payment_types', // note : name here must be like name in employee_payment_type service
        schema: EmployeePaymentTypeSchema,
      },
    ]),
  ],
  controllers: [EmployeePaymentTypeController],
  providers: [EmployeePaymentTypeService],
})
export class EmployeePaymentTypeModule {}
