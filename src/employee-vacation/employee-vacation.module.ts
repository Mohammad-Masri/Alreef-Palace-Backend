import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeVacationSchema } from './employee-vacation.schema';
import { EmployeeVacationService } from './employee-vacation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'employee_vacations', // note : name here must be like name in employee_vacations service
        schema: EmployeeVacationSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [EmployeeVacationService],
})
export class EmployeeVacationModule {}
