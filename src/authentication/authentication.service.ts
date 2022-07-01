import { Injectable } from '@nestjs/common';
import { AccountResponse } from 'src/account/dto/AccountResponse.dto';
import { LoginResponse } from './dto/LoginResponse.dto';

@Injectable()
export class AuthenticationService {
  public async makeLoginResponse(account: AccountResponse, token: string) {
    const login_response = new LoginResponse(account, token);
    return login_response;
  }
}
