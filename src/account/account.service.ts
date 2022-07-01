import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IAccount from './account.interface';
import { AccountResponse } from './dto/AccountResponse.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('accounts')
    private readonly AccountModel: Model<IAccount>,
  ) {}

  public async makeAccountResponse(account: IAccount) {
    const account_response = new AccountResponse(account);
    return account_response;
  }

  public async findByUsername(username: string) {
    const account = await this.AccountModel.findOne({ username: username });
    return account;
  }
}
