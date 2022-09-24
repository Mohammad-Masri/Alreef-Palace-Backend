import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeVacationInput {
  @ApiProperty({ type: String })
  employee_id: string;
  @ApiProperty({ type: String })
  reason: string;
  @ApiProperty({ type: Number })
  discount_value: number;
  @ApiProperty({ type: String })
  date: Date;
}
