/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class MyError {
  @ApiProperty({ type: Number })
  code: number;
  @ApiProperty({ type: String })
  message: any;
  constructor(server_error_code: number, message: any) {
    this.code = server_error_code;
    this.message = message;
  }
}

export default class ServerError extends HttpException {
  @ApiProperty({ type: MyError })
  error: MyError;

  constructor(status_code: number, server_error_code: number, message: any) {
    super(
      {
        status: status_code,
        error: new MyError(server_error_code, message),
      },
      status_code,
    );
  }
}
