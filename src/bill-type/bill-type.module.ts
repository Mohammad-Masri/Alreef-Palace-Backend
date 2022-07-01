import { Module } from '@nestjs/common';
import { BillTypeService } from './bill-type.service';
import { BillTypeController } from './bill-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillTypeSchema } from './bill-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'bill_types', // note : name here must be like name in bill_type service
        schema: BillTypeSchema,
      },
    ]),
  ],
  controllers: [BillTypeController],
  providers: [BillTypeService],
})
export class BillTypeModule {}
