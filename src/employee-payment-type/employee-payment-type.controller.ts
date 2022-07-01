import { Controller } from '@nestjs/common';
import { EmployeePaymentTypeService } from './employee-payment-type.service';

@Controller('employee-payment-type')
export class EmployeePaymentTypeController {
  constructor(private readonly employeePaymentTypeService: EmployeePaymentTypeService) {}
}
