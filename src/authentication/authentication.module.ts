import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from 'src/account/account.schema';
import { AccountService } from 'src/account/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'accounts', // note : name here must be like name in account service
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AccountService],
})
export class AuthenticationModule {}
