import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}
