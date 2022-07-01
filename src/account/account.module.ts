import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'accounts', // note : name here must be like name in account service
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [AccountService],
})
export class AccountModule {}
