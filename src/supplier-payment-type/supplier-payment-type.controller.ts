import { Controller } from '@nestjs/common';
import { SupplierPaymentTypeService } from './supplier-payment-type.service';

@Controller('supplier-payment-type')
export class SupplierPaymentTypeController {
  constructor(private readonly supplierPaymentTypeService: SupplierPaymentTypeService) {}
}
