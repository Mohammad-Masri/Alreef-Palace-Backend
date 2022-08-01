import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';
import IEmployeePaymentType from 'src/employee-payment-type/employee-payment-type.interface';

export default class IEmployeePayment extends Document {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  employee_id: ObjectId;
  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: IEmployeePaymentType })
  type: IEmployeePaymentType;

  @ApiProperty({ type: Date })
  date: Date;

  readonly created_at: Date;
}
