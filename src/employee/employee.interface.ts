import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export default class IEmployee extends Document {
  @ApiProperty({ type: String })
  id: ObjectId;
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
  @ApiProperty({ type: Boolean })
  in_working: boolean;

  readonly created_at: Date;
}
