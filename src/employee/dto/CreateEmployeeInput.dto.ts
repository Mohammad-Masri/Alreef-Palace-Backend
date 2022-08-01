import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeInput {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  phone_number: string;
  @ApiProperty({ type: String })
  birthday: Date;
  @ApiProperty({ type: Number })
  salary: number;
  @ApiProperty({ type: String })
  position: string;
}
