import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IAccount from './account.interface';
import { AccountResponse } from './dto/AccountResponse.dto';
import { Command } from 'nestjs-command';
import admin_account from './seed-data';
import { hashPassword } from 'src/helper/bcrypt.helper';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('accounts')
    private readonly AccountModel: Model<IAccount>,
  ) {}

  @Command({ command: 'seed:admin-account', describe: 'seed admin account' })
  private async seedSuperAdmin() {
    console.log('Start seeding super admin');
    const hashed_password = await hashPassword(admin_account.password);
    const super_admin_account = new this.AccountModel({
      name: admin_account.name,
      username: admin_account.username,
      password: hashed_password,
    });
    await super_admin_account.save();
    console.log('Finish seeding super admin');
  }

  public async makeAccountResponse(account: IAccount) {
    const account_response = new AccountResponse(account);
    return account_response;
  }

  public async findByUsername(username: string) {
    const account = await this.AccountModel.findOne({ username: username });
    return account;
  }
}
