import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { CityController } from './controllers/city.controller';
import { mongo, Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './entities/city.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
