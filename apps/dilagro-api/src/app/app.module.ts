import { Module } from '@nestjs/common';
import { DailyStockModule } from './daily-stock/daily-stock.module';
import { AuthModule } from './auth/auth.module'; // ← import this
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './app.helper';

const envFilePath = getEnvPath();

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
    AuthModule, // ← add this
  ],
})
export class AppModule {}
