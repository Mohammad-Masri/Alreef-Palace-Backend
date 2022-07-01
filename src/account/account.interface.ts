import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId } from 'mongoose';

export default class IAccount extends Document {
  @ApiProperty({ type: String })
  id: ObjectId;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  username: string;
  @ApiProperty({ type: String })
  password: string;

  readonly created_at: Date;
}
