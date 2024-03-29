import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeInput {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  phone_number: string;
  @ApiProperty({ type: String })
  birthday: Date;
  @ApiProperty({ type: String })
  joining_date: Date | null;
  @ApiProperty({ type: Number })
  salary: number;
  @ApiProperty({ type: Number })
  one_day_vacation_discount: number;
  @ApiProperty({ type: String })
  position: string;
  @ApiProperty({ type: Boolean })
  in_working: boolean;
}
