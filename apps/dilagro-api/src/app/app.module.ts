import { Module } from '@nestjs/common';
import { DailyStockModule } from './daily-stock/daily-stock.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [DailyStockModule, MongooseModule.forRoot('mongodb://super_admin:G20JXVQWERSSDDSX@localhost:27017/seng?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false&directConnection=true')],
})
export class AppModule { }