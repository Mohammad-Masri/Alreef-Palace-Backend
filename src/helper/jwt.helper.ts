/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import {
  JWT_SECURE_KEY,
  JWT_EXPIRE_IN,
  JWT_ISSUER,
} from 'src/config/server_constant';
import { ACCESS_TOKEN_NOT_VALID_OR_EXPIRED } from 'src/config/server_errors';

import ServerError from 'src/errors/ServerError';

export const signAccessToken = async (account_id: ObjectId) => {
  const payload = { account_id };
  const secret = JWT_SECURE_KEY;
  const options = {
    expiresIn: JWT_EXPIRE_IN,
    issuer: JWT_ISSUER,
  };
  const token = await JWT.sign(payload, secret as string, options);

  return token;
};

export const verifyAccessToken = async (access_token: string) => {
  try {
    const payload = await JWT.verify(access_token, JWT_SECURE_KEY as string);

    return payload;
  } catch (error) {
    throw new ServerError(
      HttpStatus.UNAUTHORIZED,
      ACCESS_TOKEN_NOT_VALID_OR_EXPIRED,
      `access token not valid or expired`,
    );
  }
};

export const getPayloadFromHeaders = async (headers: any) => {
  const authorization_header = headers['authorization'];
  const authorization_header_splits = authorization_header.split(' ');
  const access_token = authorization_header_splits[1];
  return verifyAccessToken(access_token);
};
