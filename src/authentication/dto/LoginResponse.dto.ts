import { ApiProperty } from '@nestjs/swagger';
import { AccountResponse } from 'src/account/dto/AccountResponse.dto';

export class LoginResponse {
  @ApiProperty({ type: AccountResponse })
  account: AccountResponse;
  @ApiProperty({ type: String })
  token: string;

  constructor(account: AccountResponse, token: string) {
    this.account = account;
    this.token = token;
  }
}
