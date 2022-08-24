import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PORT,
} from './config/server_constant';
import { BranchModule } from './branch/branch.module';
import { ExportBillTypeModule } from './export-bill-type/export-bill-type.module';
import { BillTypeModule } from './bill-type/bill-type.module';
import { SupplierPaymentTypeModule } from './supplier-payment-type/supplier-payment-type.module';
import { EmployeePaymentTypeModule } from './employee-payment-type/employee-payment-type.module';
import { AccountModule } from './account/account.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeePaymentModule } from './employee-payment/employee-payment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dashboard'),
      exclude: ['/api*'],
    }),
    MongooseModule.forRoot(
      `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
    ),
    BranchModule,
    ExportBillTypeModule,
    BillTypeModule,
    SupplierPaymentTypeModule,
    EmployeePaymentTypeModule,
    AccountModule,
    AuthenticationModule,
    EmployeeModule,
    EmployeePaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
