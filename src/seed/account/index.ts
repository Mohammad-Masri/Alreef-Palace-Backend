/* eslint-disable prettier/prettier */
require('../db_connect');
import { model } from 'mongoose';
import { hashPassword } from '../../helper/bcrypt.helper';
import IAccount from '../../account/account.interface';
import { AccountSchema } from '../../account/account.schema';
const AccountModel = model<IAccount>('accounts', AccountSchema);

const account = {
  name: 'Admin',
  username: 'super_admin',
  password: '123456789',
};

const insert_data = async () => {
  const hashed_password = await hashPassword(account.password);
  const super_admin_account = new AccountModel({
    name: account.name,
    username: account.username,
    password: hashed_password,
  });
  await super_admin_account.save();
  console.log('Finish');
};

insert_data();
