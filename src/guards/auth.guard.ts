/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { resolve } from 'path/posix';
import { Observable } from 'rxjs';
import { AUTHORIZATION_HEADER_NOT_FOUND } from 'src/config/server_errors';
import ServerError from 'src/errors/ServerError';
import { verifyAccessToken } from 'src/helper/jwt.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const headers = request.headers;

    let authorization_header = headers['authorization'];

    if (!authorization_header) {
      throw new ServerError(
        HttpStatus.UNAUTHORIZED,
        AUTHORIZATION_HEADER_NOT_FOUND,
        `the request has no authorization header`,
      );
    }

    authorization_header = authorization_header.split(' ');
    const token = authorization_header[1];

    if (!token) {
      throw new ServerError(
        HttpStatus.UNAUTHORIZED,
        AUTHORIZATION_HEADER_NOT_FOUND,
        `authorization header has no access token`,
      );
    }

    return verifyAccessToken(token);
  }
}
