import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IBranch from './branch.interface';
import { Command } from 'nestjs-command';
import branches from './seed-data';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('branches')
    private readonly BranchModel: Model<IBranch>,
  ) {}

  @Command({ command: 'seed:branches', describe: 'seed branches' })
  private async seed() {
    console.log('Start seeding branches');
    for (let i = 0; i < branches.length; i++) {
      const b = branches[i];
      const branch = new this.BranchModel({
        name: b.name,
      });

      await branch.save();
    }

    console.log('Finish seeding branches');
  }
}
