import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema } from './branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'branches', // note : name here must be like name in branch service
        schema: BranchSchema,
      },
    ]),
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
