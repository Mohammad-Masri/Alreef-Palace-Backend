import { Controller } from '@nestjs/common';
import { BillTypeService } from './bill-type.service';

@Controller('bill-type')
export class BillTypeController {
  constructor(private readonly billTypeService: BillTypeService) {}
}
