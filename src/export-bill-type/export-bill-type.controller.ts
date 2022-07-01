import { Controller } from '@nestjs/common';
import { ExportBillTypeService } from './export-bill-type.service';

@Controller('export-bill-type')
export class ExportBillTypeController {
  constructor(private readonly exportBillTypeService: ExportBillTypeService) {}
}
