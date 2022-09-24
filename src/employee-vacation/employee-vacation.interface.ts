import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export default class IEmployeeVacation extends Document {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  employee_id: ObjectId;
  @ApiProperty({ type: String })
  reason: string;
  @ApiProperty({ type: Number })
  discount_value: number;
  @ApiProperty({ type: Date })
  date: Date;

  readonly created_at: Date;
}
