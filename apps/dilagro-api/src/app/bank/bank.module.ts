import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankController } from './controllers/bank.controller';
import { Bank, BankSchema } from './schemas/bank.schema';
import { BankService } from './services/bank.service';
import { BankRepository } from './repository/bank.repository';
// 👈 ensure this exists and is imported

@Module({
  imports: [MongooseModule.forFeature([{ name: Bank.name, schema: BankSchema }])],
  controllers: [BankController],
  providers: [BankService, BankRepository],
  exports: [BankService],
})
export class BankModule {}
