import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from 'src/account/account.service';
import {
  ACCOUNT_NOT_FOUND,
  LOGIN_FAILED_PASSWORD_NOT_CORRECT,
} from 'src/config/server_errors';
import ServerError from 'src/errors/ServerError';
import { AuthGuard } from 'src/guards/auth.guard';
import { isPasswordMatch } from 'src/helper/bcrypt.helper';
import { signAccessToken } from 'src/helper/jwt.helper';
import { AuthenticationService } from './authentication.service';
import { LoginInput } from './dto/LoginInput.dto';
import { LoginResponse } from './dto/LoginResponse.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly accountService: AccountService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: 'login',
    description: '',
  })
  @ApiOkResponse({
    description: `login success`,
    type: LoginResponse,
  })
  async login(@Body() loginInput: LoginInput) {
    const account = await this.accountService.findByUsername(
      loginInput.username,
    );

    if (!account) {
      throw new ServerError(
        HttpStatus.NOT_FOUND,
        ACCOUNT_NOT_FOUND,
        `there is no account with this username : ${loginInput.username}`,
      );
    }

    const match = await isPasswordMatch(loginInput.password, account.password);

    if (!match) {
      throw new ServerError(
        HttpStatus.BAD_REQUEST,
        LOGIN_FAILED_PASSWORD_NOT_CORRECT,
        `password not correct`,
      );
    }

    const access_token = await signAccessToken(account.id);
    const account_response = await this.accountService.makeAccountResponse(
      account,
    );

    const login_response = await this.authenticationService.makeLoginResponse(
      account_response,
      access_token,
    );

    return login_response;
  }

  @Post('/logout')
  @ApiOperation({
    summary: 'logout',
    description: '',
  })
  @ApiOkResponse({
    description: `logout success`,
    type: Boolean,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async logout() {
    return true;
  }
}
