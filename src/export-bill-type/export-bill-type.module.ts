import { Module } from '@nestjs/common';
import { ExportBillTypeService } from './export-bill-type.service';
import { ExportBillTypeController } from './export-bill-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportBillTypeSchema } from './export-bill-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'export_bill_types', // note : name here must be like name in export_bill_type service
        schema: ExportBillTypeSchema,
      },
    ]),
  ],
  controllers: [ExportBillTypeController],
  providers: [ExportBillTypeService],
})
export class ExportBillTypeModule {}
