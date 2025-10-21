import { Module } from '@nestjs/common';
import { DailyStockService } from './services/daily-stock.service';
import { DailyStockController } from './controllers/daily-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyStock, DailyStockSchema } from './schema/daily-stock.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DailyStock.name, schema: DailyStockSchema }])],
  controllers: [DailyStockController],
  providers: [DailyStockService],
})
export class DailyStockModule {}
