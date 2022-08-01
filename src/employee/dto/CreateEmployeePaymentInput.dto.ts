import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeePaymentInput {
  @ApiProperty({ type: String })
  employee_id: string;
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: Number })
  amount: number;
  @ApiProperty({ type: String })
  employee_payment_type_key: string;
  @ApiProperty({ type: String })
  date: Date;
}

export class UpdateEmployeePaymentInput {
  @ApiProperty({ type: String })
  description: string;
  @ApiProperty({ type: Number })
  amount: number;
  @ApiProperty({ type: String })
  employee_payment_type_key: string;
  @ApiProperty({ type: String })
  date: Date;
}
