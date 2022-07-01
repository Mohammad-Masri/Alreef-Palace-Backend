import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export default class IEmployeePaymentType extends Document {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  key: string;
  @ApiProperty({ type: String })
  name: string;

  readonly created_at: Date;
}
