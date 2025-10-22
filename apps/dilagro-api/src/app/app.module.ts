import { Module } from '@nestjs/common';
import { DailyStockModule } from './daily-stock/daily-stock.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './app.helper';

// Load .env file
const envFilePath = getEnvPath();

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),

    // Connect to MongoDB using the environment variable
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

    // Feature modules
    DailyStockModule,
  ],
})
export class AppModule {}
