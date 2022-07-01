import { Module } from '@nestjs/common';
import { SupplierPaymentTypeService } from './supplier-payment-type.service';
import { SupplierPaymentTypeController } from './supplier-payment-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierPaymentTypeSchema } from './supplier-payment-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'supplier_payment_types', // note : name here must be like name in supplier_payment_type service
        schema: SupplierPaymentTypeSchema,
      },
    ]),
  ],
  controllers: [SupplierPaymentTypeController],
  providers: [SupplierPaymentTypeService],
})
export class SupplierPaymentTypeModule {}
