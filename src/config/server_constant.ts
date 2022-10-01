/* eslint-disable prettier/prettier */
// environment variable
export const SERVER_PORT = 8080;

export const MONGO_DATABASE_HOST = 'alreef-palace.svapd8o.mongodb.net';
export const MONGO_DATABASE_PORT = 27017;
export const MONGO_DATABASE_NAME = 'testing_alreef_palace_db';
export const MONGO_DATABASE_USERNAME = 'alreefpalace165';
export const MONGO_DATABASE_PASSWORD = 'pKeHETnukbPe1jnx';

export const JWT_SECURE_KEY =
  'ae4h8e9t8jbv839pwern28yvoCNXP298UE9NCPOIWFVIFOETU93209T0PWAIU38QPAIG4QGVEUIW98y8pv2pc9q28pvihqVPOHioje654rg6wjyui2vqoqc89np324bs';
export const JWT_EXPIRE_IN = '30d';
export const JWT_ISSUER = 'alreef-palace.com';

export const GLOBAL_URL_PREFIX = `/api/v1`;

// server variable
export enum EmployeePaymentTypes {
  ADVANCE = 'advance',
  SALARY = 'salary',
  REWARD = 'reward',
}

export enum BillTypes {
  EXPORT = 'export',
  IMPORT = 'import',
}

export enum ExportBillTypes {
  CONSUMED = 'consumed',
  BASIC = 'basic',
}

export enum SupplierPaymentTypes {
  EXPORT = 'export',
  IMPORT = 'import',
}
