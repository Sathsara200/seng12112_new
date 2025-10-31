import { Module } from '@nestjs/common';
import { CityRepository } from './repository/city.repository';
import { CityController } from './controllers/city.controller';
import { mongo, Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './entities/city.schema';
import { CityService } from './services/city.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
  controllers: [CityController],
  providers: [CityRepository,CityService],
})
export class CityModule {}
