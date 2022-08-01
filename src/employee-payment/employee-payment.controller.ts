import { Controller } from '@nestjs/common';
import { EmployeePaymentService } from './employee-payment.service';

@Controller('employee-payment')
export class EmployeePaymentController {
  constructor(private readonly employeePaymentService: EmployeePaymentService) {}
}
