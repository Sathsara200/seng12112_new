import { Module } from '@nestjs/common';
import { DailyStockModule } from './daily-stock/daily-stock.module';
import { AuthModule } from './auth/auth.module'; // ← import this
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './app.helper';
import { CityModule } from './city/city.module';
import { BankModule } from './bank/bank.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { FeedbackModule } from './feedback/feedback.module';

const envFilePath: string = getEnvPath(`${__dirname}/environments`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URL');
        if (!uri) {
          throw new Error('MONGO_URL environment variable is missing!');
        }
        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    DailyStockModule,
    AuthModule,
    CityModule,
    BankModule,
    CustomerModule,
    OrderModule,
    FeedbackModule, // ← add this
  ],
})
export class AppModule {}
